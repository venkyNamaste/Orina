import React from 'react';
import { User } from 'lucide-react';

const Navbar = () => {
  const userName = "John Doe"; // This should come from auth context

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-[#6C5CE7] to-[#A66BFF] text-transparent bg-clip-text">
          Orina
        </h1>
      </div>
      
      {/* <div className="flex items-center space-x-3 text-gray-700">
        <User size={20} className="text-[#6C5CE7]" />
        <span className="font-medium">{userName}</span>
      </div> */}
    </nav>
  );
};

export default Navbar;