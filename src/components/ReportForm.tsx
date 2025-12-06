import { useState } from 'react';
import { X } from 'lucide-react';

interface ReportFormProps {
    onClose: () => void;
    onSubmit: (data: any) => void;
}

export default function ReportForm({ onClose, onSubmit }: ReportFormProps) {
    const [routeName, setRouteName] = useState('');
    const [fare, setFare] = useState('');
    const [safetyRating, setSafetyRating] = useState(3);
    const [comment, setComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            routeName,
            fare: Number(fare),
            safetyRating,
            comment,
            timestamp: 'Just now'
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-end sm:items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-2xl p-6 relative animate-in slide-in-from-bottom-10 fade-in duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-black"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-black pr-10">Report Matatu</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Route Name</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. Westlands -> CBD"
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-black focus:ring-2 focus:ring-matatu-yellow focus:outline-none"
                            value={routeName}
                            onChange={(e) => setRouteName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fare (KES)</label>
                        <input
                            required
                            type="number"
                            placeholder="e.g. 80"
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-black focus:ring-2 focus:ring-matatu-yellow focus:outline-none"
                            value={fare}
                            onChange={(e) => setFare(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Safety Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setSafetyRating(star)}
                                    className={`flex-1 h-12 rounded-lg font-bold text-lg transition-colors ${safetyRating === star
                                            ? 'bg-black text-matatu-yellow ring-2 ring-offset-2 ring-black'
                                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                        }`}
                                >
                                    {star}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 mt-1 px-1">
                            <span>Danger</span>
                            <span>Safe</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Comment (Optional)</label>
                        <textarea
                            rows={3}
                            placeholder="Any additional details?"
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-black focus:ring-2 focus:ring-matatu-yellow focus:outline-none"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-matatu-yellow text-black font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:brightness-105 active:scale-[0.98] transition-all mt-4"
                    >
                        Submit Report
                    </button>
                </form>
            </div>
        </div>
    );
}
