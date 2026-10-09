import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, Send, CheckCircle2, Layers } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#0F172A] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Submit Road Hazard Observation</h3>
              <p className="text-[11px] text-slate-400">Community Civic Sensing for Bengaluru (BBMP)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {/* Feedback Banner */}
          {feedback && (
            <div className={`p-3 rounded-xl border flex items-start space-x-2 ${
              feedback.type === 'success'
                ? feedback.isDuplicate
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-red-500/10 border-red-500/30 text-red-300'
            }`}>
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div className="text-[11px]">
                <p className="font-semibold">{feedback.message}</p>
                {feedback.isDuplicate && (
                  <p className="text-[10px] text-amber-400/80 mt-0.5">
                    Our spatial deduplication engine automatically merged your report with an active nearby hazard to increase its inspection priority.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Hazard Type */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
              Hazard Category:
            </label>
            <select
              value={hazardType}
              onChange={(e) => setHazardType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="POTHOLE">Pothole / Road Surface Damage</option>
              <option value="STREETLIGHT">Streetlights Non-Functional (Dark Corridor)</option>
              <option value="SIGNAL">Traffic Signal Blinking / Inoperative</option>
              <option value="WATERLOGGING">Severe Waterlogging / Stagnant Water</option>
              <option value="HAZARDOUS_MEDIAN">Broken Median / Illegal Road Cut</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
              Observation Details:
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the hazard location, physical dimension, or dangerous traffic behavior observed..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 resize-none placeholder:text-slate-500"
            />
          </div>

          {/* Severity Rating Selector */}
          <div>
            <div className="flex justify-between items-center text-[11px] font-semibold text-slate-300 mb-1.5">
              <span>Severity Rating:</span>
              <span className={`font-bold ${severityRating >= 4 ? 'text-red-400' : severityRating === 3 ? 'text-amber-400' : 'text-emerald-400'}`}>
                Level {severityRating} of 5
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setSeverityRating(lvl)}
                  className={`py-2 rounded-lg border text-center font-bold text-xs transition-all ${
                    severityRating === lvl
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Coordinates Inputs */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800">
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">Latitude:</label>
              <input
                type="number"
                step="0.00001"
                value={lat}
                onChange={(e) => setLat(parseFloat(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">Longitude:</label>
              <input
                type="number"
                step="0.00001"
                value={lon}
                onChange={(e) => setLon(parseFloat(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 text-xs font-mono"
              />
            </div>
          </div>

          {/* Privacy & Anti-Noise Disclosure */}
          <p className="text-[10px] text-slate-500 leading-normal">
            * Data Integrity Notice: Reports are spatialized within Bengaluru BBMP. Submissions within 50m of an existing hazard are automatically deduplicated into corroboration votes. No personally identifiable data is stored publicly.
          </p>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 font-semibold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? 'Verifying Coordinates...' : 'Submit Observation'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
