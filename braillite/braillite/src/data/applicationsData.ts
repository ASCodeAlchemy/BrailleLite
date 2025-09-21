// applicationsData.ts

// 1. Add avatarUrl to the interface (making it optional with '?')
export interface Application {
  id: number;
  name: string;
  avatarUrl?: string; // This property was missing
  program: string;
  status: "pending" | "approved" | "reviewed" | "rejected"; // Added 'rejected' status
  date: string;
}

// 2. Add the avatarUrl property to each data object
export const applications: Application[] = [
  { id: 1, name: "Rajesh Kumar", avatarUrl: "https://picsum.photos/seed/Rajesh/40/40", program: "Braille Learning", status: "pending", date: "2025-09-18" },
  { id: 2, name: "Priya Sharma", avatarUrl: "https://picsum.photos/seed/Priya/40/40", program: "Mobility Training", status: "approved", date: "2025-09-17" },
  { id: 3, name: "Amit Singh", avatarUrl: "https://picsum.photos/seed/Amit/40/40", program: "Technology Access", status: "pending", date: "2025-09-17" },
  { id: 4, name: "Sunita Devi", avatarUrl: "https://picsum.photos/seed/Sunita/40/40", program: "Educational Support", status: "reviewed", date: "2025-09-16" },
  { id: 5, name: "Vikram Rathod", avatarUrl: "https://picsum.photos/seed/Vikram/40/40", program: "Mobility Training", status: "rejected", date: "2025-09-15" },
  { id: 6, name: "Anjali Mehta", avatarUrl: "https://picsum.photos/seed/Anjali/40/40", program: "Braille Learning", status: "approved", date: "2025-09-14" },
  { id: 7, name: "Deepak Chopra", avatarUrl: "https://picsum.photos/seed/Deepak/40/40", program: "Technology Access", status: "pending", date: "2025-09-14" },
  { id: 8, name: "Neha Verma", program: "Educational Support", status: "reviewed", date: "2025-09-12" }, // Example without avatarUrl
];