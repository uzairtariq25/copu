
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Users, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { AsyncUpdate, User, Task } from '../types';

interface DashboardProps {
  updates: AsyncUpdate[];
  members: User[];
  tasks: Task[];
}

const Dashboard: React.FC<DashboardProps> = ({ updates, members, tasks }) => {
  const stats = [
    { label: 'Flow Velocity', value: '84%', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Sync Score', value: '92', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Done (7d)', value: tasks.filter(t => t.status === 'done').length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Blocked', value: tasks.filter(t => t.status === 'blocked').length, icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  const chartData = [
    { name: 'Mon', tasks: 12 },
    { name: 'Tue', tasks: 19 },
    { name: 'Wed', tasks: 15 },
    { name: 'Thu', tasks: 22 },
    { name: 'Fri', tasks: 30 },
  ];

  return (
    <div className="space-y-8 animate-momentum">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[1.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
            <div className={`${s.bg} p-4 rounded-2xl ${s.color}`}>
              <s.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
              <h3 className="text-3xl font-extrabold text-slate-900 leading-none mt-1">{s.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Productivity Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Throughput Velocity</h3>
              <p className="text-sm text-slate-500">Completed items per day</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-xl px-4 py-2 text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                />
                <Bar dataKey="tasks" radius={[6, 6, 0, 0]} barSize={45}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? '#6366f1' : '#e2e8f0'} className="hover:fill-indigo-400 transition-colors" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Updates Feed */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900">Team Feed</h3>
            <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-tight">Async Only</span>
          </div>
          <div className="space-y-8">
            {updates.map(update => {
              const user = members.find(m => m.id === update.userId);
              return (
                <div key={update.id} className="flex gap-4 group">
                  <div className="relative">
                    <img src={user?.avatar} className="w-12 h-12 rounded-2xl border-2 border-white shadow-sm" alt={user?.name} />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-slate-900">{user?.name}</h4>
                      <span className="text-[10px] text-slate-400 font-medium">2h</span>
                    </div>
                    <div className="bg-slate-50/80 group-hover:bg-indigo-50/50 p-4 rounded-2xl transition-colors border border-transparent group-hover:border-indigo-100">
                      <div className="space-y-1">
                        {update.done.map((d, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                            <CheckCircle2 size={12} className="text-emerald-500 mt-0.5 shrink-0" />
                            <span className="line-clamp-1 leading-tight">{d}</span>
                          </div>
                        ))}
                      </div>
                      {update.blockers.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-200 flex items-center gap-2 text-rose-600">
                          <AlertCircle size={12} className="shrink-0" />
                          <span className="text-[10px] font-bold uppercase tracking-wide">Blocked</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="w-full mt-8 py-4 text-sm font-bold text-indigo-600 hover:bg-indigo-50 border border-indigo-100 rounded-2xl transition-all">
            Review History
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
