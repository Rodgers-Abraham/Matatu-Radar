"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 1. Updated Report Definition
export type Report = {
    id: number;
    route: string;
    fare: number;
    safety: 'SAFE' | 'DANGER';
    // New Fields
    incident: 'NONE' | 'ACCIDENT' | 'JAM' | 'MAINTENANCE' | 'POLICE';
    sacco: string;
    plate: string;
    dangerDetails: string; // e.g., "Overloading", "Speeding"
    time: string;
};

type ReportsContextType = {
    reports: Report[];
    addReport: (data: Omit<Report, 'id' | 'time'>) => void;
    hasSeenWelcome: boolean;
    markWelcomeAsSeen: () => void;
};

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export function ReportsProvider({ children }: { children: ReactNode }) {
    // Initial Mock Data
    const initialData: Report[] = [
        {
            id: 1, route: 'Waiyaki Way', fare: 80, safety: 'SAFE',
            incident: 'NONE', sacco: 'Super Metro', plate: 'KDC 123A', dangerDetails: '', time: '5 mins ago'
        },
        {
            id: 2, route: 'Thika Road', fare: 100, safety: 'DANGER',
            incident: 'POLICE', sacco: '', plate: '', dangerDetails: 'Overloading', time: '10 mins ago'
        },
    ];

    const [reports, setReports] = useState<Report[]>(initialData);
    const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

    // OPTION 1: Load from Local Storage on startup
    useEffect(() => {
        const savedReports = localStorage.getItem('matatuReports');
        const savedWelcome = localStorage.getItem('hasSeenWelcome');

        if (savedReports) setReports(JSON.parse(savedReports));
        if (savedWelcome) setHasSeenWelcome(JSON.parse(savedWelcome));
    }, []);

    // OPTION 1: Save to Local Storage whenever data changes
    useEffect(() => {
        localStorage.setItem('matatuReports', JSON.stringify(reports));
    }, [reports]);

    useEffect(() => {
        localStorage.setItem('hasSeenWelcome', JSON.stringify(hasSeenWelcome));
    }, [hasSeenWelcome]);

    // Updated Add Function
    const addReport = (data: Omit<Report, 'id' | 'time'>) => {
        const newReport = {
            ...data,
            id: Date.now(),
            time: 'Just now',
        };
        setReports([newReport, ...reports]);
    };

    const markWelcomeAsSeen = () => setHasSeenWelcome(true);

    return (
        <ReportsContext.Provider value={{ reports, addReport, hasSeenWelcome, markWelcomeAsSeen }}>
            {children}
        </ReportsContext.Provider>
    );
}

export function useReports() {
    const context = useContext(ReportsContext);
    if (context === undefined) throw new Error('useReports must be used within a ReportsProvider');
    return context;
}