import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ListTodo, 
  Timer, 
  BookOpen, 
  FileSearch, 
  Settings,
  LogOut ,
  Menu,
  X 
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To track the current path
  const [quote, setQuote] = useState('');
  const [activePath, setActivePath] = useState(location.pathname);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Users size={20} />, label: 'Candidate Management', path: '/candidate-management' },
    { icon: <ListTodo size={20} />, label: 'Task Management', path: '/task-management' },
    // { icon: <Timer size={20} />, label: 'Break Tracker', path: '/break-tracker' },
    { icon: <BookOpen size={20} />, label: 'Note-Book', path: '/notebook' },
    { icon: <FileSearch size={20} />, label: 'JD Analyser', path: '/jobanalyser' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  useEffect(() => {
    const quotes = [
      "Stay focused and never give up!",
      "Success is not final, failure is not fatal.",
      "Believe in yourself and all that you are.",
      "Every moment is a fresh beginning.",
      "Great vision without great people is irrelevant.",
      "The right hire can transform an entire team.",
      "Hire character. Train skill.",
      "A company is only as good as the people it keeps.",
      "Quality talent is the backbone of success.",
      "Hiring the right people takes time, patience, and perseverance.",
      "Talent wins games, but teamwork wins championships.",
      "Don’t hire for skills, hire for attitude.",
      "Find people who believe in your vision.",
      "The strength of the team is each individual member.",
      "Every hire should bring a unique perspective to the table.",
      "Good recruiting is the key to a thriving company.",
      "A recruiter is not just hiring people but building the future.",
      "You’re not just filling roles; you’re shaping success.",
      "The best investment a company can make is in its people.",
      "Hire people who are better than you, then leave them to get on with it.",
      "Success in hiring is finding the right fit, not just the best candidate.",
      "Great things in business are never done by one person.",
      "An organization’s ability to learn, and translate that learning into action rapidly, is the ultimate competitive advantage.",
      "It’s not about finding a person for the job; it’s about finding the job for the person.",
      "Recruitment is not about filling a vacancy; it’s about building a legacy."
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      setQuote(quotes[index]);
      index = (index + 1) % quotes.length;
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setActivePath(path); // Update active path on navigation
    setIsSidebarOpen(false);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
    window.location.href = "/";
  };

  return (
    <>
      {/* Hamburger Icon */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-[#004D4B] text-white hover:bg-[#003C3A] transition-all"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-[#006A67] text-white flex flex-col z-40 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Branding Section */}
        <div className={`p-6 ${isSidebarOpen ? 'flex justify-center' : ''}`}>
          <h1 
            className="text-3xl font-bold tracking-wide"
            style={{
              textAlign: isSidebarOpen ? 'center' : 'left',
              fontSize: "3.3rem",
              fontWeight: "bold",
              color: "#FFD700", // Golden Yellow
            }}
          >
            Orina
          </h1>
        </div>


        {/* Navigation Menu */}
        <nav className="flex-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center space-x-3 px-6 py-3 transition-colors ${
                activePath === item.path 
                  ? 'bg-white/20 text-white font-semibold' 
                  : 'hover:bg-white/10'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Animated Branding Section */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-4">
          <div className="relative w-24 h-24 bg-white/10 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <span className="text-3xl font-bold text-white">✨</span>
          </div>
          <p className="text-sm italic text-center opacity-80">{quote}</p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-6 py-4 hover:bg-white/10 transition-colors border-t border-white/20"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Overlay for Sidebar (Mobile Only) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
