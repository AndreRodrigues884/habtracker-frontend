export interface CreateHabitPayload {
  title: string;
  description?: string;
  category: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  intention?: string;
  trigger?: string;
}

export interface HabitCardProps {
  category: string; // pode ser URL ou require()
  title: string;
  currentStreak: number;
  onComplete?: () => void;
}