"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useReports } from '@/context/ReportsContext';

export default function ReportPage() {
    const router = useRouter();
    const { addReport } = useReports();

    const [route, setRoute] = useState('');
    const [fare, setFare] = useState('');
    const [sacco, setSacco] = useState('');
    const [plate, setPlate] = useState('');
    const [incident, setIncident] = useState('NONE');
    const [safety, setSafety] = useState('SAFE');
    const [dangerDetails, setDangerDetails] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // @ts-ignore
        addReport({
            route, fare: Number(fare), sacco, plate, incident: incident as any, safety: safety as any, dangerDetails
        });
        router.push('/');
    };

    return (
        <div className="min-h-screen p-4 pb-20 transition-colors">

            {/* Header */}
            <div className="flex items-center gap-4 mb-6 sticky top-0 bg-gray-50 dark:bg-gray-900 z-10 py-2 transition-colors">
                <button onClick={() => router.back()} className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg font-bold shadow-md transition-colors">
                    ← BACK
                </button>
                <h1 className="text-2xl font-bold text-black dark:text-white">Report Details</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* SECTION 1 */}
                {/* ADDED: dark:bg-gray-800 dark:border-gray-700 */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-4 transition-colors">
                    <h3 className="font-bold text-gray-500 dark:text-gray-400 text-sm uppercase">Journey Info</h3>
                    {/* INPUTS: dark:bg-gray-700 dark:text-white dark:border-gray-600 */}
                    <input
                        type="text" value={route} onChange={(e) => setRoute(e.target.value)}
                        placeholder="Route (e.g. Westlands - CBD)"
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400" required
                    />
                    <input
                        type="number" value={fare} onChange={(e) => setFare(e.target.value)}
                        placeholder="Fare (KES)"
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400" required
                    />
                </div>

                {/* SECTION 2 */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-4 transition-colors">
                    <h3 className="font-bold text-gray-500 dark:text-gray-400 text-sm uppercase">Vehicle (Optional)</h3>
                    <input
                        type="text" value={sacco} onChange={(e) => setSacco(e.target.value)}
                        placeholder="Sacco Name (e.g. Super Metro)"
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400"
                    />
                    <input
                        type="text" value={plate} onChange={(e) => setPlate(e.target.value)}
                        placeholder="Number Plate (e.g. KDC 123A)"
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400"
                    />
                </div>

                {/* SECTION 3 */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-4 transition-colors">
                    <h3 className="font-bold text-gray-500 dark:text-gray-400 text-sm uppercase">Road Conditions</h3>
                    <select
                        value={incident} onChange={(e) => setIncident(e.target.value)}
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white"
                    >
                        <option value="NONE">Road is Clear</option>
                        <option value="JAM">Heavy Traffic / Jam</option>
                        <option value="ACCIDENT">Accident Spotted</option>
                        <option value="MAINTENANCE">Road Maintenance</option>
                        <option value="POLICE">Police Checkpoint</option>
                    </select>
                </div>

                {/* SECTION 4 */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-4 transition-colors">
                    <h3 className="font-bold text-gray-500 dark:text-gray-400 text-sm uppercase">Safety Status</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button type="button" onClick={() => setSafety('SAFE')}
                            className={`p-3 rounded-lg font-bold border-2 transition-colors ${safety === 'SAFE' ? 'bg-green-100 dark:bg-green-900 border-green-500 text-green-700 dark:text-green-300' : 'border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500'}`}>
                            Safe ✅
                        </button>
                        <button type="button" onClick={() => setSafety('DANGER')}
                            className={`p-3 rounded-lg font-bold border-2 transition-colors ${safety === 'DANGER' ? 'bg-red-100 dark:bg-red-900 border-red-500 text-red-700 dark:text-red-300' : 'border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500'}`}>
                            Danger ⚠️
                        </button>
                    </div>

                    {safety === 'DANGER' && (
                        <select
                            value={dangerDetails} onChange={(e) => setDangerDetails(e.target.value)}
                            className="w-full p-3 rounded-lg border border-red-200 dark:border-red-900 text-red-800 dark:text-red-300 bg-red-50 dark:bg-red-900/20 font-medium"
                        >
                            <option value="">Select Danger Type...</option>
                            <option value="Overloading">Overloading</option>
                            <option value="Dangerous Driving">Dangerous Driving / Speeding</option>
                            <option value="Harassment">Harassment / Rude Crew</option>
                            <option value="Drunk Crew">Drunk Driver/Conductor</option>
                        </select>
                    )}
                </div>

                <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black text-xl py-4 rounded-xl mt-4 shadow-md transition-colors">
                    SUBMIT REPORT
                </button>
            </form>
        </div>
    );
}