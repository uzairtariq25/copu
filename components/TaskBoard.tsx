
import React from 'react';
import { Task, TaskStatus, Priority, User } from '../types';
import { Calendar, MoreVertical, MessageSquare, AlertCircle, CheckCircle2, Clock, PlayCircle } from 'lucide-react';

interface TaskBoardProps {
  tasks: Task[];
  users: User[];
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, users, onStatusChange }) => {
  const columns = [
    { id: TaskStatus.TODO, label: 'Todo', icon: Clock, color: 'text-slate-400' },
    { id: TaskStatus.DOING, label: 'Doing', icon: PlayCircle, color: 'text-indigo-500' },
    { id: TaskStatus.BLOCKED, label: 'Blocked', icon: AlertCircle, color: 'text-rose-500' },
    { id: TaskStatus.DONE, label: 'Done', icon: CheckCircle2, color: 'text-emerald-500' },
  ];

  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case Priority.HIGH: return 'bg-rose-100 text-rose-700';
      case Priority.MEDIUM: return 'bg-amber-100 text-amber-700';
      case Priority.LOW: return 'bg-emerald-100 text-emerald-700';
    }
  };

  const getOwner = (id: string) => users.find(u => u.id === id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full min-h-[600px]">
      {columns.map(col => (
        <div key={col.id} className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <col.icon size={18} className={col.color} />
              <h3 className="font-semibold text-slate-700">{col.label}</h3>
              <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                {tasks.filter(t => t.status === col.id).length}
              </span>
            </div>
          </div>

          <div className="flex-1 bg-slate-100/50 rounded-2xl p-3 space-y-3">
            {tasks.filter(t => t.status === col.id).map(task => {
              const owner = getOwner(task.ownerId);
              return (
                <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-200 transition-all cursor-grab active:cursor-grabbing">
                  <div className="flex items-start justify-between mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                  
                  <h4 className="font-medium text-slate-900 mb-1 leading-tight">{task.title}</h4>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">{task.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Calendar size={14} />
                      <span className="text-xs">{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                    {owner && (
                      <div className="flex items-center gap-2">
                         <img 
                          src={owner.avatar} 
                          className="w-6 h-6 rounded-full border border-white shadow-sm ring-1 ring-slate-100" 
                          title={owner.name}
                          alt={owner.name}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            
            <button className="w-full py-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 text-sm font-medium hover:border-indigo-300 hover:text-indigo-500 hover:bg-white transition-all">
              + Add Task
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
