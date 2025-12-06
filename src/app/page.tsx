"use client";

import { useState } from 'react';
import { Search, MapPin, Clock, AlertTriangle, Bus, Share2, Filter, ShieldAlert } from 'lucide-react';
import { useReports, Report } from '@/context/ReportsContext';
import BottomNav from '@/components/BottomNav';

export default function Home() {
  const { reports, hasSeenWelcome, markWelcomeAsSeen } = useReports();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');

  const handleShare = (report: Report) => {
    const text = `🚨 *MatatuRadar Alert* 🚨\n\nRoute: ${report.route}\nStatus: ${report.safety === 'DANGER' ? '⚠️ DANGER' : '✅ Safe'}\nFare: KES ${report.fare}\n${report.incident !== 'NONE' ? `Condition: ${report.incident}` : ''}\n\nCheck full details on MatatuRadar!`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const filteredReports = reports
    .filter((r) => {
      const matchesSearch = r.route.toLowerCase().includes(searchTerm.toLowerCase());
      let matchesCategory = true;
      if (activeFilter === 'DANGER') matchesCategory = r.safety === 'DANGER';
      if (activeFilter === 'POLICE') matchesCategory = r.incident === 'POLICE';
      if (activeFilter === 'CHEAP') matchesCategory = r.fare < 80;
      return matchesSearch && matchesCategory;
    })
    .slice(0, 20);

  if (!hasSeenWelcome) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-yellow-400 p-4 rounded-full mb-6 animate-bounce">
          <MapPin className="w-12 h-12 text-black" />
        </div>
        <h1 className="text-4xl font-black text-white italic tracking-tighter mb-4">
          MATATU<span className="text-yellow-400">RADAR</span>
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          Avoid the chaos. Check fares, safety ratings, and police alerts before you board.
        </p>
        <button onClick={markWelcomeAsSeen} className="w-full bg-yellow-400 text-black font-bold text-xl py-4 rounded-xl shadow-lg">
          GET STARTED
        </button>
      </div>
    );
  }

  return (
    // ADDED: dark:bg-gray-900
    <main className="min-h-screen pb-24">

      {/* Header Area */}
      <div className="bg-black p-6 rounded-b-3xl shadow-lg sticky top-0 z-20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-yellow-400 font-bold text-xl">MatatuRadar</h2>
          {activeFilter !== 'ALL' && (
            <span className="text-xs text-gray-400">Filter Active: {activeFilter}</span>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
          {/* ADDED: dark:bg-gray-800 dark:text-white */}
          <input
            type="text" placeholder="Search route..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl text-black dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 border-none"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${activeFilter === 'ALL' ? 'bg-yellow-400 text-black' : 'bg-gray-800 dark:bg-gray-700 text-gray-300'
              }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('DANGER')}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap flex items-center gap-1 transition-colors ${activeFilter === 'DANGER' ? 'bg-red-500 text-white' : 'bg-gray-800 dark:bg-gray-700 text-gray-300'
              }`}
          >
            <ShieldAlert className="w-4 h-4" /> Danger
          </button>
          <button
            onClick={() => setActiveFilter('POLICE')}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap flex items-center gap-1 transition-colors ${activeFilter === 'POLICE' ? 'bg-blue-500 text-white' : 'bg-gray-800 dark:bg-gray-700 text-gray-300'
              }`}
          >
            👮 Police
          </button>
          <button
            onClick={() => setActiveFilter('CHEAP')}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${activeFilter === 'CHEAP' ? 'bg-green-500 text-white' : 'bg-gray-800 dark:bg-gray-700 text-gray-300'
              }`}
          >
            📉 Cheap (&lt;80)
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="p-4 space-y-3">
        {filteredReports.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <Filter className="w-12 h-12 mx-auto mb-2 opacity-20" />
            <p>No reports match your filters.</p>
            <button onClick={() => setActiveFilter('ALL')} className="text-yellow-500 font-bold mt-2">Clear Filters</button>
          </div>
        ) : (
          filteredReports.map((report) => (
            // ADDED: dark:bg-gray-800 dark:border-gray-700
            <div key={report.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 relative transition-colors">

              {/* Top Row */}
              <div className="flex justify-between items-start mb-2 pr-8">
                {/* ADDED: dark:text-white */}
                <h4 className="font-bold text-lg text-gray-800 dark:text-white leading-tight">{report.route}</h4>
                <span className={`px-2 py-1 rounded text-xs font-bold whitespace-nowrap ml-2 ${report.safety === 'SAFE' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                  }`}>
                  {report.safety === 'DANGER' ? '⚠️ DANGER' : '✅ SAFE'}
                </span>
              </div>

              {/* Share Button */}
              <button
                onClick={() => handleShare(report)}
                className="absolute top-4 right-4 text-gray-400 hover:text-green-600 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>

              {/* Middle Row */}
              <div className="flex flex-wrap gap-2 mb-3">
                {/* ADDED: dark:bg-gray-700 dark:text-white */}
                <span className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded text-sm font-bold">
                  KES {report.fare}
                </span>
                {report.sacco && (
                  <span className="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-400 px-2 py-1 rounded text-sm font-medium flex items-center gap-1">
                    <Bus className="w-3 h-3" /> {report.sacco}
                  </span>
                )}
              </div>

              {/* Alerts */}
              {(report.incident !== 'NONE' || report.dangerDetails) && (
                <div className="mt-2 pt-2 border-t border-gray-50 dark:border-gray-700 text-sm">
                  {report.incident !== 'NONE' && (
                    <div className="text-orange-600 dark:text-orange-400 font-bold flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      {report.incident === 'ACCIDENT' ? 'Accident Reported' :
                        report.incident === 'JAM' ? 'Heavy Traffic' :
                          report.incident === 'POLICE' ? 'Police Checkpoint' :
                            report.incident === 'MAINTENANCE' ? 'Road Works' : report.incident}
                    </div>
                  )}
                  {report.dangerDetails && (
                    <div className="text-red-600 dark:text-red-400 font-medium mt-1 pl-5">
                      • {report.dangerDetails}
                    </div>
                  )}
                </div>
              )}

              <div className="text-right mt-2">
                <span className="text-gray-400 text-xs flex items-center justify-end gap-1">
                  <Clock className="w-3 h-3" /> {report.time}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      <BottomNav />
    </main>
  );
}