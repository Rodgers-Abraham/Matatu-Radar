import { Home, PlusCircle, Bell } from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
    onReportClick: () => void;
}

export default function Navbar({ onReportClick }: NavbarProps) {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 flex justify-around items-center z-50 border-t border-gray-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <Link href="/" className="flex flex-col items-center gap-1 opacity-80 hover:opacity-100 hover:text-matatu-yellow transition-colors">
                <Home size={24} />
                <span className="text-xs font-bold uppercase">Home</span>
            </Link>

            <button
                onClick={onReportClick}
                className="flex flex-col items-center gap-1 text-matatu-yellow hover:scale-110 transition-transform active:scale-95"
            >
                <PlusCircle size={32} />
                <span className="text-xs font-bold uppercase">Report</span>
            </button>

            <Link href="/alerts" className="flex flex-col items-center gap-1 opacity-80 hover:opacity-100 hover:text-matatu-yellow transition-colors">
                <Bell size={24} />
                <span className="text-xs font-bold uppercase">Alerts</span>
            </Link>
        </nav>
    );
}
