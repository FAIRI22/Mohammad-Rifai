import React, { useEffect } from 'react';
import { BookOpen, HelpCircle, Play, Compass, CheckCircle2, Volume2 } from 'lucide-react';
import { GuideId, GeoEnvironmentKey } from '../../types/geography';
import { GUIDES, IMAGES } from '../../data/geographyData';
import { AnimatedAnimalCharacter } from '../AnimatedAnimalCharacter';
import { sound } from '../../utils/audio';

interface Scene0HeroProps {
  onNavigate: (sceneIndex: number) => void;
  currentGuideId: GuideId;
  onSelectGuide: (guideId: GuideId) => void;
  onGeoContextChange?: (env: GeoEnvironmentKey) => void;
}

export const Scene0Hero: React.FC<Scene0HeroProps> = ({
  onNavigate,
  currentGuideId,
  onSelectGuide,
  onGeoContextChange,
}) => {
  const currentGuide = GUIDES[currentGuideId];

  useEffect(() => {
    if (!onGeoContextChange) return;
    if (currentGuideId === 'komodo') {
      onGeoContextChange('continent-oceania');
    } else if (currentGuideId === 'riko') {
      onGeoContextChange('rainforest-amazon');
    } else {
      onGeoContextChange('ocean-global');
    }
  }, [currentGuideId, onGeoContextChange]);

  return (
    <div className="space-y-8">
      {/* Scene 01 Hero Card matching Bright Daylight Ocean-Sky Storyboard */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-sky-300/70 bg-[#0284c7] shadow-2xl">
        {/* Bright Earth Horizon Backdrop */}
        <div className="absolute inset-0">
          <img
            src={IMAGES.earthHorizon}
            alt="Panorama Planet Bumi dari Orbit"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0369a1]/80 via-[#0284c7]/55 to-[#0d9488]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0369a1]/85 via-transparent to-[#0284c7]/25" />
        </div>

        {/* World Landmarks Skyline Silhouette */}
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute bottom-0 inset-x-0 w-full h-20 sm:h-24 text-[#075985]/65 fill-current pointer-events-none z-0"
        >
          <path d="M0 120 L0 104 L48 104 L58 84 L68 104 L110 104 L124 44 L132 16 L136 16 L144 44 L158 104 L195 104 L195 82 L220 74 L245 82 L245 104 L285 104 L292 78 L315 78 L322 104 L370 104 L388 86 L402 86 L402 68 L430 62 L458 68 L458 86 L472 86 L490 104 L550 104 L568 82 L580 70 L592 82 L610 104 L670 104 L684 86 L710 86 L718 68 L742 54 L766 68 L774 86 L805 86 L818 104 L860 104 L872 84 L892 74 L886 64 L908 58 L902 48 L924 40 L946 48 L940 58 L962 64 L956 74 L976 84 L988 104 L1045 104 L1052 54 L1064 36 L1076 54 L1082 104 L1120 104 L1126 42 L1138 14 L1150 42 L1156 104 L1200 104 L1200 120 Z" />
        </svg>

        {/* Content Container */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300 tracking-wide">
              <span>01. Beranda</span>
              <span aria-hidden="true">·</span>
              <span>Geografi SMA Kelas XI</span>
              <span aria-hidden="true">·</span>
              <span>Laboratorium Virtual</span>
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-3.5">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 text-slate-950 flex items-center justify-center shadow-lg border-2 border-white/70">
                  <Compass className="w-7 h-7 stroke-[2.2]" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-none drop-shadow">
                    LAB MAYA
                  </h1>
                  <div className="mt-1.5 inline-block px-3.5 py-1 rounded-lg bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-300 text-slate-950 font-black text-sm sm:text-lg tracking-wide shadow-md">
                    EKSPLORASI GEOGRAFIS DUNIA
                  </div>
                </div>
              </div>
              <p className="text-sm font-semibold text-sky-100">
                Laboratorium Virtual Interaktif — 8 Tahapan Eksplorasi Ilmiah
              </p>
            </div>

            <p className="text-sm sm:text-base text-white/95 leading-relaxed max-w-xl text-balance">
              Jelajahi studi kasus wilayah ekstrem Bumi dari Gurun Sahara hingga Megapolitan Tokyo,
              amati peta fisik 7 benua & 5 samudra dengan jernih, pelajari bentang alam dan dinamika penduduk,
              lalu tuntaskan evaluasi akhir.
            </p>

            {/* 3 Storyboard Action Buttons */}
            <div className="pt-1 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 max-w-xl">
              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate(1);
                }}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl border border-sky-200/60 bg-gradient-to-b from-sky-500 to-sky-700 hover:from-sky-400 hover:to-sky-600 text-white font-bold text-sm shadow-lg transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <BookOpen className="w-4 h-4 text-white" />
                <span>Studi Kasus</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate(2);
                }}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl border border-sky-200/60 bg-gradient-to-b from-sky-600 to-sky-800 hover:from-sky-500 hover:to-sky-700 text-white font-bold text-sm shadow-lg transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <HelpCircle className="w-4 h-4 text-amber-300" />
                <span>Panduan</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate(1);
                }}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-xl bg-gradient-to-b from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-xl border border-white/60 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Mulai Ekspedisi</span>
              </button>
            </div>

            <div>
              <button
                onClick={() => {
                  sound.playClick();
                  sound.speak(
                    `Selamat datang di Lab Maya Eksplorasi Geografis Dunia. Saya ${currentGuide.name}, siap memandumu dalam delapan tahap ekspedisi geografi.`
                  );
                }}
                className="inline-flex items-center gap-2 text-xs text-amber-300 hover:text-amber-200 font-bold cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Putar Sapaan Suara {currentGuide.name}</span>
              </button>
            </div>

            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-white/25 max-w-md">
              <div>
                <span className="block text-2xl font-bold text-white font-mono tabular-nums">08</span>
                <span className="text-xs text-sky-100">Scene Interaktif</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-amber-300 font-mono tabular-nums">7 & 5</span>
                <span className="text-xs text-sky-100">Benua & Samudra</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-emerald-300 font-mono tabular-nums">4</span>
                <span className="text-xs text-sky-100">Studi Kasus</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bright Animated Character Guide Selector */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-sky-200/60 bg-white/95 text-slate-900 p-5 sm:p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-sky-700 uppercase tracking-wider">
                  Pilih Karakter Pemandu
                </span>
                <span className="text-emerald-700 font-bold">Peneliti & Hewan Animasi</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {Object.values(GUIDES).map((g) => {
                  const isSelected = currentGuideId === g.id;
                  return (
                    <button
                      key={g.id}
                      onClick={() => {
                        sound.playClick();
                        onSelectGuide(g.id);
                      }}
                      className={`relative p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer group ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50 shadow-lg ring-2 ring-amber-400/50'
                          : 'border-sky-100 bg-sky-50/70 hover:border-sky-400'
                      }`}
                    >
                      <div
                        className={`relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-2 border border-sky-200 bg-sky-100 ${
                          !g.animalId && isSelected ? 'animate-guide-bob' : ''
                        }`}
                      >
                        {g.animalId ? (
                          <AnimatedAnimalCharacter
                            animalId={g.animalId}
                            className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <img
                            src={g.avatar}
                            alt={`Karakter Animasi ${g.name}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                        {g.animalId && (
                          <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-emerald-600/90 text-white text-[9px] font-bold">
                            Satwa Animasi
                          </span>
                        )}
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 bg-amber-400 text-slate-950 p-1 rounded-full shadow-md">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                      <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                        {g.name}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-sky-700 font-medium leading-snug mt-0.5 line-clamp-1">
                        {g.role}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="p-3.5 rounded-xl border border-sky-200 bg-sky-50 text-xs text-slate-700 space-y-1">
                <div className="flex items-center gap-1.5 text-sky-800 font-bold">
                  <Compass className="w-4 h-4 text-amber-600" />
                  <span>Pemandu Aktif: {currentGuide.name}</span>
                </div>
                <p className="leading-relaxed text-slate-700">{currentGuide.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8-Scene Interactive Overview Strip */}
      <div className="rounded-2xl border border-sky-200 bg-white/95 backdrop-blur-sm p-5 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-bold text-[#0369a1] uppercase tracking-wider">
            Peta Jalan 8 Scene Ekspedisi
          </span>
          <span className="text-xs font-medium text-slate-600">Klik salah satu tahap</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {[
            '01. Beranda',
            '02. Studi Kasus',
            '03. Panduan',
            '04. Peta Dunia',
            '05. Bentang Alam',
            '06. Penduduk',
            '07. Checklist',
            '08. Evaluasi',
          ].map((label, idx) => (
            <button
              key={label}
              onClick={() => {
                sound.playClick();
                onNavigate(idx);
              }}
              className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                idx === 0
                  ? 'border-amber-400 bg-amber-400 text-slate-950 font-extrabold shadow-sm'
                  : 'border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-900'
              }`}
            >
              <span className="block truncate">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
