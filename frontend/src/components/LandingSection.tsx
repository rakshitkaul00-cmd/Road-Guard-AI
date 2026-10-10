import React from 'react';
import { 
  Shield, Map, Cpu, Users, Award, BookOpen, ExternalLink, ArrowRight, 
  CheckCircle2, Compass, AlertTriangle, Layers, Activity, Sparkles
} from 'lucide-react';

interface LandingSectionProps {
  onOpenMap: () => void;
}

export const LandingSection: React.FC<LandingSectionProps> = ({ onOpenMap }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold shadow-lg shadow-blue-500/5">
          <Shield className="w-3.5 h-3.5 text-blue-400" />
          <span>Final-Year Engineering Capstone • Bengaluru Urban (BBMP)</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
          Evidence-Based Road Safety &amp; <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            Geospatial Risk Intelligence
          </span>
        </h1>
        
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Synthesizing Bengaluru Traffic Police historical blackspot records, OpenStreetMap geometric roadway graphs, and real-time crowdsourced citizen hazard reports into an explainable ML decision-support platform.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onOpenMap}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
          >
            <Compass className="w-4 h-4" />
            <span>Launch Interactive GIS Safety Map</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Three Architectural Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3 hover:border-slate-700 transition-all">
          <div className="w-11 h-11 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 shadow-md shadow-red-500/10">
            <Map className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-white">1. Empirical BTP Blackspots</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Maintains 16 officially documented chronic accident corridors (Silk Board, Hebbal, KR Puram, Peenya) with 500m evaluation buffers, separating proven historical casualty ground truth from probabilistic modeling.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3 hover:border-slate-700 transition-all">
          <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-md shadow-blue-500/10">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-white">2. Calibrated ML &amp; SHAP XAI</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Platt-calibrated HistGradientBoosting model benchmarked on a chronological hold-out split (Months 31–36) with PR-AUC of &gt;0.81. Provides local SHAP waterfall attributions for every segment.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3 hover:border-slate-700 transition-all">
          <div className="w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-md shadow-indigo-500/10">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-white">3. Deduplicated Civic Sensing</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Public reporting portal for road defects and dark corridors. Automated 50-meter/72-hour spatial clustering merges duplicate citizen complaints into corroboration weights for municipal inspection prioritization.
          </p>
        </div>
      </div>

      {/* Academic Defense Highlights */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-5 shadow-2xl">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Award className="w-4 h-4" />
          <span>University Viva Defense Blueprint</span>
        </div>
        <h3 className="text-lg md:text-xl font-black text-white">
          Why RoadGuard AI is Academically Rigorous &amp; Defensible
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <span className="font-bold text-slate-100 block text-xs">No Deceptive Accuracy Metrics</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Because traffic accidents represent rare spatial events (&lt;8% of links), accuracy is statistically uninformative. We evaluate PR-AUC, ROC-AUC, and Brier probability calibration score.
            </p>
          </div>
          <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <span className="font-bold text-slate-100 block text-xs">Strict Leakage Prevention</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Models are trained on earlier historical months (Months 1–24) and evaluated strictly on future unseen chronological hold-out months (Months 31–36).
            </p>
          </div>
          <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <span className="font-bold text-slate-100 block text-xs">Transparent Evidence Decomposition</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              We reject arbitrary black-box formulas (e.g. 40% + 30% + 30%). Segment cards explicitly separate historical casualties, ML probabilities, active citizen reports, and data coverage.
            </p>
          </div>
          <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <span className="font-bold text-slate-100 block text-xs">No False Emergency Claims</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              The prototype explicitly clarifies that it does not dispatch emergency response units, preserving academic and ethical integrity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
