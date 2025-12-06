export interface Report {
    id: string;
    routeName: string;
    fare: number;
    safetyRating: number; // 1-5
    comment?: string;
    timestamp: string;
}

export const MOCK_REPORTS: Report[] = [
    {
        id: "1",
        routeName: "Waiyaki Way -> CBD",
        fare: 80,
        safetyRating: 4,
        comment: "Smooth ride, reasonable fare.",
        timestamp: "5 mins ago",
    },
    {
        id: "2",
        routeName: "Westlands -> Kangemi",
        fare: 50,
        safetyRating: 2,
        comment: "Driving too fast!",
        timestamp: "15 mins ago",
    },
    {
        id: "3",
        routeName: "Thika Road -> CBD",
        fare: 100,
        safetyRating: 5,
        timestamp: "1 hour ago",
    },
    {
        id: "4",
        routeName: "Ngong Road -> CBD",
        fare: 120,
        safetyRating: 1,
        comment: "Overloading and loud music.",
        timestamp: "2 hours ago",
    },
    {
        id: "5",
        routeName: "CBD -> South B",
        fare: 60,
        safetyRating: 3,
        timestamp: "3 hours ago",
    },
];
