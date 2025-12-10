"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { useReports } from '@/context/ReportsContext';
import { Car, Bus, Siren, Phone, MapPin } from 'lucide-react';

export default function ReportPage() {
  const router = useRouter();
  const { addReport } = useReports(); 
  
  const [transportMode, setTransportMode] = useState<'PUBLIC' | 'PERSONAL'>('PUBLIC');
  const [reportCategory, setReportCategory] = useState<'ROAD' | 'VEHICLE'>('ROAD');

  const [route, setRoute] = useState('');
  const [fare, setFare] = useState('');
  const [sacco, setSacco] = useState('');
  const [plate, setPlate] = useState('');
  
  const [incident, setIncident] = useState('NONE'); 
  const [dangerDetails, setDangerDetails] = useState(''); 
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    if (incident === 'ACCIDENT') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
          },
          () => setLocation(null)
        );
      }
    }
  }, [incident]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let calculatedSafety: 'SAFE' | 'DANGER' = 'SAFE';
    if (incident !== 'NONE' || dangerDetails !== '') calculatedSafety = 'DANGER';

    // @ts-ignore
    addReport({
      route,
      fare: transportMode === 'PUBLIC' ? Number(fare) : 0, 
      sacco: (transportMode === 'PUBLIC' && reportCategory === 'VEHICLE') ? sacco : '', 
      plate: (transportMode === 'PUBLIC' && reportCategory === 'VEHICLE') ? plate : '',
      incident: reportCategory === 'ROAD' ? incident : 'NONE',
      safety: calculatedSafety as any,
      dangerDetails: reportCategory === 'VEHICLE' ? dangerDetails : ''
    });
    router.push('/');
  };

  return (
    <div className="min-h-screen p-4 pb-24 transition-colors">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 sticky top-0 bg-gray-50 dark:bg-gray-900 z-10 py-2 transition-colors">
        <button onClick={() => router.back()} className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg font-bold shadow-md transition-colors">
          ← BACK
        </button>
        <h1 className="text-2xl font-bold text-black dark:text-white">Make Report</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* SECTION 1: TRANSPORT MODE */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-gray-500 dark:text-gray-400 text-sm uppercase mb-3">I am using...</h3>
          <div className="grid grid-cols-2 gap-3">
            <button 
              type="button" 
              onClick={() => setTransportMode('PUBLIC')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all duration-200 ${
                transportMode === 'PUBLIC' 
                  ? 'bg-yellow-400 border-yellow-400 text-black shadow-md transform scale-105' 
                  : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400 hover:bg-gray-50' 
              }`}
            >
              <Bus className="w-8 h-8" />
              <span className="font-bold text-sm">Public (Matatu)</span>
            </button>
            
            <button 
              type="button" 
              onClick={() => setTransportMode('PERSONAL')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all duration-200 ${
                transportMode === 'PERSONAL' 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md transform scale-105' 
                  : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400 hover:bg-gray-50' 
              }`}
            >
              <Car className="w-8 h-8" />
              <span className="font-bold text-sm">Personal Car</span>
            </button>
          </div>
        </div>

        {/* SECTION 2: WHAT IS HAPPENING? */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-gray-500 dark:text-gray-400 text-sm uppercase mb-3">What are you reporting?</h3>
          
          {/* Tabs */}
          <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg mb-4">
            <button
              type="button"
              onClick={() => { setReportCategory('ROAD'); setDangerDetails(''); }}
              className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${
                reportCategory === 'ROAD' 
                  ? 'bg-black text-white shadow' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Road Issue
            </button>
            
            {transportMode === 'PUBLIC' && (
              <button
                type="button"
                onClick={() => { setReportCategory('VEHICLE'); setIncident('NONE'); }}
                className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${
                  reportCategory === 'VEHICLE' 
                    ? 'bg-black text-white shadow' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Vehicle Issue
              </button>
            )}
          </div>

          {/* Conditional Dropdowns */}
          {reportCategory === 'ROAD' ? (
            <select 
              value={incident} onChange={(e) => setIncident(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white font-medium focus:ring-2 focus:ring-black"
            >
              <option value="NONE" className="text-black dark:text-white">Select Road Incident...</option>
              <option value="JAM" className="text-black dark:text-white">🚗 Heavy Traffic / Jam</option>
              <option value="ACCIDENT" className="text-black dark:text-white">💥 Accident Spotted</option>
              <option value="POLICE" className="text-black dark:text-white">👮 Police Checkpoint</option>
              <option value="MAINTENANCE" className="text-black dark:text-white">🚧 Road Maintenance</option>
            </select>
          ) : (
            // FIX: Explicit text color for the select and options to ensure readability
            <select 
              value={dangerDetails} onChange={(e) => setDangerDetails(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-red-500 bg-red-50 dark:bg-red-900/40 text-red-900 dark:text-red-100 font-bold focus:ring-2 focus:ring-red-500"
            >
              {/* Force option text to be black so it's readable on white browser defaults */}
              <option value="" className="text-black">Select Danger...</option>
              <option value="Overloading" className="text-black">⚠️ Overloading</option>
              <option value="Dangerous Driving" className="text-black">🏎️ Dangerous Driving</option>
              <option value="Harassment" className="text-black">🗣️ Harassment / Rude</option>
              <option value="Drunk Crew" className="text-black">🍺 Drunk Crew</option>
            </select>
          )}
        </div>

        {/* SOS PANIC BUTTON */}
        {incident === 'ACCIDENT' && (
          <div className="bg-red-900 text-white p-4 rounded-xl shadow-lg border-2 border-red-600 animate-pulse">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-lg flex items-center gap-2 text-white">
                <Siren className="w-6 h-6 text-yellow-400" /> EMERGENCY
              </h3>
            </div>
            <p className="text-red-200 text-sm mb-4">
              Life-threatening situation? Call for help immediately.
            </p>
            
            {location && (
              <div className="bg-black/30 p-2 rounded mb-3 text-xs flex items-center gap-2 font-mono">
                <MapPin className="w-4 h-4 text-yellow-400" />
                GPS: {location}
              </div>
            )}

            <a 
              href="tel:999" 
              className="block w-full bg-red-600 text-white font-black text-center py-4 rounded-lg text-xl hover:bg-red-500 transition-colors shadow-lg"
            >
              <Phone className="w-6 h-6 inline-block mr-2" />
              CALL 999 NOW
            </a>
          </div>
        )}

        {/* SECTION 3: DETAILS */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
          <h3 className="font-bold text-gray-500 dark:text-gray-400 text-sm uppercase">Details</h3>
          
          <input 
            type="text" value={route} onChange={(e) => setRoute(e.target.value)}
            placeholder="Where is this? (Route Name)" 
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:border-yellow-400" required
          />
          
          {transportMode === 'PUBLIC' && (
            <input 
              type="number" value={fare} onChange={(e) => setFare(e.target.value)}
              placeholder="Fare Charged (KES)" 
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:border-yellow-400" required
            />
          )}

          {transportMode === 'PUBLIC' && reportCategory === 'VEHICLE' && (
            <div className="pt-2 border-t border-gray-100 dark:border-gray-700 space-y-4 animate-in fade-in">
              <p className="text-xs text-red-500 font-bold">Required Vehicle Details:</p>
              <input 
                type="text" value={sacco} onChange={(e) => setSacco(e.target.value)}
                placeholder="Sacco Name" 
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:border-red-400"
                required
              />
              <input 
                type="text" value={plate} onChange={(e) => setPlate(e.target.value)}
                placeholder="Number Plate" 
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:border-red-400"
                required
              />
            </div>
          )}
        </div>

        <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black text-xl py-4 rounded-xl shadow-md transition-colors">
          POST REPORT
        </button>
      </form>
    </div>
  );
}