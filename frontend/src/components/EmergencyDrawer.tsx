import React from 'react';
import { X, PhoneCall, AlertOctagon, ExternalLink, ShieldAlert, ArrowUpRight } from 'lucide-react';

interface EmergencyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyDrawer: React.FC<EmergencyDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const emergencyContacts = [
    {
      name: 'Unified National Emergency Services',
      number: '112',
      description: 'Single national emergency response helpline for Police, Fire, and Ambulance across Karnataka.',
      action: 'tel:112',
      badge: 'Immediate Dispatch'
    },
    {
      name: 'Bengaluru Traffic Police (BTP) Helpline',
      number: '103',
      description: 'Dedicated traffic assistance, reporting major road blockages, and signal failure emergencies.',
      action: 'tel:103',
      badge: 'BTP Traffic Desk'
    },
    {
      name: 'Arogya Kavacha Trauma Ambulance',
      number: '108',
      description: 'Karnataka state 24x7 emergency medical trauma ambulance for crash victims and critical triage.',
      action: 'tel:108',
      badge: 'Medical Trauma'
    },
    {
      name: 'BBMP Disaster & Infrastructure Control',
      number: '1533',
      description: 'Municipal control room for flash flooding, road cave-ins, and fallen tree clearance.',
      action: 'tel:1533',
      badge: 'Municipal Disaster'
    },
    {
      name: 'City Police Central Command Room',
      number: '080-22942222',
      description: 'Direct administrative control line for citywide law enforcement and road safety emergencies.',
      action: 'tel:08022942222',
      badge: 'Landline Dispatch'
    }
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#0D0F15]/96 backdrop-blur-2xl border-l border-white/10 shadow-2xl flex flex-col animate-drawer-in font-sans">
      {/* Header */}
      <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-rose-950/20">
        <div className="flex items-center space-x-3 text-rose-400">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center">
            <PhoneCall className="w-5 h-5 text-rose-400" />
          </div>
          <div>
            <h3 className="font-display font-black text-sm text-white">Karnataka Emergency Hotlines</h3>
            <p className="text-[10px] text-slate-400 font-mono">Official State Telephony Directory</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto p-5 space-y-3.5 text-xs">
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-3 text-[11px] text-rose-300 flex items-start space-x-2">
          <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
          <span>If you are witnessing an active accident with casualties, dial <strong>112</strong> immediately. RoadGuard AI is an analytical research platform and does not dispatch emergency first responders.</span>
        </div>

        <div className="space-y-3 pt-1">
          {emergencyContacts.map((contact, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-4 space-y-2 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/10 uppercase">
                  {contact.badge}
                </span>
                <a
                  href={contact.action}
                  className="font-display font-black text-rose-400 hover:text-rose-300 text-sm flex items-center gap-1 font-mono tracking-wider"
                >
                  <span>{contact.number}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <h4 className="font-display font-bold text-white text-xs">{contact.name}</h4>
              <p className="text-slate-400 text-[11px] font-light leading-relaxed">{contact.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
