
export enum TaskStatus {
  TODO = 'todo',
  DOING = 'doing',
  DONE = 'done',
  BLOCKED = 'blocked'
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  ownerId: string;
  dueDate: string;
  createdAt: string;
}

export interface AsyncUpdate {
  id: string;
  userId: string;
  timestamp: string;
  done: string[];
  doing: string[];
  blockers: string[];
}

export interface TeamStats {
  velocity: number;
  onTimeRate: number;
  meetingsSaved: number;
  activeBlockers: number;
}
