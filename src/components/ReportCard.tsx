import { Report } from '@/lib/mock_data';
import { Clock, ShieldAlert, ShieldCheck, Shield } from 'lucide-react';

interface ReportCardProps {
    report: Report;
}

export default function ReportCard({ report }: ReportCardProps) {
    const getSafetyColor = (rating: number) => {
        if (rating >= 4) return 'bg-green-600 text-white';
        if (rating >= 3) return 'bg-yellow-500 text-black';
        return 'bg-red-600 text-white';
    };

    const getSafetyIcon = (rating: number) => {
        if (rating >= 4) return <ShieldCheck size={16} />;
        if (rating >= 3) return <Shield size={16} />;
        return <ShieldAlert size={16} />;
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-4 mb-3 border-l-4 border-l-matatu-yellow">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-black">{report.routeName}</h3>
                <span className="bg-black text-matatu-yellow px-3 py-1 rounded-full font-bold text-sm">
                    {report.fare} KES
                </span>
            </div>

            {report.comment && (
                <p className="text-gray-600 text-sm mb-3 italic">"{report.comment}"</p>
            )}

            <div className="flex justify-between items-center text-xs text-gray-500 mt-2 border-t pt-2 border-gray-100">
                <div className={`flex items-center gap-1 px-2 py-1 rounded ${getSafetyColor(report.safetyRating)}`}>
                    {getSafetyIcon(report.safetyRating)}
                    <span className="font-bold">Safety: {report.safetyRating}/5</span>
                </div>

                <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{report.timestamp}</span>
                </div>
            </div>
        </div>
    );
}
