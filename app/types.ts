export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: string;
  priority: PriorityType;
  archived: boolean;
}

export type CategoryType = 'Work' | 'Personal' | 'School' | 'Other';

export type PriorityType = 'low' | 'medium' | 'high';

export interface Category {
  id: string;
  name: CategoryType;
  color: string;
  icon: string;
}

export const CATEGORY_COLORS = {
  Work: '#4285F4',     // Blue
  Personal: '#EA4335', // Red
  School: '#FBBC05',   // Yellow
  Other: '#34A853'     // Green
};

export const CATEGORY_ICONS = {
  Work: 'briefcase',
  Personal: 'person',
  School: 'school',
  Other: 'bookmark'
};

export const PRIORITY_COLORS = {
  low: '#34A853',    // Green
  medium: '#FBBC05', // Yellow
  high: '#EA4335'    // Red
};

export const PRIORITY_ICONS = {
  low: 'flag-outline',
  medium: 'flag',
  high: 'warning'
}; 