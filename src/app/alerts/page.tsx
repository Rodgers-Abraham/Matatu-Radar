"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useReports } from '@/context/ReportsContext';
import { AlertTriangle, ShieldAlert, Siren, Construction } from 'lucide-react';

export default function AlertsPage() {
    const router = useRouter();
    const { reports } = useReports();

    const criticalAlerts = reports.filter((report) =>
        report.safety === 'DANGER' || report.incident !== 'NONE'
    );

    return (
        // REMOVED bg-gray-50 so it uses the Global Body Color
        <div className="min-h-screen p-4 pb-20 transition-colors">

            {/* Header */}
            <div className="flex items-center gap-4 mb-6 sticky top-0 bg-gray-50 dark:bg-gray-900 z-10 py-2 transition-colors">
                <button
                    onClick={() => router.back()}
                    className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg font-bold shadow-md active:scale-95 transition-colors"
                >
                    ← BACK
                </button>
                <h1 className="text-2xl font-bold text-black dark:text-white flex items-center gap-2">
                    <ShieldAlert className="w-8 h-8 text-red-600" />
                    Live Alerts
                </h1>
            </div>

            {/* The List */}
            <div className="space-y-4">
                {criticalAlerts.length === 0 ? (
                    <div className="text-center py-20 opacity-50">
                        <ShieldAlert className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <p className="text-xl font-bold text-gray-500 dark:text-gray-400">No active alerts</p>
                        <p className="text-sm text-gray-400">The roads are currently clear.</p>
                    </div>
                ) : (
                    criticalAlerts.map((alert) => (
                        // ADDED: dark:bg-red-900/20 dark:border-red-900
                        <div key={alert.id} className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl shadow-sm border border-red-100 dark:border-red-900/50 relative overflow-hidden transition-colors">

                            <div className="absolute left-0 top-0 bottom-0 w-2 bg-red-500"></div>

                            <div className="pl-4">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 px-3 py-1 rounded-full text-xs font-black uppercase flex items-center gap-2">
                                        {alert.incident === 'ACCIDENT' ? <><Siren className="w-4 h-4" /> ACCIDENT</> :
                                            alert.incident === 'POLICE' ? <><ShieldAlert className="w-4 h-4" /> POLICE</> :
                                                alert.incident === 'MAINTENANCE' ? <><Construction className="w-4 h-4" /> WORKS</> :
                                                    alert.incident === 'JAM' ? <><AlertTriangle className="w-4 h-4" /> TRAFFIC</> :
                                                        '⚠️ DANGER'}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">{alert.time}</span>
                                </div>

                                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">
                                    {alert.route}
                                </h3>

                                <p className="text-gray-700 dark:text-gray-300 font-medium">
                                    {alert.dangerDetails ? alert.dangerDetails :
                                        alert.incident === 'JAM' ? 'Heavy traffic reported.' :
                                            alert.incident === 'POLICE' ? 'Police checkpoint ahead.' :
                                                'Caution advised on this route.'}
                                </p>

                                {alert.sacco && (
                                    <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 inline-block px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
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