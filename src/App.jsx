import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';
import RightSection from './components/RightSection';

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      {/* MODIFIED: Added md:grid-cols-[14rem,auto] for a two-column tablet layout */}
      <div className="container mx-auto grid md:grid-cols-[14rem,auto] lg:grid-cols-[14rem,auto,20rem] gap-7 p-4 relative">
        
        {/* --- DESKTOP & TABLET SIDEBAR --- */}
        {/* MODIFIED: Changed from 'lg:block' to 'md:block' to be visible on tablets */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        
        {/* --- MOBILE SIDEBAR (OVERLAY) --- */}
        {isSidebarOpen && (
            <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSidebarOpen(false)}>
                <div className="fixed left-0 top-0 h-full bg-white dark:bg-gray-800 w-64 z-50 p-4" onClick={e => e.stopPropagation()}>
                    <Sidebar onClose={() => setSidebarOpen(false)} />
                </div>
            </div>
        )}

        {/* --- MIDDLE COLUMN (HEADER + MAIN CONTENT) --- */}
        <main className="mt-20 md:mt-0">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <MainContent />
        </main>

        {/* --- RIGHT COLUMN (DESKTOP ONLY) --- */}
        <div className="hidden lg:block">
            <RightSection />
        </div>

      </div>
    </div>
  );
};

export default App;