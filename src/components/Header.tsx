import React from 'react';
import { Volume2, VolumeX, Globe } from 'lucide-react';
import { GuideId } from '../types/geography';
import { GUIDES, getNextGuideId } from '../data/geographyData';
import { AnimatedAnimalCharacter } from './AnimatedAnimalCharacter';
import { sound } from '../utils/audio';

interface HeaderProps {
  currentScene: number;
  onNavigate: (sceneIndex: number) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  currentGuideId: GuideId;
  onSwitchGuide: (guideId: GuideId) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScene,
  onNavigate,
  soundEnabled,
  onToggleSound,
  currentGuideId,
  onSwitchGuide,
}) => {
  const guide = GUIDES[currentGuideId];

  const navItems = [
    { label: '01. Beranda', scene: 0 },
    { label: '02. Studi Kasus', scene: 1 },
    { label: '04. Peta Dunia', scene: 3 },
    { label: '05. Bentang Alam', scene: 4 },
    { label: '08. Evaluasi', scene: 7 },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-sky-300/50 bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#0d9488] backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            sound.playClick();
            onNavigate(0);
          }}
          className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 via-sky-500 to-amber-400 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform border border-white/50">
            <Globe className="w-4 h-4" />
          </div>
          <span className="text-base sm:text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0">
            Lab Maya Geografi
          </span>
        </button>

        {/* Zone 2: 5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-sky-50">
          {navItems.map((item) => {
            const isActive =
              currentScene === item.scene ||
              (item.scene === 1 && currentScene === 2) ||
              (item.scene === 4 && currentScene === 5) ||
              (item.scene === 7 && currentScene === 6);
            return (
              <button
                key={item.label}
                onClick={() => {
                  sound.playClick();
                  onNavigate(item.scene);
                }}
                className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-amber-300 font-bold underline underline-offset-8 decoration-2 decoration-amber-300'
                    : 'hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Guide + Sound controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              onSwitchGuide(getNextGuideId(currentGuideId));
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/35 bg-white/15 hover:bg-white/25 transition-all text-xs text-white cursor-pointer whitespace-nowrap shrink-0 backdrop-blur-sm"
            title={`Pemandu aktif: ${guide.name}. Klik untuk ganti.`}
          >
            {guide.animalId ? (
              <div className="w-6 h-6 rounded-full overflow-hidden border border-amber-300 bg-sky-100 shrink-0">
                <AnimatedAnimalCharacter animalId={guide.animalId} />
              </div>
            ) : (
              <img
                src={guide.avatar}
                alt={guide.name}
                className="w-6 h-6 rounded-full object-cover object-top border border-amber-300 bg-sky-100"
              />
            )}
            <span className="hidden sm:inline font-semibold">{guide.name}</span>
          </button>

          <button
            onClick={onToggleSound}
            className={`p-2 rounded-lg border transition-all cursor-pointer shrink-0 ${
              soundEnabled
                ? 'border-amber-300 bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-sm'
                : 'border-white/30 bg-white/15 text-white hover:bg-white/25'
            }`}
            title={soundEnabled ? 'Matikan Suara Narasi' : 'Aktifkan Suara Narasi'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Topographic Hypsometric Elevation Bar Scale */}
      <div className="w-full bg-sky-100 h-1.5 relative overflow-hidden flex">
        <div
          className="hypsometric-gradient h-full transition-all duration-500 ease-out"
          style={{ width: `${((currentScene + 1) / 8) * 100}%` }}
        />
      </div>
    </header>
  );
};
