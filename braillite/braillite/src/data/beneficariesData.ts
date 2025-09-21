//src/data/beneficariesData.ts [UNUSED - FOR FUTURE USE ]
export type Beneficiary = {
  id: number;
  name: string;
  avatarUrl: string;
  program: string;
  joinDate: string;
  status: "active" | "inactive" | "graduated";
};

// Mock data relevant to Nashik, Maharashtra
const beneficiaries: Beneficiary[] = [
    { id: 1, name: "Suresh Patil", avatarUrl: "https://placehold.co/40x40/E2E8F0/475569?text=SP", program: "Youth Empowerment Initiative", joinDate: "2024-03-15", status: "active" },
    { id: 2, name: "Anjali Deshmukh", avatarUrl: "https://placehold.co/40x40/E2E8F0/475569?text=AD", program: "Community Health Program", joinDate: "2023-11-20", status: "active" },
    { id: 3, name: "Vikram Gaikwad", avatarUrl: "https://placehold.co/40x40/E2E8F0/475569?text=VG", program: "Digital Literacy for Seniors", joinDate: "2023-01-10", status: "graduated" },
    { id: 4, name: "Meena Jadhav", avatarUrl: "https://placehold.co/40x40/E2E8F0/475569?text=MJ", program: "Youth Empowerment Initiative", joinDate: "2024-05-01", status: "inactive" },
    { id: 5, name: "Rajesh Pawar", avatarUrl: "https://placehold.co/40x40/E2E8F0/475569?text=RP", program: "Community Health Program", joinDate: "2024-08-18", status: "active" },
    { id: 6, name: "Pooja Shinde", avatarUrl: "https://placehold.co/40x40/E2E8F0/475569?text=PS", program: "Digital Literacy for Seniors", joinDate: "2023-06-22", status: "graduated" },
];

export default beneficiaries;