"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Report = {
    id: number;
    route: string;
    fare: number;
    safety: 'SAFE' | 'DANGER';
    incident: 'NONE' | 'ACCIDENT' | 'JAM' | 'MAINTENANCE' | 'POLICE';
    sacco: string;
    plate: string;
    dangerDetails: string;
    time: string;
};

type ReportsContextType = {
    reports: Report[];
    addReport: (data: Omit<Report, 'id' | 'time'>) => void;
    hasSeenWelcome: boolean;
    markWelcomeAsSeen: () => void;
    // NEW FEATURES
    userXP: number;         // Your score
    userRank: string;       // Your rank name
    isDarkMode: boolean;    // Night mode state
    toggleTheme: () => void; // Switch logic
};

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export function ReportsProvider({ children }: { children: ReactNode }) {
    const [reports, setReports] = useState<Report[]>([]);
    const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

    // NEW STATES
    const [userXP, setUserXP] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Load Everything from Storage
    useEffect(() => {
        const savedReports = localStorage.getItem('matatuReports');
        const savedWelcome = localStorage.getItem('hasSeenWelcome');
        const savedXP = localStorage.getItem('userXP');
        const savedTheme = localStorage.getItem('isDarkMode');

        if (savedReports) setReports(JSON.parse(savedReports));
        if (savedWelcome) setHasSeenWelcome(JSON.parse(savedWelcome));
        if (savedXP) setUserXP(JSON.parse(savedXP));
        if (savedTheme) setIsDarkMode(JSON.parse(savedTheme));
    }, []);

    // Save Everything when it changes
    useEffect(() => { localStorage.setItem('matatuReports', JSON.stringify(reports)); }, [reports]);
    useEffect(() => { localStorage.setItem('hasSeenWelcome', JSON.stringify(hasSeenWelcome)); }, [hasSeenWelcome]);
    useEffect(() => { localStorage.setItem('userXP', JSON.stringify(userXP)); }, [userXP]);

    // THEME LOGIC: This actually changes the colors
    useEffect(() => {
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const addReport = (data: Omit<Report, 'id' | 'time'>) => {
        const newReport = { ...data, id: Date.now(), time: 'Just now' };
        setReports([newReport, ...reports]);
        // ADD XP: +10 points per report
        setUserXP(prev => prev + 10);
    };

    const markWelcomeAsSeen = () => setHasSeenWelcome(true);
    const toggleTheme = () => setIsDarkMode(prev => !prev);

    // Calculate Rank based on XP
    let userRank = 'Passenger';
    if (userXP >= 50) userRank = 'Route Scout';
    if (userXP >= 200) userRank = 'Matatu Commander';

    return (
        <ReportsContext.Provider value={{
            reports, addReport, hasSeenWelcome, markWelcomeAsSeen,
            userXP, userRank, isDarkMode, toggleTheme
        }}>
            {children}
        </ReportsContext.Provider>
    );
}

export function useReports() {
    const context = useContext(ReportsContext);
    if (context === undefined) throw new Error('useReports must be used within a ReportsProvider');
    return context;
}