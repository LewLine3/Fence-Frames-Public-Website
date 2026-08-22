'use client'

import React from 'react'

interface GateModalProps {
  isOpen: boolean;
  onClose: () => void;
  walkGates: number;
  driveGates: number;
  onUpdateGates: (walk: number, drive: number) => void;
}

export function GateModal({
  isOpen,
  onClose,
  walkGates,
  driveGates,
  onUpdateGates,
}: GateModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-[#141B16] border-2 border-[#E5B842] rounded-lg max-w-md w-full p-6 text-white shadow-2xl relative">
        <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚪</span>
            <h3 className="font-['Rowdies'] font-bold text-sm text-[#E5B842] uppercase">
              Custom Gate Studio
            </h3>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white font-['Rowdies'] text-sm">
            ✕
          </button>
        </div>

        <div className="space-y-4 text-xs font-['Rowdies'] font-light">
          {/* Walk Gate Option */}
          <div className="bg-[#1C241E] p-3.5 rounded border border-white/10 flex items-center justify-between">
            <div>
              <span className="block font-bold text-sm text-white">Pedestrian Walk Gate (4ft / 5ft)</span>
              <span className="text-[11px] text-white/60">Includes anti-sag diagonal brace, heavy duty T-hinges &amp; latch</span>
              <span className="block text-[#E5B842] font-normal mt-1">+$385.00 ea</span>
            </div>
            <div className="flex items-center gap-2 bg-[#111713] p-1 rounded border border-white/15">
              <button
                onClick={() => onUpdateGates(Math.max(0, walkGates - 1), driveGates)}
                className="w-7 h-7 flex items-center justify-center font-bold text-white hover:bg-white/10 rounded"
              >
                -
              </button>
              <span className="w-5 text-center font-bold text-sm text-[#4ADE80]">{walkGates}</span>
              <button
                onClick={() => onUpdateGates(walkGates + 1, driveGates)}
                className="w-7 h-7 flex items-center justify-center font-bold text-white hover:bg-white/10 rounded"
              >
                +
              </button>
            </div>
          </div>

          {/* Double Drive Gate Option */}
          <div className="bg-[#1C241E] p-3.5 rounded border border-white/10 flex items-center justify-between">
            <div>
              <span className="block font-bold text-sm text-white">Double Drive Gate (10ft / 12ft)</span>
              <span className="text-[11px] text-white/60">For vehicle/boat access. Heavy 6x6 posts &amp; drop-rod cane bolt</span>
              <span className="block text-[#E5B842] font-normal mt-1">+$850.00 ea</span>
            </div>
            <div className="flex items-center gap-2 bg-[#111713] p-1 rounded border border-white/15">
              <button
                onClick={() => onUpdateGates(walkGates, Math.max(0, driveGates - 1))}
                className="w-7 h-7 flex items-center justify-center font-bold text-white hover:bg-white/10 rounded"
              >
                -
              </button>
              <span className="w-5 text-center font-bold text-sm text-[#4ADE80]">{driveGates}</span>
              <button
                onClick={() => onUpdateGates(walkGates, driveGates + 1)}
                className="w-7 h-7 flex items-center justify-center font-bold text-white hover:bg-white/10 rounded"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#E5B842] hover:bg-[#d6a935] text-[#141B16] font-['Rowdies'] font-bold text-xs uppercase px-5 py-2.5 rounded border border-[#141B16]"
          >
            Apply to Blueprint &amp; Close
          </button>
        </div>
      </div>
    </div>
  )
}
