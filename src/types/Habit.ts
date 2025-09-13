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