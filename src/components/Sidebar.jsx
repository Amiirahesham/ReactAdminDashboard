import React from 'react';
import { VscDashboard, VscAccount, VscHistory, VscGraph, VscMail, VscPackage, VscReport, VscSettings, VscAdd, VscSignOut, VscClose } from "react-icons/vsc";


const Sidebar = ({ onClose }) => {
  return (
    <aside>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <img src="/images/myLogo.png" alt="Logo" className="w-8 h-8" />
          <h2 className="text-xl font-bold">Amira<span className="text-red-500">Hesham</span></h2>
        </div>
        {onClose && (
            <button onClick={onClose} className="lg:hidden text-2xl">
                <VscClose />
            </button>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-2">
        <nav className="flex flex-col gap-2">
          <SidebarLink icon={<VscDashboard />} text="Dashboard" />
          <SidebarLink icon={<VscAccount />} text="Users" />
          <SidebarLink icon={<VscHistory />} text="History" />
          <SidebarLink icon={<VscGraph />} text="Analytics" active />
          <SidebarLink icon={<VscMail />} text="Tickets" count={27} />
          <SidebarLink icon={<VscPackage />} text="Sale List" />
          <SidebarLink icon={<VscReport />} text="Reports" />
          <SidebarLink icon={<VscSettings />} text="Settings" />
          <SidebarLink icon={<VscAdd />} text="New Login" />
          <SidebarLink icon={<VscSignOut />} text="Logout" isLogout />
        </nav>
      </div>
    </aside>
  );
};

const SidebarLink = ({ icon, text, count, active, isLogout }) => {
  const baseClasses = "flex items-center gap-4 p-3 rounded-lg transition-colors";
  const activeClasses = "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400";
  const hoverClasses = "hover:bg-gray-100 dark:hover:bg-gray-700";
  const logoutClasses = "absolute bottom-4 w-[calc(100%-1rem)]";

  return (
    <a href="#" className={`${baseClasses} ${active ? activeClasses : hoverClasses} ${isLogout ? logoutClasses : ''}`}>
      <span className="text-2xl">{icon}</span>
      <h3 className="font-medium">{text}</h3>
      {count && <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full ml-auto">{count}</span>}
    </a>
  );
};

export default Sidebar;