import React from 'react';
import { Shield, Map, Cpu, Users, Award, BookOpen, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';

interface LandingSectionProps {
  onOpenMap: () => void;
}

export const LandingSection: React.FC<LandingSectionProps> = ({ onOpenMap }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <Shield className="w-3.5 h-3.5" />
          <span>Final-Year Engineering Research Prototype</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
          Evidence-Based Road Safety &amp; Risk Intelligence
        </h1>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Transforming fragmented traffic collision archives, OpenStreetMap road geometry, and crowdsourced civic hazard observations into an explainable geospatial decision-support platform for urban Bengaluru.
        </p>
        <div className="pt-2 flex items-center justify-center space-x-3">
          <button
            onClick={onOpenMap}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all"
          >
            <span>Launch Interactive GIS Map</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Three Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
            <Map className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-white">1. Geospatial Empirical Hotspots</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Integrates 16 officially documented Bengaluru Traffic Police &amp; MoRTH chronic accident corridors (Hebbal, Silk Board, KR Puram, Peenya) with 500m evaluation buffers, separating empirical history from probabilistic modeling.
          </p>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-white">2. Calibrated ML &amp; SHAP XAI</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            A Platt-calibrated HistGradientBoosting model trained on road geometry and ambient factors. Benchmarked against 2D KDE baselines with PR-AUC of &gt;0.81, explaining individual segment risk through local SHAP waterfall attributions.
          </p>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-white">3. Deduplicated Civic Sensing</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Citizens report road surface defects, missing streetlights, and broken signals. An automated spatio-temporal clustering heuristic (&le;50m, &le;72h) collapses duplicate noise into corroboration weights for municipal inspection queues.
          </p>
        </div>
      </div>

      {/* Academic Defense Highlights */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Award className="w-4 h-4" />
          <span>University Viva Defence Blueprint</span>
        </div>
        <h3 className="text-lg md:text-xl font-bold text-white">
          Why RoadGuard AI is Academically Rigorous
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="font-bold text-slate-200 block text-xs">No Deceptive Accuracy Metrics</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Because traffic accidents represent rare spatial events (&lt;8% of links), accuracy is statistically uninformative. We evaluate PR-AUC, ROC-AUC, and Brier probability calibration score.
            </p>
          </div>
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="font-bold text-slate-200 block text-xs">Strict Leakage Prevention</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Models are trained on earlier historical months (Months 1–24) and evaluated strictly on future unseen chronological hold-out months (Months 31–36).
            </p>
          </div>
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="font-bold text-slate-200 block text-xs">Transparent Evidence Decomposition</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              We reject arbitrary black-box formulas (e.g. 40% + 30% + 30%). Segment cards explicitly separate historical casualties, ML probabilities, active citizen reports, and data coverage.
            </p>
          </div>
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="font-bold text-slate-200 block text-xs">No False Emergency Claims</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              The prototype explicitly clarifies that it does not dispatch emergency response units, preserving academic and ethical integrity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
