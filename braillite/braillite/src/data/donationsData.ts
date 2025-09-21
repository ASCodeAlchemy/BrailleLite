// src/data/donationsData.ts
export interface Donation {
  id: number;
  donorName: string;
  amount: number;
  date: string; // YYYY-MM-DD
  paymentMethod: "UPI" | "Credit Card" | "Debit Card" | "Cash" | "Other";
  status: "Completed" | "Pending" | "Failed" | "Refunded";
  campaign?: string;
  recurring?: boolean;
}

export const donations: Donation[] = [
  { id: 1, donorName: "John Doe", amount: 2000, date: "2024-09-15", paymentMethod: "UPI", status: "Completed", campaign: "Braille Workshop", recurring: true },
  { id: 2, donorName: "Jane Smith", amount: 1500, date: "2024-09-14", paymentMethod: "Credit Card", status: "Pending", campaign: "Mobility Training" },
  { id: 3, donorName: "Amit Singh", amount: 5000, date: "2024-09-10", paymentMethod: "Cash", status: "Completed", campaign: "Tech Access", recurring: false },
  { id: 4, donorName: "Sunita Devi", amount: 1000, date: "2024-09-08", paymentMethod: "Debit Card", status: "Failed", campaign: "Braille Workshop" },
  { id: 5, donorName: "Vikram Joshi", amount: 2500, date: "2024-09-05", paymentMethod: "UPI", status: "Completed", campaign: "Job Training", recurring: true },
];
