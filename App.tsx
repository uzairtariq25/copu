
import React, { useState } from 'react';
import Layout from './components/Layout';
import TaskBoard from './components/TaskBoard';
import Dashboard from './components/Dashboard';
import AIInsights from './components/AIInsights';
import { INITIAL_TASKS, TEAM_MEMBERS, MOCK_UPDATES } from './constants';
import { Task, TaskStatus } from './types';
// Fixed: Added Zap to the imports
import { Plus, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [members] = useState(TEAM_MEMBERS);
  const [updates] = useState(MOCK_UPDATES);

  const handleStatusChange = (id: string, status: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Good morning, Matt 👋</h1>
                <p className="text-slate-500 mt-1">Here's what's happening with the team today.</p>
              </div>
              <button className="momentum-gradient text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 hover:scale-[1.02] transition-transform active:scale-95">
                <Plus size={20} />
                New Update
              </button>
            </header>
            
            <AIInsights tasks={tasks} updates={updates} members={members} />
            <Dashboard tasks={tasks} members={members} updates={updates} />
          </div>
        );
      case 'tasks':
        return (
          <div className="h-full flex flex-col gap-6 animate-in slide-in-from-bottom-4 duration-500">
            <header className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-slate-900">Momentum Board</h1>
              <div className="flex gap-2">
                <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
                  Filter
                </button>
                <button className="momentum-gradient text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100">
                  New Task
                </button>
              </div>
            </header>
            <div className="flex-1 overflow-x-auto pb-4">
              <TaskBoard tasks={tasks} users={members} onStatusChange={handleStatusChange} />
            </div>
          </div>
        );
      case 'pulse':
        return (
           <div className="space-y-8 animate-in fade-in duration-500">
             <h1 className="text-2xl font-bold text-slate-900">AI Pulse History</h1>
             <AIInsights tasks={tasks} updates={updates} members={members} />
             <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4">
                  <Zap size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Pulse history is coming soon</h3>
                <p className="text-slate-500 max-w-xs mt-2">We're archiving your daily executive summaries to help you track long-term team health.</p>
             </div>
           </div>
        );
      case 'team':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h1 className="text-2xl font-bold text-slate-900">Your Team</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map(member => (
                <div key={member.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                  <img src={member.avatar} className="w-20 h-20 rounded-full mb-4 ring-4 ring-slate-50" alt={member.name} />
                  <h3 className="font-bold text-slate-900">{member.name}</h3>
                  <p className="text-sm text-slate-500 mb-4">{member.role}</p>
                  <div className="flex gap-2 w-full pt-4 border-t border-slate-50">
                    <button className="flex-1 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-lg">Profile</button>
                    <button className="flex-1 py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg">Message</button>
                  </div>
                </div>
              ))}
              <button className="h-full min-h-[200px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-indigo-300 hover:text-indigo-500 hover:bg-white transition-all group">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50">
                  <Plus size={24} />
                </div>
                <span className="font-bold text-sm">Invite Member</span>
              </button>
            </div>
          </div>
        )
      default:
        return null;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
