import React from 'react';
import { X, PhoneCall, AlertOctagon, ExternalLink, ShieldAlert } from 'lucide-react';

interface EmergencyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyDrawer: React.FC<EmergencyDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const emergencyContacts = [
    {
      name: 'Unified Emergency Services (India)',
      number: '112',
      description: 'Single emergency helpline for Police, Fire, and Ambulance response across Karnataka.',
      action: 'tel:112',
      badge: 'Immediate Response'
    },
    {
      name: 'Bengaluru Traffic Police (BTP) Helpline',
      number: '103',
      description: 'Dedicated traffic assistance, reporting severe road obstructions, and signal failures.',
      action: 'tel:103',
      badge: 'BTP Traffic Helpline'
    },
    {
      name: 'Arogya Kavacha Medical Ambulance',
      number: '108',
      description: 'Karnataka state 24x7 emergency medical trauma and critical patient ambulance response.',
      action: 'tel:108',
      badge: 'Medical Trauma'
    },
    {
      name: 'BBMP Disaster & Infrastructure Control Room',
      number: '1533',
      description: 'Municipal control room for severe flooding, road cave-ins, and fallen tree clearance.',
      action: 'tel:1533',
      badge: 'Municipal Disaster'
    },
    {
      name: 'Bengaluru City Police Central Control Room',
      number: '080-22942222',
      description: 'Direct administrative control line for citywide law enforcement and road safety emergencies.',
      action: 'tel:08022942222',
      badge: 'Landline Dispatch'
    }
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#0F172A] border-l border-slate-800 shadow-2xl flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-red-950/20">
        <div className="flex items-center space-x-2 text-red-400">
          <PhoneCall className="w-5 h-5" />
          <h3 className="font-bold text-sm text-white">Emergency Assistance Directory</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Critical Disclaimer Banner */}
      <div className="p-4 bg-red-950/40 border-b border-red-900/50 flex items-start space-x-3 text-xs text-red-200">
        <AlertOctagon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-red-300 block">Academic Research Prototype Notice</span>
          <p className="leading-relaxed text-red-200/90 text-[11px]">
            RoadGuard AI is a university decision-support research platform. It does <strong>NOT</strong> have active automated dispatch integrations with emergency services. If you are experiencing or witnessing an active road crash, dial <strong>112</strong> immediately.
          </p>
        </div>
      </div>

      {/* Directory List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
        {emergencyContacts.map((c, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {c.badge}
              </span>
              <a
                href={c.action}
                className="flex items-center space-x-1 text-blue-400 font-bold hover:underline"
              >
                <span>Call {c.number}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <h4 className="font-bold text-slate-100 text-sm">{c.name}</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">{c.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
