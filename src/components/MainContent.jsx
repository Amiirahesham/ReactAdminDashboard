import React from 'react';
import { VscArrowUp, VscArrowDown } from "react-icons/vsc";
import RecentOrdersTable from './RecentOrdersTable';

const MainContent = () => {
  return (
    <main>
      {/* MODIFIED: Adjusted heading size for different breakpoints */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Analytics</h1>
      
      {/* Analyses Section */}
      {/* MODIFIED: Changed grid to be more responsive on small/medium screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <AnalysisCard title="Total Sales" value="$65,024" percentage="+81%" color="green" />
        <AnalysisCard title="Site Visit" value="24,981" percentage="-48%" color="red" />
        {/* This card will wrap to a new line on tablets, and stack on mobile */}
        <AnalysisCard title="Searches" value="14,147" percentage="+21%" color="blue" />
      </div>

      {/* New Users Section */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">New Users</h2>
        {/* MODIFIED: Adjusted grid columns for better user card display */}
        <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl shadow-lg grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <UserCard img="/images/review-1.jpg" name="Mera" time="54 Min Ago" />
            <UserCard img="/images/review-2.png" name="John" time="3 Hours Ago" />
            <UserCard img="/images/review-3.jpg" name="Ember" time="6 Hours Ago" />
            <UserCard img="/images/plus.png" name="More" time="New User" isAdd />
        </div>
      </div>
      
      {/* Recent Orders Section */}
      <RecentOrdersTable />
    </main>
  );
};

// No changes needed for these sub-components, but they are included for completeness.
const AnalysisCard = ({ title, value, percentage, color }) => {
    const isPositive = percentage.startsWith('+');
    
    const colorClasses = {
        green: 'text-green-500',
        red: 'text-red-500',
        blue: 'text-blue-500',
    };

    return(
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-gray-500 dark:text-gray-400">{title}</h3>
                    <h1 className="text-3xl font-bold mt-1">{value}</h1>
                </div>
                <div className={`flex items-center gap-1 ${colorClasses[color]}`}>
                    {isPositive ? <VscArrowUp /> : <VscArrowDown />}
                    <span>{percentage}</span>
                </div>
            </div>
        </div>
    );
};

const UserCard = ({ img, name, time, isAdd }) => {
    return (
        <div className={`flex flex-col items-center p-4 rounded-lg ${isAdd ? 'border-2 border-dashed border-blue-500' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            <img src={img} alt={name} className="w-16 h-16 rounded-full mb-2 object-cover" />
            <h2 className="font-semibold">{name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{time}</p>
        </div>
    );
};

export default MainContent;