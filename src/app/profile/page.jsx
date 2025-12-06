"use client";

import React from 'react';
import { useReports } from '@/context/ReportsContext';
import BottomNav from '@/components/BottomNav';
import { User, Moon, Sun, Trophy, Star } from 'lucide-react';

export default function ProfilePage() {
    const { userXP, userRank, isDarkMode, toggleTheme } = useReports();

    // Calculate progress to next rank
    const nextRankXP = userXP < 50 ? 50 : userXP < 200 ? 200 : 1000;
    const progressPercent = Math.min((userXP / nextRankXP) * 100, 100);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24 transition-colors">

            {/* Header */}
            <div className="bg-black p-6 rounded-b-3xl shadow-lg mb-6">
                <h1 className="text-yellow-400 font-bold text-2xl flex items-center gap-2">
                    <User className="w-6 h-6" /> My Profile
                </h1>
            </div>

            <div className="p-4 space-y-6">

                {/* RANK CARD */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>

                    <div className="bg-yellow-100 dark:bg-yellow-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Trophy className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
                    </div>

                    <h2 className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-widest">Current Rank</h2>
                    <h3 className="text-3xl font-black text-black dark:text-white mt-1 mb-2">{userRank}</h3>

                    {/* XP Progress Bar */}
                    <div className="mt-4 text-left">
                        <div className="flex justify-between text-xs font-bold mb-1">
                            <span className="text-gray-500 dark:text-gray-400">{userXP} XP</span>
                            <span className="text-gray-400">Next Rank: {nextRankXP} XP</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div
                                className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-center mt-2 text-gray-400">
                            Report more incidents to level up!
                        </p>
                    </div>
                </div>

                {/* SETTINGS SECTION */}
                <h3 className="font-bold text-gray-500 dark:text-gray-400 uppercase text-sm px-2">Settings</h3>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">

                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                                {isDarkMode ? <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" /> : <Sun className="w-5 h-5 text-purple-600" />}
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-gray-800 dark:text-white">Dark Mode</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Easy on the eyes at night</p>
                            </div>
                        </div>

                        {/* The Switch UI */}
                        <div className={`w-12 h-6 rounded-full p-1 transition-colors ${isDarkMode ? 'bg-purple-600' : 'bg-gray-300'}`}>
                            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </div>
                    </button>

                    <div className="border-t border-gray-100 dark:border-gray-700"></div>

                    {/* About Section */}
                    <div className="p-4 flex items-center gap-3 opacity-50">
                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                            <Star className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </div>
                        <div>
                            <p className="font-bold text-gray-800 dark:text-white">Rate App</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">v1.0.0 • Made in Kenya 🇰🇪</p>
                        </div>
                    </div>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}