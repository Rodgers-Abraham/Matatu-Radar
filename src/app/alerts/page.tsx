"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useReports } from '@/context/ReportsContext'; // 1. Import the Brain
import { AlertTriangle, ShieldAlert, Siren, Construction } from 'lucide-react'; // Import icons

export default function AlertsPage() {
    const router = useRouter();
    const { reports } = useReports(); // 2. Get the real data

    // 3. Filter: Only show items that are DANGER or have an INCIDENT
    const criticalAlerts = reports.filter((report) =>
        report.safety === 'DANGER' || report.incident !== 'NONE'
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 pb-20">

            {/* Header */}
            <div className="flex items-center gap-4 mb-6 sticky top-0 bg-gray-50 z-10 py-2">
                <button
                    onClick={() => router.back()}
                    className="bg-black text-white px-4 py-2 rounded-lg font-bold shadow-md active:scale-95"
                >
                    ← BACK
                </button>
                <h1 className="text-2xl font-bold text-black flex items-center gap-2">
                    <ShieldAlert className="w-8 h-8 text-red-600" />
                    Live Alerts
                </h1>
            </div>

            {/* The List of Critical Alerts */}
            <div className="space-y-4">
                {criticalAlerts.length === 0 ? (
                    // Empty State (If everything is safe)
                    <div className="text-center py-20 opacity-50">
                        <ShieldAlert className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <p className="text-xl font-bold text-gray-500">No active alerts</p>
                        <p className="text-sm text-gray-400">The roads are currently clear.</p>
                    </div>
                ) : (
                    // Real Alerts List
                    criticalAlerts.map((alert) => (
                        <div key={alert.id} className="bg-red-50 p-4 rounded-xl shadow-sm border border-red-100 relative overflow-hidden">

                            {/* Red Stripe on the left */}
                            <div className="absolute left-0 top-0 bottom-0 w-2 bg-red-500"></div>

                            <div className="pl-4">
                                {/* Header: Type of Danger */}
                                <div className="flex justify-between items-start mb-2">
                                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-black uppercase flex items-center gap-2">
                                        {alert.incident === 'ACCIDENT' ? <><Siren className="w-4 h-4" /> ACCIDENT</> :
                                            alert.incident === 'POLICE' ? <><ShieldAlert className="w-4 h-4" /> POLICE</> :
                                                alert.incident === 'MAINTENANCE' ? <><Construction className="w-4 h-4" /> WORKS</> :
                                                    alert.incident === 'JAM' ? <><AlertTriangle className="w-4 h-4" /> TRAFFIC</> :
                                                        '⚠️ DANGER'}
                                    </span>
                                    <span className="text-gray-500 text-xs font-medium">{alert.time}</span>
                                </div>

                                {/* Route */}
                                <h3 className="font-bold text-xl text-gray-900 mb-1">
                                    {alert.route}
                                </h3>

                                {/* Specific Details */}
                                <p className="text-gray-700 font-medium">
                                    {alert.dangerDetails ? alert.dangerDetails :
                                        alert.incident === 'JAM' ? 'Heavy traffic reported.' :
                                            alert.incident === 'POLICE' ? 'Police checkpoint ahead.' :
                                                'Caution advised on this route.'}
                                </p>

                                {/* Vehicle Sacco (if known) */}
                                {alert.sacco && (
                                    <div className="mt-3 text-sm text-gray-500 bg-white inline-block px-2 py-1 rounded border border-gray-200">
                                        Bus: {alert.sacco} {alert.plate ? `(${alert.plate})` : ''}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}