import React, { useState, useEffect } from 'react';
import { VscMenu, VscLightbulb, VscColorMode } from "react-icons/vsc";

const Header = ({ onMenuClick }) => {
    const [isDarkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    }, [isDarkMode]);

    return (
        // MODIFIED: Reduced padding on mobile (p-2)
        <header className="fixed top-0 left-0 w-full bg-gray-100 dark:bg-gray-900 p-2 z-30 lg:relative lg:p-0 lg:bg-transparent lg:dark:bg-transparent shadow-md lg:shadow-none">
            {/* MODIFIED: Reduced gap on mobile (gap-4) */}
            <div className="flex justify-end items-center gap-4">
                <button onClick={onMenuClick} className="text-2xl lg:hidden absolute left-4">
                    <VscMenu />
                </button>
                
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-1 flex items-center gap-1 cursor-pointer">
                    <span onClick={() => setDarkMode(false)} className={`p-1 rounded-md ${!isDarkMode ? 'bg-blue-500 text-white' : ''}`}><VscLightbulb /></span>
                    <span onClick={() => setDarkMode(true)} className={`p-1 rounded-md ${isDarkMode ? 'bg-blue-500 text-white' : ''}`}><VscColorMode /></span>
                </div>

                {/* MODIFIED: Reduced gap and profile image size on mobile */}
                <div className="flex items-center gap-2">
                    <div className="text-right hidden sm:block"> {/* Hide text on very small screens */}
                        <p>Hey, <b>Amira</b></p>
                        <small className="text-gray-500">Admin</small>
                    </div>
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden">
                        <img src="/images/review-4.jpg" alt="Profile" className="object-cover" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;