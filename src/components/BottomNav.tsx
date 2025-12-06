import Link from 'next/link';
import { Home, AlertTriangle, PlusCircle, User } from 'lucide-react';

export default function BottomNav() {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black dark:border-gray-800 border-t border-gray-200 p-2 pb-4 flex justify-around items-center z-50 transition-colors">

            <Link href="/" className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                <Home className="w-6 h-6" />
                <span className="text-xs font-medium">Home</span>
            </Link>

            <Link href="/report">
                <div className="bg-yellow-400 p-4 rounded-full -mt-8 border-4 border-white dark:border-black shadow-lg">
                    <PlusCircle className="w-8 h-8 text-black" />
                </div>
            </Link>

            <Link href="/alerts" className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                <AlertTriangle className="w-6 h-6" />
                <span className="text-xs font-medium">Alerts</span>
            </Link>

            {/* NEW PROFILE BUTTON */}
            <Link href="/profile" className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                <User className="w-6 h-6" />
                <span className="text-xs font-medium">Profile</span>
            </Link>
        </div>
    );
}