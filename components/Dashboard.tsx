
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import { AsyncUpdate, User, Task } from '../types';

interface DashboardProps {
  updates: AsyncUpdate[];
  members: User[];
  tasks: Task[];
}

const Dashboard: React.FC<DashboardProps> = ({ updates, members, tasks }) => {
  const stats = [
    { label: 'Team Velocity', value: '84%', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Active Members', value: members.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Completed', value: tasks.filter(t => t.status === 'done').length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Blockers', value: tasks.filter(t => t.status === 'blocked').length, icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  const chartData = [
    { name: 'Mon', completed: 12 },
    { name: 'Tue', completed: 19 },
    { name: 'Wed', completed: 15 },
    { name: 'Thu', completed: 22 },
    { name: 'Fri', completed: 30 },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`${s.bg} p-3 rounded-xl ${s.color}`}>
              <s.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{s.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{s.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Productivity Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900">Weekly Throughput</h3>
            <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-1 text-slate-600">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="completed" radius={[4, 4, 0, 0]} barSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? '#6366f1' : '#e2e8f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Updates Feed */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Async Standups</h3>
          <div className="space-y-6">
            {updates.map(update => {
              const user = members.find(m => m.id === update.userId);
              return (
                <div key={update.id} className="flex gap-4">
                  <img src={user?.avatar} className="w-10 h-10 rounded-full border border-slate-100" alt={user?.name} />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">{user?.name}</h4>
                      <span className="text-[10px] text-slate-400 font-medium">2h ago</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl text-xs space-y-1">
                      {update.done.map((d, i) => (
                        <div key={i} className="flex items-center gap-2 text-slate-600">
                          <CheckCircle2 size={12} className="text-emerald-500" />
                          <span className="line-clamp-1">{d}</span>
                        </div>
                      ))}
                      {update.blockers.length > 0 && (
                        <div className="pt-2 mt-2 border-t border-slate-200 flex items-center gap-2 text-rose-600 font-semibold">
                          <AlertCircle size={12} />
                          <span>Blocked</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="w-full mt-6 py-3 text-sm font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
            View All Updates
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
