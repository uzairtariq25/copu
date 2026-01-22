
import React from 'react';
import { User, Task, TaskStatus, Priority, AsyncUpdate } from './types';

export const TEAM_MEMBERS: User[] = [
  { id: '1', name: 'Alex Rivera', role: 'Product Lead', avatar: 'https://picsum.photos/seed/alex/100/100' },
  { id: '2', name: 'Sarah Chen', role: 'Fullstack Engineer', avatar: 'https://picsum.photos/seed/sarah/100/100' },
  { id: '3', name: 'Jordan Smyth', role: 'Marketing Op', avatar: 'https://picsum.photos/seed/jordan/100/100' },
  { id: '4', name: 'Mia Wong', role: 'UX Designer', avatar: 'https://picsum.photos/seed/mia/100/100' },
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Finalize Q3 Launch Plan',
    description: 'Sync with marketing on the final assets for the July release.',
    status: TaskStatus.DOING,
    priority: Priority.HIGH,
    ownerId: '3',
    dueDate: '2024-06-25',
    createdAt: '2024-06-15',
  },
  {
    id: 't2',
    title: 'Refactor Auth Middleware',
    description: 'Move to edge functions for lower latency.',
    status: TaskStatus.TODO,
    priority: Priority.MEDIUM,
    ownerId: '2',
    dueDate: '2024-06-28',
    createdAt: '2024-06-18',
  },
  {
    id: 't3',
    title: 'Customer Interview Synthesis',
    description: 'Compile notes from the last 5 user testing sessions.',
    status: TaskStatus.DONE,
    priority: Priority.LOW,
    ownerId: '4',
    dueDate: '2024-06-20',
    createdAt: '2024-06-10',
  },
  {
    id: 't4',
    title: 'API Rate Limiting',
    description: 'Implement Redis-based rate limiting for the public API.',
    status: TaskStatus.BLOCKED,
    priority: Priority.HIGH,
    ownerId: '2',
    dueDate: '2024-06-22',
    createdAt: '2024-06-12',
  },
];

export const MOCK_UPDATES: AsyncUpdate[] = [
  {
    id: 'u1',
    userId: '2',
    timestamp: new Date().toISOString(),
    done: ['Resolved CSS bug on mobile', 'Updated landing page copy'],
    doing: ['Working on Auth refactor'],
    blockers: ['Awaiting API credentials from Ops'],
  },
  {
    id: 'u2',
    userId: '3',
    timestamp: new Date().toISOString(),
    done: ['Drafted launch email sequence'],
    doing: ['Setting up meta ads'],
    blockers: [],
  }
];
