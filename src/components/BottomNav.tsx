import Link from 'next/link';
import { Home, AlertTriangle, PlusCircle } from 'lucide-react';

export default function BottomNav() {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 pb-4 flex justify-around items-center z-50">

            {/* Home Button */}
            <Link href="/" className="flex flex-col items-center text-gray-600 hover:text-black">
                <Home className="w-6 h-6" />
                <span className="text-xs font-medium">Home</span>
            </Link>

            {/* Report Button (Center, Big) */}
            <Link href="/report">
                <div className="bg-yellow-400 p-4 rounded-full -mt-8 border-4 border-white shadow-lg">
                    <PlusCircle className="w-8 h-8 text-black" />
                </div>
            </Link>

            {/* Alerts Button */}
            <Link href="/alerts" className="flex flex-col items-center text-gray-600 hover:text-black">
                <AlertTriangle className="w-6 h-6" />
                <span className="text-xs font-medium">Alerts</span>
            </Link>
        </div>
    );
}