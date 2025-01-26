import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, BarChart3, Briefcase, ArrowRight, Menu, X, Clock, Gift, Gem, Building, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "./HomePage.css"
import axios from 'axios';

export function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_x5pqVBhwVXGVRS",
      amount: data.amount,
      currency: data.currency,
      name: "tester",
      description: "test payment",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = `${process.env.REACT_APP_BACKEND_URL}/api/payment/verify`
          const { data } = await axios.post(verifyUrl, response)
          console.log("verify data", data)
        } catch (error) {
          console.log(error)
        }
      }
    }

    const rzp1 = new window.Razorpay(options)
    rzp1.open()
  }

  const handlePayment = async (num) => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/payment/order`
      var amount;
      if (num === 1) {
        amount = 10
      } else {
        amount = 49
      }
      const { data } = await axios.post(url, { amount: amount });
      console.log("Order", data)
      initPayment(data.data)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-lg z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Orina</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#solutions" className="text-gray-600 hover:text-gray-900">Solutions</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a> */}
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105" onClick={() => navigate('/auth')}>
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-gray-100"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">

              <button className="w-full mt-2 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700" onClick={() => navigate('/auth')}>
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Simplify Recruitment,
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Enhance Hiring</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Empower your recruitment process with tools to manage candidates, candidate status, and make data-driven hiring decisions efficiently.
            </p>


            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">

            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Candidate Management */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center text-center overflow-hidden group"
              >
                {/* Border Animation */}
                <div className="absolute inset-0 rounded-2xl border-transparent border-2 group-hover:animate-border-grow"></div>
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
                  <Users className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Candidate Management</h3>
                <p className="text-gray-600">
                  Add, track, and manage candidates seamlessly in one place.
                </p>
              </motion.div>

              {/* Smart Search */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center text-center overflow-hidden group"
              >
                {/* Border Animation */}
                <div className="absolute inset-0 rounded-2xl border-transparent border-2 group-hover:animate-border-grow"></div>
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Search className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Search</h3>
                <p className="text-gray-600">
                  Find the right candidates quickly without spreadsheets.
                </p>
              </motion.div>

              {/* JD Analyzer */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center text-center overflow-hidden group"
              >
                {/* Border Animation */}
                <div className="absolute inset-0 rounded-2xl border-transparent border-2 group-hover:animate-border-grow"></div>
                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mb-4">
                  <Briefcase className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">JD Analyzer</h3>
                <p className="text-gray-600">
                  Extract key requirements and skills automatically.
                </p>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"
            >
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <Search className="w-6 h-6 text-white" /> {/* Relevant icon for AI Powered Matching */}
              </div>
              <h3 className="text-xl font-semibold mb-4">AI-Powered Matching</h3>
              <p className="text-gray-600 mb-4">
                Leverage cutting-edge AI to find the best matches for your requirements efficiently and intelligently.
              </p>
              <a href="#" className="inline-flex items-center text-indigo-600 hover:text-indigo-700">
                Learn more <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </motion.div>



            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100"
            >
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Analytics Dashboard</h3>
              <p className="text-gray-600 mb-4">Real-time insights and analytics to optimize your hiring process.</p>
              <a href="#" className="inline-flex items-center text-purple-600 hover:text-purple-700">
                Learn more <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-white border border-pink-100"
            >
              <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4"> Task Reminders</h3>
              <p className="text-gray-600 mb-4">Add your tasks and we will send timely reminders.</p>
              <a href="#" className="inline-flex items-center text-pink-600 hover:text-pink-700">
                Learn more <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Hiring?</h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Discover how Orina can streamline your hiring process and help you build your dream team effortlessly.
            </p>
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-medium hover:bg-indigo-50 transition-all duration-200 transform hover:scale-105" onClick={() => navigate('/auth')}>
              Get Started Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Payments Section */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-900">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
     
            <PlanCard
              title="Free Plan"
              price="₹0"
              features={["1-month Free Access", "All Features"]}
              gradient="from-pink-500 to-red-500"
              icon={<Gift className="w-8 h-8 text-white" />}
  
              onClick={(e) => handlePayment(1)}
            />

            <PlanCard
              title="Premium Plan"
              price="₹49"
              subtitle="/month"
              features={["Unlimited Access", "Access to all Features"]}
              gradient="from-yellow-400 to-orange-500"
              icon={<Gem className="w-8 h-8 text-white" />}
  
              onClick={() => handlePayment(2)}
            />
   
            <PlanCard
              title="Enterprise Plan"
              price="Custom Pricing"
              features={["Tailored Solutions", "Priority Support"]}
              gradient="from-blue-500 to-indigo-600"
              icon={<Building className="w-8 h-8 text-white" />}
              buttonText="Contact Us"
              onClick={() => navigate("/contact")}
            />
          </div>
        </div>
      </section> */}


      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} Orina. All Rights Reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="/privacy-policy" target='__blank' className="hover:text-gray-400">Privacy Policy</a>
            <a href="/termsAndConditions" target='__blank' className="hover:text-gray-400">Terms of Service</a>
            <a href="/contact" target='_blank' className="hover:text-gray-400">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const PlanCard = ({ title, price, subtitle, features, gradient, icon, buttonText, onClick }) => (
  <div className="relative flex flex-col items-center text-white bg-gradient-to-br rounded-lg shadow-xl overflow-hidden p-6 hover:scale-105 transition-transform duration-300">
    {/* Diamond Shape */}
    <div className={`w-20 h-20 bg-gradient-to-br ${gradient} transform rotate-45 absolute -top-8 flex items-center justify-center shadow-md`}>
      <div className="transform -rotate-45">{icon}</div>
    </div>

    {/* Plan Details */}
    <div className={`w-full mt-16 bg-gradient-to-br ${gradient} p-8 rounded-lg text-center`}>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <ul className="space-y-2 mb-6 text-sm">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-white" />
            {feature}
          </li>
        ))}
      </ul>
    </div>

    {/* Price Circle (Updated for Premium Plan) */}
    <div className="relative -mt-12 mb-4">
      <div className="w-28 h-28 bg-white rounded-full shadow-lg flex flex-col items-center justify-center border-4 border-gray-200">
        <span className="text-2xl font-bold text-gray-900">{price}</span>
        {subtitle && (
          <span className="text-sm text-gray-600">{subtitle}</span>
        )}
      </div>
      <div className="absolute top-4 left-4 w-28 h-28 bg-gradient-to-t from-gray-300 to-transparent rounded-full blur-xl opacity-40"></div>
    </div>

    {/* CTA Button */}
    {/* <button
      onClick={onClick}
      className="mt-2 px-6 py-2 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition"
    >
      {buttonText}
    </button> */}
  </div>
);

export default HomePage;