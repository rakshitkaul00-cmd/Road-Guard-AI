import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, Send, CheckCircle2, Layers, MapPin, Sparkles } from 'lucide-react';
import { api } from '../services/api';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLat?: number;
  initialLon?: number;
  onReportSubmitted: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  initialLat,
  initialLon,
  onReportSubmitted
}) => {
  const [hazardType, setHazardType] = useState('POTHOLE');
  const [description, setDescription] = useState('');
  const [severityRating, setSeverityRating] = useState(3);
  const [lat, setLat] = useState(12.9716);
  const [lon, setLon] = useState(77.5946);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
    isDuplicate?: boolean;
  } | null>(null);

  useEffect(() => {
    if (initialLat && initialLon) {
      setLat(initialLat);
      setLon(initialLon);
    }
  }, [initialLat, initialLon]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setFeedback({ type: 'error', message: 'Please provide a descriptive observation.' });
      return;
    }

    setSubmitting(true);
    setFeedback(null);

    try {
      const res = await api.submitReport({
        hazard_type: hazardType,
        description: description.trim(),
        severity_rating: severityRating,
        latitude: parseFloat(lat.toString()),
        longitude: parseFloat(lon.toString())
      });

      if (res.status === 'success') {
        setFeedback({
          type: 'success',
          message: res.message,
          isDuplicate: res.is_duplicate
        });
        onReportSubmitted();
        setTimeout(() => {
          onClose();
          setFeedback(null);
          setDescription('');
        }, 2200);
      } else {
        setFeedback({ type: 'error', message: res.message || 'Submission failed.' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Submission failed.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-sans">
      <div className="w-full max-w-lg glass-card-elevated rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-white/10 animate-fadeIn">
        {/* Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#12151E]/60">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md">
              <AlertTriangle className="w-5 h-5 text-amber-400 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-display font-black text-white text-base">Submit Civic Hazard Observation</h3>
              <p className="text-[11px] text-slate-400 font-light">Bengaluru BBMP Civic Sensing Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Feedback Banner */}
          {feedback && (
            <div className={`p-3.5 rounded-2xl border flex items-start space-x-3 ${
              feedback.type === 'success'
                ? feedback.isDuplicate
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                  : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
            }`}>
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-bold">{feedback.message}</p>
                {feedback.isDuplicate && (
                  <p className="text-[11px] text-amber-300/80 mt-1 font-light">
                    Our 50m / 72h spatial deduplication heuristic automatically corroborated your submission with an active nearby hazard to elevate municipal inspection priority.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Hazard Type */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-200">
              Hazard Category:
            </label>
            <select
              value={hazardType}
              onChange={(e) => setHazardType(e.target.value)}
              className="w-full bg-[#08090D] border border-white/10 rounded-2xl p-3 text-slate-200 text-xs focus:outline-none focus:border-cyan-500 transition-all"
            >
              <option value="POTHOLE">Pothole / Road Surface Defect</option>
              <option value="STREETLIGHT">Streetlights Non-Functional (Dark Corridor)</option>
              <option value="SIGNAL">Traffic Signal Inoperative / Blinking</option>
              <option value="WATERLOGGING">Severe Monsoon Waterlogging / Stagnant Pool</option>
              <option value="HAZARDOUS_MEDIAN">Broken Median Barrier / Dangerous Road Cut</option>
            </select>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-200">
              Observation Details:
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the exact location, road lane, dimension, or pedestrian danger observed..."
              className="w-full bg-[#08090D] border border-white/10 rounded-2xl p-3 text-slate-200 text-xs focus:outline-none focus:border-cyan-500 resize-none placeholder:text-slate-500 transition-all"
            />
          </div>

          {/* Severity Rating Selector */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-200">
              <span>Severity Rating:</span>
              <span className={`font-mono font-bold ${severityRating >= 4 ? 'text-rose-400' : severityRating === 3 ? 'text-amber-400' : 'text-emerald-400'}`}>
                Level {severityRating} of 5
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setSeverityRating(lvl)}
                  className={`py-2.5 rounded-2xl border text-center font-display font-bold text-xs transition-all active:scale-95 ${
                    severityRating === lvl
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 border-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-[#08090D] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Coordinates Inputs */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/[0.08]">
            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-1">Latitude:</label>
              <input
                type="number"
                step="0.00001"
                value={lat}
                onChange={(e) => setLat(parseFloat(e.target.value))}
                className="w-full bg-[#08090D] border border-white/10 rounded-xl p-2.5 text-slate-200 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-1">Longitude:</label>
              <input
                type="number"
                step="0.00001"
                value={lon}
                onChange={(e) => setLon(parseFloat(e.target.value))}
                className="w-full bg-[#08090D] border border-white/10 rounded-xl p-2.5 text-slate-200 text-xs font-mono"
              />
            </div>
          </div>

          {/* Privacy & Anti-Noise Disclosure */}
          <p className="text-[10px] text-slate-500 leading-normal font-light">
            * Data Privacy Notice: In accordance with India's DPDP Act 2023, reports are spatially anonymized. Reports within 50m of an existing item automatically merge into corroboration votes.
          </p>

          {/* Submit Action */}
          <div className="flex items-center justify-end space-x-2.5 pt-3 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white font-medium text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-display font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5 text-slate-950" />
              <span>{submitting ? 'Verifying Proximity...' : 'Submit Observation'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
