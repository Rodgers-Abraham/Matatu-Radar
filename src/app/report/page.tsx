"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useReports } from '@/context/ReportsContext';

export default function ReportPage() {
    const router = useRouter();
    const { addReport } = useReports();

    // Form States
    const [route, setRoute] = useState('');
    const [fare, setFare] = useState('');
    const [sacco, setSacco] = useState('');
    const [plate, setPlate] = useState('');
    const [incident, setIncident] = useState('NONE');
    const [safety, setSafety] = useState('SAFE');
    const [dangerDetails, setDangerDetails] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // @ts-ignore - Ignoring type check for simplicity in this step
        addReport({
            route,
            fare: Number(fare),
            sacco,
            plate,
            incident: incident as any,
            safety: safety as any,
            dangerDetails
        });
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 pb-20">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6 sticky top-0 bg-gray-50 z-10 py-2">
                <button onClick={() => router.back()} className="bg-black text-white px-4 py-2 rounded-lg font-bold shadow-md">
                    ← BACK
                </button>
                <h1 className="text-2xl font-bold text-black">Report Details</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* SECTION 1: ROUTE INFO */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-4">
                    <h3 className="font-bold text-gray-500 text-sm uppercase">Journey Info</h3>
                    <input
                        type="text" value={route} onChange={(e) => setRoute(e.target.value)}
                        placeholder="Route (e.g. Westlands - CBD)"
                        className="w-full p-3 rounded-lg border border-gray-300 text-black" required
                    />
                    <input
                        type="number" value={fare} onChange={(e) => setFare(e.target.value)}
                        placeholder="Fare (KES)"
                        className="w-full p-3 rounded-lg border border-gray-300 text-black" required
                    />
                </div>

                {/* SECTION 2: VEHICLE INFO (Optional) */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-4">
                    <h3 className="font-bold text-gray-500 text-sm uppercase">Vehicle (Optional)</h3>
                    <input
                        type="text" value={sacco} onChange={(e) => setSacco(e.target.value)}
                        placeholder="Sacco Name (e.g. Super Metro)"
                        className="w-full p-3 rounded-lg border border-gray-300 text-black"
                    />
                    <input
                        type="text" value={plate} onChange={(e) => setPlate(e.target.value)}
                        placeholder="Number Plate (e.g. KDC 123A)"
                        className="w-full p-3 rounded-lg border border-gray-300 text-black"
                    />
                </div>

                {/* SECTION 3: INCIDENTS */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-4">
                    <h3 className="font-bold text-gray-500 text-sm uppercase">Road Conditions</h3>
                    <select
                        value={incident} onChange={(e) => setIncident(e.target.value)}
                        className="w-full p-3 rounded-lg border border-gray-300 text-black bg-white"
                    >
                        <option value="NONE">Road is Clear</option>
                        <option value="JAM">Heavy Traffic / Jam</option>
                        <option value="ACCIDENT">Accident Spotted</option>
                        <option value="MAINTENANCE">Road Maintenance</option>
                        <option value="POLICE">Police Checkpoint</option>
                    </select>
                </div>

                {/* SECTION 4: SAFETY */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-4">
                    <h3 className="font-bold text-gray-500 text-sm uppercase">Safety Status</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button type="button" onClick={() => setSafety('SAFE')}
                            className={`p-3 rounded-lg font-bold border-2 ${safety === 'SAFE' ? 'bg-green-100 border-green-500 text-green-700' : 'border-gray-200 text-gray-400'}`}>
                            Safe ✅
                        </button>
                        <button type="button" onClick={() => setSafety('DANGER')}
                            className={`p-3 rounded-lg font-bold border-2 ${safety === 'DANGER' ? 'bg-red-100 border-red-500 text-red-700' : 'border-gray-200 text-gray-400'}`}>
                            Danger ⚠️
                        </button>
                    </div>

                    {/* Show this only if DANGER is selected */}
                    {safety === 'DANGER' && (
                        <select
                            value={dangerDetails} onChange={(e) => setDangerDetails(e.target.value)}
                            className="w-full p-3 rounded-lg border border-red-200 text-red-800 bg-red-50 font-medium"
                        >
                            <option value="">Select Danger Type...</option>
                            <option value="Overloading">Overloading</option>
                            <option value="Dangerous Driving">Dangerous Driving / Speeding</option>
                            <option value="Harassment">Harassment / Rude Crew</option>
                            <option value="Drunk Crew">Drunk Driver/Conductor</option>
                        </select>
                    )}
                </div>

                <button type="submit" className="w-full bg-yellow-400 text-black font-black text-xl py-4 rounded-xl mt-4 shadow-md">
                    SUBMIT REPORT
                </button>
            </form>
        </div>
    );
}