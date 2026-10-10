import React from 'react';
import { 
  Shield, Map, Cpu, Users, Award, BookOpen, ExternalLink, ArrowRight, 
  CheckCircle2, Compass, AlertTriangle, Layers, Activity, Sparkles, FileText
} from 'lucide-react';

interface LandingSectionProps {
  onOpenMap: () => void;
}

export const LandingSection: React.FC<LandingSectionProps> = ({ onOpenMap }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16 font-sans">
      {/* Hero Header */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono font-semibold shadow-lg shadow-cyan-500/5">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <span>Final-Year Engineering Research Blueprint • Bengaluru (BBMP)</span>
        </div>
        
        <h1 className="font-display font-black text-4xl md:text-6xl text-white tracking-tight leading-[1.15]">
          Evidence-Based Road Safety &amp; <br />
          <span className="text-gradient-cyan">
            Geospatial Risk Intelligence
          </span>
        </h1>
        
        <p className="text-slate-400 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto font-light">
          Synthesizing Bengaluru Traffic Police historical blackspot registries, OpenStreetMap topological graphs, and crowdsourced civic hazard observations into an explainable decision-support engine.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenMap}
            className="flex items-center space-x-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs shadow-xl shadow-cyan-600/25 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            <Compass className="w-4 h-4" />
            <span>Launch Interactive Safety Radar</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Three Architectural Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-3xl p-7 space-y-4 hover:border-white/20 transition-all duration-300">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-lg shadow-rose-500/10">
            <Map className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-white">1. Empirical BTP Blackspots</h3>
          <p className="text-slate-400 text-xs leading-relaxed font-light">
            Integrates 16 officially recorded chronic casualty corridors (Silk Board, Hebbal, KR Puram, Peenya) with 500m evaluation perimeters, separating proven historical collision reality from predictive modeling.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-7 space-y-4 hover:border-white/20 transition-all duration-300">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-white">2. Calibrated ML &amp; SHAP XAI</h3>
          <p className="text-slate-400 text-xs leading-relaxed font-light">
            Platt-calibrated HistGradientBoosting model benchmarked on an unseen chronological hold-out split (Months 31–36) with PR-AUC of 0.8193. Generates transparent local SHAP attributions for every roadway link.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-7 space-y-4 hover:border-white/20 transition-all duration-300">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/10">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-white">3. Deduplicated Civic Sensing</h3>
          <p className="text-slate-400 text-xs leading-relaxed font-light">
            Public reporting portal for road infrastructure defects. An automated 50-meter / 72-hour spatio-temporal clustering algorithm collapses duplicate citizen reports into corroborated municipal inspection weights.
          </p>
        </div>
      </div>

      {/* Academic Defense Highlights */}
      <div className="glass-card-elevated rounded-3xl p-7 md:p-10 space-y-6 shadow-2xl">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
          <Award className="w-4 h-4 text-amber-400" />
          <span>University Viva Defense Blueprint</span>
        </div>
        <h3 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight">
          Why RoadGuard AI is Defensible &amp; Academically Sound
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2 p-4 rounded-2xl bg-[#08090D] border border-white/[0.06]">
            <span className="font-display font-bold text-white block text-sm">No Deceptive Accuracy Claims</span>
            <p className="text-slate-400 text-xs leading-relaxed font-light">
              Because traffic collisions are rare spatial events (&lt;8% of links), high accuracy can be trivially attained by predicting no crashes anywhere. We evaluate PR-AUC, ROC-AUC, and Brier probability calibration score.
            </p>
          </div>
          <div className="space-y-2 p-4 rounded-2xl bg-[#08090D] border border-white/[0.06]">
            <span className="font-display font-bold text-white block text-sm">Strict Temporal Leakage Prevention</span>
            <p className="text-slate-400 text-xs leading-relaxed font-light">
              Models are trained on earlier historical observations (Months 1–24) and evaluated strictly on future chronological hold-out test data (Months 31–36) with zero spatial overlap.
            </p>
          </div>
          <div className="space-y-2 p-4 rounded-2xl bg-[#08090D] border border-white/[0.06]">
            <span className="font-display font-bold text-white block text-sm">Transparent SHAP Decomposition</span>
            <p className="text-slate-400 text-xs leading-relaxed font-light">
              We reject arbitrary black-box equations (e.g. 40% + 30% + 30%). Segment cards explicitly separate historical casualties, ML probabilities, active citizen reports, and road class.
            </p>
          </div>
          <div className="space-y-2 p-4 rounded-2xl bg-[#08090D] border border-white/[0.06]">
            <span className="font-display font-bold text-white block text-sm">Ethical Scope &amp; Privacy Compliance</span>
            <p className="text-slate-400 text-xs leading-relaxed font-light">
              In full compliance with India's DPDP Act 2023, no personally identifiable commuter information or vehicle license plates are collected, and automated 112 emergency dispatch is explicitly disclaimed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
