// src/data/programsData.ts
export interface Program {
  id: number;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  place: string;
  volunteersRequired: boolean;
  volunteersCount?: number; // optional, only if volunteersRequired is true
  status: "draft" | "ongoing" | "upcoming" | "completed"; // program state
}

// Mock programs data
export let programs: Program[] = [
  {
    id: 1,
    title: "Braille Learning Workshop",
    description: "Teaching blind students Braille basics.",
    date: "2024-10-15",
    place: "Mumbai",
    volunteersRequired: true,
    volunteersCount: 5,
    status: "upcoming",
  },
  {
    id: 2,
    title: "Mobility Training",
    description: "Helping visually impaired navigate cities.",
    date: "2024-09-20",
    place: "Delhi",
    volunteersRequired: false,
    status: "ongoing",
  },
  {
    id: 3,
    title: "Technology Access Program",
    description: "Providing tech training for blind adults.",
    date: "2024-08-01",
    place: "Bangalore",
    volunteersRequired: true,
    volunteersCount: 3,
    status: "draft",
  },
];

// Optional: function to update programs
export const updateProgram = (updatedProgram: Program) => {
  const index = programs.findIndex((p) => p.id === updatedProgram.id);
  if (index !== -1) programs[index] = updatedProgram;
};
