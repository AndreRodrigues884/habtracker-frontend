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
   isCompleted?: boolean; 
  onComplete?: () => void;
  style?: object;
}

export interface CompleteHabitResponse {
  message: string;
  habit: {
    _id: string;
    title: string;
    category: string;
    currentStreak: number;
    longestStreak: number;
    isCompleted: boolean;
    lastCompletionDate: string | null;
    completedCount: number;
    // adicione outros campos que precisar
  };
  xpGained: number;
  newLevel: number;
  unlockedAchievements: any[];
}

export interface HabitListProps extends HabitCardProps {
  habitId: string;
  onDeleted?: (habitId: string) => void;
}