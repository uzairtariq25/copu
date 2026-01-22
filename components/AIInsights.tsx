
import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, ChevronRight } from 'lucide-react';
import { getTeamPulse } from '../services/geminiService';
import { Task, AsyncUpdate, User } from '../types';

interface AIInsightsProps {
  tasks: Task[];
  updates: AsyncUpdate[];
  members: User[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ tasks, updates, members }) => {
  const [insight, setInsight] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchPulse = async () => {
    setLoading(true);
    const result = await getTeamPulse(tasks, updates, members);
    setInsight(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchPulse();
  }, []);

  return (
    <div className="momentum-gradient rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
              <Sparkles size={24} className="text-indigo-100" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Executive Pulse</h2>
              <p className="text-indigo-100 text-sm opacity-90">AI-generated team momentum report</p>
            </div>
          </div>
          <button 
            onClick={fetchPulse}
            disabled={loading}
            className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all disabled:opacity-50"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-white/20 rounded w-3/4"></div>
            <div className="h-4 bg-white/20 rounded w-5/6"></div>
            <div className="h-4 bg-white/20 rounded w-1/2"></div>
          </div>
        ) : (
          <div className="bg-black/10 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            <div className="prose prose-invert prose-sm max-w-none">
              <p className="whitespace-pre-line text-lg leading-relaxed font-medium">
                {insight}
              </p>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4">
               <button className="bg-white text-indigo-700 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors flex items-center gap-2">
                Unblock Team <ChevronRight size={16} />
              </button>
              <button className="bg-transparent border border-white/30 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors">
                Share Summary
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsights;
