
import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, ChevronRight, Zap } from 'lucide-react';
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
    try {
      const result = await getTeamPulse(tasks, updates, members);
      setInsight(result);
    } catch (err) {
      setInsight("Error loading team pulse.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPulse();
  }, []);

  return (
    <div className="momentum-gradient rounded-[2rem] p-1 shadow-2xl shadow-indigo-200">
      <div className="bg-slate-900/10 backdrop-blur-xl rounded-[1.9rem] p-8 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                <Sparkles size={24} className="text-yellow-200" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Executive Momentum Check</h2>
                <p className="text-indigo-100/70 text-sm">Powered by Gemini 3 Flash</p>
              </div>
            </div>
            <button 
              onClick={fetchPulse}
              disabled={loading}
              className="group bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all disabled:opacity-50"
              title="Refresh Insights"
            >
              <RefreshCw size={20} className={`${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            </button>
          </div>

          {loading ? (
            <div className="space-y-6 py-4">
              <div className="h-4 bg-white/10 rounded-full w-full animate-pulse"></div>
              <div className="h-4 bg-white/10 rounded-full w-5/6 animate-pulse"></div>
              <div className="h-4 bg-white/10 rounded-full w-4/6 animate-pulse"></div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-black/20 rounded-2xl p-6 border border-white/5 backdrop-blur-sm">
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-line text-lg leading-relaxed font-medium text-slate-50">
                    {insight}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                 <button className="bg-white text-indigo-700 px-6 py-3 rounded-2xl font-bold text-sm hover:shadow-xl hover:shadow-white/10 transition-all flex items-center gap-2">
                  Action Required <ChevronRight size={16} />
                </button>
                <button className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-white/20 transition-all">
                  Slack Summary
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
