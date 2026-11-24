import React from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

interface FooterNavProps {
  currentScene: number;
  totalScenes: number;
  onNavigate: (sceneIndex: number) => void;
  sceneTitles: string[];
}

export const FooterNav: React.FC<FooterNavProps> = ({
  currentScene,
  totalScenes,
  onNavigate,
  sceneTitles,
}) => {
  const isFirst = currentScene === 0;
  const isLast = currentScene === totalScenes - 1;

  return (
    <div className="mt-12 pt-6 border-t border-white/30 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Previous button */}
      <div>
        {!isFirst ? (
          <button
            onClick={() => {
              sound.playClick();
              onNavigate(currentScene - 1);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-sky-300 bg-white/95 hover:bg-sky-50 text-sky-900 font-bold text-sm transition-all cursor-pointer shadow-sm whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>
        ) : (
          <div className="w-24" />
        )}
      </div>

      {/* Center scene indicator */}
      <div className="text-center px-4 py-1.5 rounded-xl bg-white/80 border border-sky-200 shadow-xs">
        <span className="text-xs font-mono tracking-wider text-sky-700 uppercase font-bold">
          Scene {String(currentScene + 1).padStart(2, '0')} / {String(totalScenes).padStart(2, '0')}
        </span>
        <p className="text-sm font-extrabold text-slate-900 mt-0.5">{sceneTitles[currentScene]}</p>
      </div>

      {/* Next button */}
      <div>
        {!isLast ? (
          <button
            onClick={() => {
              sound.playClick();
              onNavigate(currentScene + 1);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm shadow-lg transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Lanjut</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => {
              sound.playClick();
              onNavigate(0);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-amber-300/70 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm transition-all cursor-pointer shadow-lg whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Ekspedisi</span>
          </button>
        )}
      </div>
    </div>
  );
};
