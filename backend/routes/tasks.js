const express = require("express");
const taskRouter = express.Router();
const Task = require("../models/Task");
const schedule = require("node-schedule");
const nodemailer = require("nodemailer");
const Mailjet = require('node-mailjet');
const authMiddleware = require("../middleware/authMiddleware");
const Usermodel = require("../models/User");

const formatUTC = (dateTime) => {
    return new Date(dateTime).toLocaleString("en-GB", {
        timeZone: "UTC",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

const sendNotification = async (email, name, candidateName, position, contact, pickupDateTime, reminderType = "creation") => {
    console.log("Sending notification");
    console.log("email: ", email);
    console.log("name: ", name);
    console.log("pickupDateTime: ", pickupDateTime);

    const formattedDate = formatUTC(pickupDateTime); 

    // Custom subject based on reminderType
    let subject = `Task Reminder for ${name}`;
    if (reminderType === "30-min") {
        subject = `Friendly Reminder: 30 Minutes Left for Your Task`;
    } else if (reminderType === "5-min") {
        subject = `Friendly Reminder: 5 Minutes Left for Your Task`;
    }

    const mailjet = new Mailjet({
        apiKey: process.env.MAIL_JET_API,
        apiSecret: process.env.MAIL_JET_SECRET_KEY
    });

    const request = mailjet
    .post('send', { version: 'v3.1' })
    .request({
        Messages: [
            {
                From: {
                    Email: process.env.MAIL_USER,
                    Name: "Orina"
                },
                To: [
                    { Email: email, Name: name }
                ],
                Subject: subject, // Customized subject
                HTMLPart: `
                    <p>Hello ${name},</p>
                    ${
                        reminderType === "creation"
                            ? `<p>This is to notify you that a task has been created and scheduled for <b>${formattedDate}</b>.</p>
                               <p><b>Candidate Details:</b></p>
                               <ul>
                                   <li><b>Candidate Name:</b> ${candidateName}</li>
                                   <li><b>Position:</b> ${position}</li>
                                    <li><b>Contact:</b> ${contact}</li>
                               </ul>`
                            : `<p>This is a friendly reminder that your task is scheduled for <b>${formattedDate}</b>.</p>
                               <p><b>Candidate Details:</b></p>
                               <ul>
                                   <li><b>Candidate Name:</b> ${candidateName}</li>
                                   <li><b>Position:</b> ${position}</li>
                                   <li><b>Contact:</b> ${contact}</li>
                               </ul>`
                    }
                    <p>Thank you!</p>
                    <h4>Team Orina</h4>
                `,
            }
        ]
    });


    request
        .then((result) => {
            console.log("Email sent successfully:", result.body);
        })
        .catch((err) => {
            console.error("Error sending email:", err.statusCode);
        });
};



const scheduleNotifications = async (candidateName, position, contact, pickupDateTime, email, name) => {
    // Convert pickupDateTime (IST) to UTC
    const taskTimeIST = new Date(pickupDateTime); // Treat input as IST
    const taskTimeUTC = new Date(taskTimeIST.getTime() - 5.5 * 60 * 60 * 1000); // Convert IST to UTC
    console.log("Task Time (IST):", taskTimeIST.toISOString());
    console.log("Task Time (UTC):", taskTimeUTC.toISOString());

    // Calculate reminder times in UTC
    const reminderTimes = [
        { time: new Date(taskTimeUTC.getTime() - 30 * 60 * 1000), type: "30-min" },
        { time: new Date(taskTimeUTC.getTime() - 5 * 60 * 1000), type: "5-min" },
    ];

    console.log("Reminder Times (UTC):", reminderTimes);

    reminderTimes.forEach(({ time, type }) => {
        if (time > new Date()) {
            console.log(`Scheduling reminder for ${type} at ${time.toISOString()}`);
            schedule.scheduleJob(time, async () => {
                console.log(`Reminder triggered for ${type} at ${new Date().toISOString()}`);
                await sendNotification(
                    email,
                    name,
                    candidateName,
                    position,
                    contact,
                    pickupDateTime, // Keep original IST time for the email
                    type
                );
            });
        } else {
            console.log(`Skipped scheduling ${type}, time is in the past: ${time.toISOString()}`);
        }
    });
};







const schedulePendingTasks = async () => {
    const tasks = await Task.find({ status: "Pending" });
    tasks.forEach((task) => {
        scheduleNotifications(task);
    });
};

taskRouter.post("/test-mail", (req, res)=>{
    
    const mailjet = new Mailjet({
        apiKey: process.env.MAIL_JET_API,
        apiSecret: process.env.MAIL_JET_SECRET_KEY
    });
    const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: process.env.MAIL_USER,
                        Name: "Orina"
                    },
                    To: [
                        {
                            Email: "sanjuvenky246@gmail.com",
                            Name: "venky"
                        }
                    ],
                    Subject: "Cheers! Your task has been added",
                    TextPart: `Your Task has been added`,
                    HTMLPart: `
                <p>Hello there,</p>
                <p>test mail from orina
                </p>
                <p>Thank you,</p>
                <h3>Team Orina</h3>
            `
                }
            ]
        })

    request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })
    res.send({
        msg:"test mail"
    })
})

taskRouter.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;
    const mailjet = new Mailjet({
        apiKey: process.env.MAIL_JET_API,
        apiSecret: process.env.MAIL_JET_SECRET_KEY
    });

    const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: process.env.MAIL_USER,
                        Name: "Orina"
                    },
                    To: [
                      
                            { Email: process.env.ADMIN_MAIL_USER, Name: "Admin 1" },
                            { Email: process.env.ADMIN_MAIL_USER2, Name: "Admin 2" },
                        
                        
                    ],
                    Subject: "Orina!, Query from contact us",
                    HTMLPart: `
                        <p>Hello Admin, somebody contacted via contact us, below is the message</p>
                        <p>Name - ${name}</p>
                        <p>message - ${message}</p>
                        <p>Email : ${email}</p>
                        <p>Thank you!</p>
                        <h4>Team Orina</h4>
                    `,
                }
            ]
        });

    request
        .then((result) => {
            console.log("Email sent successfully:", result.body);
        })
        .catch((err) => {
            console.error("Error sending email:", err.statusCode);
        });
        res.status(200).send({
            msg: "Thanks for contacting us, we will respond shortly!"
        })
})

// Save a new task
taskRouter.post("/save", authMiddleware, async (req, res) => {
    try {
        // Find the authenticated user
        const findUser = await Usermodel.findOne({ _id: req.user.Rid });
        console.log("findUser", findUser);

        // Add userId to the task body
        req.body.userId = req.user.Rid;

        // Convert pickupDateTime to UTC
        req.body.pickupDateTime = new Date(req.body.pickupDateTime).toISOString();

        // Save the task
        const task = new Task(req.body);
        console.log("About to save task to the database...");

        console.log("Saving task:", task);
        await task.save();

        // Send immediate email notification
        await sendNotification(findUser.email, findUser.name, req.body.name, req.body.position, req.body.contact, task.pickupDateTime);

        // Schedule reminders
        await scheduleNotifications(req.body.name, req.body.position, req.body.contact,req.body.pickupDateTime, findUser.email, findUser.name);

        res.status(201).json(task);
    } catch (error) {
        console.error("Error saving task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});




// Get all tasks
// Backend: taskRouter.js

taskRouter.get("/", authMiddleware, async (req, res) => {
    try {
        // Extract query parameters
        let { page = 1, limit = 15 } = req.query;
        console.log("req", req.user)

        // Convert to integers
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);

        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 15;

        // Calculate skip value
        const skip = (page - 1) * limit;

        // Fetch tasks with pagination
        const tasks = await Task.find({ userId: req.user.Rid }).sort({createdAt : -1})
            .sort({ pickupDateTime: 1 }) 
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            tasks,
            total: tasks.length,
            page,
            limit,
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Get tasks for a specific recruiter (optional filtering by recruiterId)
taskRouter.get("/recruiter/:recruiterId", async (req, res) => {
    try {
        const tasks = await Task.find({ recruiterId: req.params.recruiterId }).sort({ pickupDateTime: 1 });
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching recruiter tasks:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Delete a task
taskRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = {taskRouter, schedulePendingTasks};
