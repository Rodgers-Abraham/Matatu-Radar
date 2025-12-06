import { Report } from '@/lib/mock_data';
import ReportCard from './ReportCard';

interface FeedProps {
    reports: Report[];
}

export default function Feed({ reports }: FeedProps) {
    if (reports.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                <p>No reports found.</p>
                <p className="text-sm">Be the first to report!</p>
            </div>
        );
    }

    return (
        <div className="pb-24"> {/* Padding bottom for fixed navbar */}
            {reports.map((report) => (
                <ReportCard key={report.id} report={report} />
            ))}
        </div>
    );
}
