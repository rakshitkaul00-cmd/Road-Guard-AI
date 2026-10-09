import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, ShieldAlert, Award, FileText, CheckCircle2, Globe, Key, ExternalLink } from 'lucide-react';
import { api } from '../services/api';

export const AnalyticsView: React.FC = () => {
  const [overview, setOverview] = useState<any>(null);
  const [benchmarks, setBenchmarks] = useState<any>(null);
  const [ogdInfo, setOgdInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [ov, bm, ogd] = await Promise.all([
          api.getAnalyticsOverview(),
          api.getModelBenchmarks(),
          api.getGovernmentOgdInfo()
        ]);
        setOverview(ov);
        setBenchmarks(bm.benchmarks);
        setOgdInfo(ogd);
      } catch (e) {
        console.error("Failed to load analytics data", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
        <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
          <BarChart3 className="w-4 h-4" />
          <span>Research Analytics & Empirical Benchmarks</span>
        </div>
        <h2 className="text-xl md:text-2xl font-black text-white">
          Road Safety Analytics & Model Evaluation (Bengaluru BBMP)
        </h2>
        <p className="text-slate-400 text-xs md:text-sm max-w-3xl leading-relaxed">
          In transportation safety engineering, model performance cannot be defended through deceptive classification accuracy alone. RoadGuard AI evaluates candidate models against spatial baselines on a strict temporal hold-out split using Precision-Recall AUC (PR-AUC), Brier probability calibration, and ROC-AUC.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center space-y-2 text-slate-400 font-mono text-xs">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p>Loading empirical benchmarks and citywide metrics...</p>
        </div>
      ) : (
        <>
          {/* Top KPI Cards */}
          {overview && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-4 shadow-lg space-y-1">
                <span className="text-[11px] text-slate-400 font-medium block">Documented Blackspots</span>
                <span className="text-2xl font-black text-red-400">{overview.summary.total_blackspots}</span>
                <span className="text-[10px] text-slate-500 block">MoRTH & BTP Corridors</span>
              </div>

              <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-4 shadow-lg space-y-1">
                <span className="text-[11px] text-slate-400 font-medium block">Recorded 3-Yr Fatalities</span>
                <span className="text-2xl font-black text-amber-400">{overview.summary.recorded_fatalities_3yr}</span>
                <span className="text-[10px] text-slate-500 block">Across Study Corridors</span>
              </div>

              <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-4 shadow-lg space-y-1">
                <span className="text-[11px] text-slate-400 font-medium block">Monitored Road Links</span>
                <span className="text-2xl font-black text-blue-400">{overview.summary.monitored_road_segments}</span>
                <span className="text-[10px] text-slate-500 block">OSM Geometry Segments</span>
              </div>

              <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-4 shadow-lg space-y-1">
                <span className="text-[11px] text-slate-400 font-medium block">Citizen Reports Audited</span>
                <span className="text-2xl font-black text-indigo-400">{overview.summary.total_citizen_reports}</span>
                <span className="text-[10px] text-emerald-400 font-medium block">
                  {overview.summary.verified_reports_count} Verified in Field
                </span>
              </div>
            </div>
          )}

          {/* Official Government Open Data (data.gov.in) Card */}
          {ogdInfo && (
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-900/40 rounded-2xl p-6 shadow-xl space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-indigo-950 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm">
                      {ogdInfo.portal_name} ({ogdInfo.department.split('—')[0]})
                    </h3>
                    <p className="text-[11px] text-slate-400">{ogdInfo.catalog_title}</p>
                  </div>
                </div>
                <a
                  href={ogdInfo.portal_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition-all self-start md:self-auto"
                >
                  <span>data.gov.in Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">National Policy Standard</span>
                  <span className="font-semibold text-slate-200">NDSAP Open Data Compliant</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Dataset License</span>
                  <span className="font-semibold text-emerald-400">{ogdInfo.license}</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">OGD Catalog Resource ID</span>
                  <span className="font-mono text-slate-300 text-[11px] truncate block">{ogdInfo.ogd_resource_id}</span>
                </div>
              </div>

              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex items-start space-x-2 text-[11px] text-slate-400">
                <Key className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-300">Free Government API Token Integration: </strong>
                  {ogdInfo.developer_instructions} Use template: <code className="text-indigo-300">{ogdInfo.api_endpoint_template}</code>.
                </div>
              </div>
            </div>
          )}

          {/* Empirical Benchmark Comparison Table */}
          {benchmarks && (
            <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    Empirical Model Evaluation Table (Temporal Hold-Out Split)
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Test partition: Months 31–36 (Chronologically held out, N={benchmarks.dataset_metadata?.test_records || 1500} observations)
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  Scikit-learn 1.9 &bull; Platt Calibrated
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-4">Model Architecture</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4 text-center">PR-AUC (Primary)</th>
                      <th className="py-3 px-4 text-center">ROC-AUC</th>
                      <th className="py-3 px-4 text-center">Brier Score &darr;</th>
                      <th className="py-3 px-4 text-center">F1 Score</th>
                      <th className="py-3 px-4">Methodological Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {Object.entries(benchmarks.models || {}).map(([key, m]: [string, any]) => {
                      const isPrimary = key === 'M_GBM_Calibrated';
                      return (
                        <tr
                          key={key}
                          className={`hover:bg-slate-900/40 transition-colors ${
                            isPrimary ? 'bg-blue-950/20 font-semibold' : ''
                          }`}
                        >
                          <td className="py-3.5 px-4 font-sans text-slate-200">
                            <div className="flex items-center space-x-1.5">
                              {isPrimary && <span className="text-amber-400 text-xs">★</span>}
                              <span>{m.model_name}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-sans text-[11px] text-slate-400">
                            {m.type}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className={`px-2 py-0.5 rounded font-bold ${
                              m.pr_auc >= 0.80 ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-300'
                            }`}>
                              {m.pr_auc.toFixed(4)}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center text-slate-300">
                            {m.roc_auc.toFixed(4)}
                          </td>
                          <td className="py-3.5 px-4 text-center text-slate-300">
                            {m.brier_score.toFixed(4)}
                          </td>
                          <td className="py-3.5 px-4 text-center text-slate-300">
                            {m.f1_score.toFixed(4)}
                          </td>
                          <td className="py-3.5 px-4 font-sans text-[11px] text-slate-400">
                            {m.description}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Research Interpretation Card */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs space-y-2">
                <h4 className="font-bold text-slate-200 flex items-center gap-1.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Key Research Findings for University Defense:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-slate-400 leading-relaxed text-[11px]">
                  <li>
                    <strong>Spatial Baseline Outperformed:</strong> Contextual tree ensembles (Random Forest &amp; Calibrated Gradient Boosting) achieve PR-AUC of &gt;0.81, demonstrating statistically superior discriminative capacity over the 2D Spatial KDE Baseline (0.7338).
                  </li>
                  <li>
                    <strong>Probability Calibration via Platt Scaling:</strong> Raw tree predictions frequently output over-confident extreme probabilities; Platt Sigmoid calibration reduced Brier probability error down to reliable levels, enabling realistic municipal risk scoring.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Global Feature Importances */}
          {benchmarks && benchmarks.feature_importances && (
            <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                Global Feature Importance Hierarchy (Random Forest Gini Impurity)
              </h3>
              <p className="text-[11px] text-slate-400">
                Identifies which physical road parameters and operational conditions exert the largest influence across the citywide risk surface:
              </p>

              <div className="space-y-3 pt-2">
                {Object.entries(benchmarks.feature_importances).map(([feat, val]: [string, any]) => {
                  const pct = Math.round(val * 100);
                  return (
                    <div key={feat} className="space-y-1 text-xs">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-semibold text-slate-300 font-mono">{feat}</span>
                        <span className="font-mono text-slate-400">{pct}% importance</span>
                      </div>
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                          style={{ width: `${Math.max(5, pct * 1.5)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
