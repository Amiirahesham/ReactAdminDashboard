import React from 'react';
import { VscBell, VscKebabVertical, VscUnmute, VscEdit, VscAdd } from "react-icons/vsc";

const RightSection = () => {
    return (
        // Add a top margin for spacing on desktop
        <div className="right-section mt-6">
            {/* User Profile Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
                <img src="/images/myLogo.png" alt="logo" className="w-32 h-32 mx-auto mb-4" />
                <h2 className="text-xl font-bold">Amira Hesham</h2>
                <p className="text-gray-500 dark:text-gray-400">Front-End Developer</p>
            </div>

            {/* Reminders */}
            <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Reminders</h2>
                    <span className="text-2xl"><VscBell /></span>
                </div>
                <div className="space-y-4">
                    <ReminderCard icon={<VscUnmute />} title="Workshop" time="08:00 AM - 12:00 PM" color="green" />
                    <ReminderCard icon={<VscEdit />} title="Project Submission" time="04:00 PM" color="red" />
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border-2 border-dashed border-blue-500 flex items-center justify-center gap-2 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors">
                        <VscAdd />
                        <h3>Add Reminder</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ReminderCard = ({ icon, title, time, color }) => {
    const colorClasses = {
        green: 'bg-green-500',
        red: 'bg-red-500',
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg flex items-center gap-4">
            <div className={`p-2 rounded-lg text-white ${colorClasses[color]}`}>
                {icon}
            </div>
            <div className="flex-grow">
                <h3 className="font-semibold">{title}</h3>
                <small className="text-gray-500 dark:text-gray-400">{time}</small>
            </div>
            <VscKebabVertical />
        </div>
    );
};

export default RightSection;