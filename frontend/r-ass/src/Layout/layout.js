import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from './Navbar';


const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#F8F9FD]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* <Navbar /> */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;