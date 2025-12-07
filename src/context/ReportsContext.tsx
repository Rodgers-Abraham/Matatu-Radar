"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '@/lib/firebase'; 
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

export type Report = {
  id: string; 
  route: string;
  fare: number;
  safety: 'SAFE' | 'DANGER'; 
  incident: 'NONE' | 'ACCIDENT' | 'JAM' | 'MAINTENANCE' | 'POLICE';
  sacco: string;
  plate: string;
  dangerDetails: string;
  time: string;
  timestamp?: any;
};

type ReportsContextType = {
  reports: Report[];
  addReport: (data: Omit<Report, 'id' | 'time' | 'timestamp'>) => void;
  hasSeenWelcome: boolean;
  markWelcomeAsSeen: () => void;
  userXP: number;
  userRank: string;
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export function ReportsProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<Report[]>([]);
  
  // Initialize states with defaults
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  const [userXP, setUserXP] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // EFFECT 1: Firebase Listener (Cloud Data)
  useEffect(() => {
    const q = query(collection(db, "reports"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveReports = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          time: data.timestamp ? getTimeDifference(data.timestamp.toDate()) : 'Just now'
        } as Report;
      });
      setReports(liveReports);
    });

    return () => unsubscribe();
  }, []);

  // EFFECT 2: Local Storage (Phone Data)
  // We put this in its own effect to fix the "Cascading Render" error
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedWelcome = localStorage.getItem('hasSeenWelcome');
      const savedXP = localStorage.getItem('userXP');
      const savedTheme = localStorage.getItem('isDarkMode');
      
      if (savedWelcome) setHasSeenWelcome(JSON.parse(savedWelcome));
      if (savedXP) setUserXP(JSON.parse(savedXP));
      if (savedTheme) setIsDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  // EFFECT 3: Sync Changes BACK to Local Storage
  useEffect(() => { 
    if (typeof window !== 'undefined') localStorage.setItem('hasSeenWelcome', JSON.stringify(hasSeenWelcome)); 
  }, [hasSeenWelcome]);
  
  useEffect(() => { 
    if (typeof window !== 'undefined') localStorage.setItem('userXP', JSON.stringify(userXP)); 
  }, [userXP]);

  // Theme Logic
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
      if (isDarkMode) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Send to Database Function
  const addReport = async (data: Omit<Report, 'id' | 'time' | 'timestamp'>) => {
    try {
      await addDoc(collection(db, "reports"), {
        ...data,
        timestamp: serverTimestamp() 
      });
      setUserXP(prev => prev + 10);
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Could not send report. Check internet.");
    }
  };

  const markWelcomeAsSeen = () => setHasSeenWelcome(true);
  const toggleTheme = () => setIsDarkMode(prev => !prev);

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

function getTimeDifference(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " mins ago";
  return "Just now";
}