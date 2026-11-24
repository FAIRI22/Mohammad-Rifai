import React, { useState, useEffect } from 'react';
import { MapPin, Compass, CheckCircle2, ArrowRight, Sparkles, Volume2 } from 'lucide-react';
import { GuideId, GeoEnvironmentKey } from '../../types/geography';
import { CASE_STUDIES, IMAGES } from '../../data/geographyData';
import { CharacterGuide } from '../CharacterGuide';
import { AnimatedAnimalCharacter } from '../AnimatedAnimalCharacter';
import { sound } from '../../utils/audio';

interface Scene1CaseStudiesProps {
  currentGuideId: GuideId;
  onSwitchGuide: (guideId: GuideId) => void;
  exploredCaseIds: string[];
  onExploreCase: (caseId: string) => void;
  onGoToNext: () => void;
  onGeoContextChange?: (env: GeoEnvironmentKey) => void;
}

const CASE_TO_GEO_ENV: Record<string, GeoEnvironmentKey> = {
  sahara: 'desert-sahara',
  himalaya: 'mountain-himalaya',
  amazon: 'rainforest-amazon',
  tokyo: 'coast-tokyo',
};

export const Scene1CaseStudies: React.FC<Scene1CaseStudiesProps> = ({
  currentGuideId,
  onSwitchGuide,
  exploredCaseIds,
  onExploreCase,
  onGoToNext,
  onGeoContextChange,
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('sahara');
  const activeCase = CASE_STUDIES.find((c) => c.id === selectedCaseId) || CASE_STUDIES[0];

  useEffect(() => {
    onGeoContextChange?.(CASE_TO_GEO_ENV[selectedCaseId] || 'desert-sahara');
  }, [selectedCaseId, onGeoContextChange]);

  const handleSelectCase = (id: string) => {
    sound.playPin();
    setSelectedCaseId(id);
    onExploreCase(id);
  };

  const guideMessage =
    currentGuideId === 'geo'
      ? `Misi Utama dimulai! Keempat pin di peta sudah diletakkan tepat sesuai koordinat aslinya: Gurun Sahara di Afrika Utara, Pegunungan Himalaya di perbatasan Asia Selatan, Hutan Amazon di Amerika Selatan, dan Tokyo di Jepang.`
      : `Klik setiap lokasi studi kasus pada peta atau kartu pilihan untuk membuka data koordinat, elevasi, curah hujan, serta adaptasi manusianya terhadap lingkungan.`;

  // Fine label offsets so Himalaya (73,37) and Tokyo (86.5,34) never collide
  const getLabelPositionClass = (id: string) => {
    if (id === 'himalaya') return 'top-full right-0 mt-1.5';
    if (id === 'tokyo') return 'top-full right-0 mt-1.5';
    return 'top-full left-1/2 -translate-x-1/2 mt-1.5';
  };

  return (
    <div className="space-y-8">
      {/* Header matching Storyboard Panel 02. STUDI KASUS */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-white/90 border border-sky-200 text-xs font-mono font-bold text-[#0369a1] shadow-xs">
            02. Studi Kasus · Misi Utama Eksplorasi
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow-sm mt-1.5">
            Misi Utama: Jelajahi Karakteristik Wilayah Dunia
          </h2>
          <p className="text-sky-50 drop-shadow-sm font-medium text-sm sm:text-base mt-2">
            Jelajahi dunia dan temukan karakteristik empat wilayah studi kasus utama melalui pin peta beresolusi tinggi.
          </p>
        </div>

        <div className="px-3.5 py-2 rounded-xl border border-sky-300 bg-white/95 shadow-sm text-xs font-mono shrink-0">
          <span className="text-slate-600 font-semibold">Lokasi Diamati: </span>
          <span className="text-[#0369a1] font-extrabold tabular-nums">
            {exploredCaseIds.length} / {CASE_STUDIES.length}
          </span>
        </div>
      </div>

      {/* Animated Character Guide */}
      <CharacterGuide
        currentGuideId={currentGuideId}
        onSwitchGuide={onSwitchGuide}
        message={guideMessage}
      />

      {/* Interactive Case Study Map + Field Dossier Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Parchment Header + Crisp World Map with 4 Geographically Accurate Pins */}
        <div className="lg:col-span-7 space-y-4">
          {/* Storyboard Parchment Mission Plaque */}
          <div className="rounded-2xl border-2 border-amber-500/70 bg-gradient-to-b from-[#fef9e7] to-[#fde68a] text-slate-900 p-4 shadow-xl flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-amber-400/40 border border-amber-600/40 flex items-center justify-center shrink-0">
              <Compass className="w-6 h-6 text-amber-900" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black tracking-tight text-slate-950">
                Misi Utama:
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-800">
                Jelajahi dunia dan temukan karakteristik wilayah berikut!
              </p>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-sky-300 bg-white overflow-hidden shadow-xl">
            <div className="relative aspect-[16/9] w-full bg-sky-100 overflow-hidden">
              <img
                src={IMAGES.worldMapDetailed}
                alt="Peta Lokasi Studi Kasus Dunia Resolusi Tinggi"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />

              {/* 4 Accurately Placed Storyboard Pins */}
              {CASE_STUDIES.map((cs) => {
                const isSelected = cs.id === selectedCaseId;
                const isVisited = exploredCaseIds.includes(cs.id);
                return (
                  <button
                    key={cs.id}
                    onClick={() => handleSelectCase(cs.id)}
                    style={{
                      left: `${cs.mapPin.x}%`,
                      top: `${cs.mapPin.y}%`,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer focus:outline-none"
                    title={`Pelajari ${cs.title}`}
                  >
                    <span
                      className={`absolute -inset-2.5 rounded-full ${
                        isSelected ? 'bg-amber-400/50 animate-ping' : ''
                      }`}
                    />
                    <div
                      className={`relative flex items-center justify-center rounded-full transition-all shadow-lg ${
                        isSelected
                          ? 'w-8 h-8 bg-amber-400 text-slate-950 ring-4 ring-white scale-110'
                          : isVisited
                          ? 'w-6 h-6 bg-emerald-500 text-white ring-2 ring-white'
                          : 'w-6 h-6 bg-rose-600 text-white ring-2 ring-white hover:bg-amber-400 hover:text-slate-950'
                      }`}
                    >
                      {isVisited && !isSelected ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <MapPin className="w-3.5 h-3.5 stroke-[2.5]" />
                      )}
                    </div>

                    <span
                      className={`absolute ${getLabelPositionClass(
                        cs.id
                      )} px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold whitespace-nowrap shadow-xl border transition-all ${
                        isSelected
                          ? 'bg-amber-300 text-slate-950 border-amber-700 scale-105'
                          : 'bg-[#fef9e7] text-slate-900 border-amber-700/50 group-hover:bg-amber-300'
                      }`}
                    >
                      {cs.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Prompt Banner matching Storyboard Scene 02 */}
            <div className="p-3.5 bg-gradient-to-r from-[#0284c7] to-[#0d9488] border-t border-sky-200 flex items-center justify-between gap-3">
              <span className="text-xs sm:text-sm text-white font-bold">
                Pilih salah satu lokasi untuk memulai misi!
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  onGoToNext();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold cursor-pointer shrink-0 shadow-md"
              >
                <span>Buka Panduan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4 Quick Selector Cards with Landscape Thumbnails */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {CASE_STUDIES.map((cs) => {
              const isSelected = cs.id === selectedCaseId;
              const isVisited = exploredCaseIds.includes(cs.id);
              return (
                <button
                  key={cs.id}
                  onClick={() => handleSelectCase(cs.id)}
                  className={`rounded-xl border-2 overflow-hidden text-left transition-all cursor-pointer flex flex-col ${
                    isSelected
                      ? 'border-amber-400 bg-amber-400 text-slate-950 shadow-lg scale-[1.02]'
                      : 'border-sky-200 bg-white/95 hover:bg-white hover:border-sky-400 text-slate-900 shadow-sm'
                  }`}
                >
                  <div className="relative aspect-[16/9] w-full bg-sky-100 overflow-hidden">
                    <img
                      src={cs.imageUrl}
                      alt={cs.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                    {isVisited && (
                      <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <div className="p-2.5">
                    <h4 className="text-xs font-extrabold leading-snug">{cs.title}</h4>
                    <span
                      className={`text-[10px] block truncate ${
                        isSelected ? 'text-slate-900 font-semibold' : 'text-slate-600'
                      }`}
                    >
                      {cs.regionName}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Case Study Dossier (Bright Frosted Daylight Card) */}
        <div className="lg:col-span-5 rounded-2xl border-2 border-sky-200 bg-white/95 text-slate-900 p-5 sm:p-6 shadow-2xl space-y-4">
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-sky-100">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-2 rounded-xl bg-sky-50 border border-sky-200">
                {activeCase.icon}
              </span>
              <div>
                <span className="text-[11px] font-mono text-sky-700 uppercase tracking-wider font-bold">
                  Studi Kasus · {activeCase.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950">{activeCase.title}</h3>
                <p className="text-xs text-emerald-700 font-semibold">{activeCase.subtitle}</p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                sound.speak(`${activeCase.title}. ${activeCase.summary}`);
              }}
              className="p-2 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-800 border border-sky-300 cursor-pointer shrink-0"
              title="Dengarkan ringkasan studi kasus"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Active Location Landscape Image Showcase */}
          <div className="relative rounded-xl overflow-hidden border border-sky-200 aspect-[16/9] bg-sky-100 shadow-sm">
            <img
              src={activeCase.imageUrl}
              alt={`Bentang alam ${activeCase.title}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between gap-2 text-[11px] text-white">
              <span className="font-bold drop-shadow">{activeCase.title}</span>
              <span className="font-mono px-2 py-0.5 rounded bg-black/50 backdrop-blur-sm border border-white/25">
                {activeCase.coordinates}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="flex justify-between p-2.5 rounded-lg bg-sky-50 border border-sky-100">
              <span className="text-slate-500 font-medium">Koordinat:</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">{activeCase.coordinates}</span>
            </div>
            <div className="flex justify-between gap-3 p-2.5 rounded-lg bg-sky-50 border border-sky-100">
              <span className="text-slate-500 font-medium shrink-0">Elevasi:</span>
              <span className="font-semibold text-emerald-800 text-right">{activeCase.elevation}</span>
            </div>
            <div className="flex justify-between gap-3 p-2.5 rounded-lg bg-sky-50 border border-sky-100">
              <span className="text-slate-500 font-medium shrink-0">Iklim:</span>
              <span className="font-semibold text-sky-800 text-right">{activeCase.climate}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed">
            {activeCase.summary}
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-sky-800 block uppercase tracking-wide">
              Temuan Karakteristik Wilayah:
            </span>
            <ul className="space-y-2 text-xs text-slate-700">
              {activeCase.keyFindings.map((finding, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Animated Regional Wildlife Mascot Card */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-sky-50 to-emerald-50 border border-sky-200 flex items-center gap-3.5 shadow-xs">
            <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-amber-400 bg-white shrink-0 shadow-sm">
              <AnimatedAnimalCharacter
                animalId={activeCase.wildlife.animalId}
                onClick={() => {
                  sound.playClick();
                  sound.speak(`${activeCase.wildlife.name}. ${activeCase.wildlife.adaptationFact}`);
                }}
                title={`Klik ${activeCase.wildlife.name} untuk dengar fakta adaptasi!`}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-700">
                  Fauna Khas Animasi · Klik Satwa
                </span>
                <button
                  onClick={() => {
                    sound.playClick();
                    sound.speak(`${activeCase.wildlife.name}. ${activeCase.wildlife.adaptationFact}`);
                  }}
                  className="text-[10px] font-bold text-sky-700 hover:text-sky-900 underline cursor-pointer shrink-0"
                >
                  Dengar Fakta
                </button>
              </div>
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">
                {activeCase.wildlife.name}
              </h4>
              <p className="text-[11px] text-slate-700 leading-snug mt-0.5">
                {activeCase.wildlife.adaptationFact}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 leading-relaxed">
            <strong className="text-amber-900 block mb-0.5">Interaksi Manusia & Tantangan:</strong>
            {activeCase.humanImpact}
          </div>
        </div>
      </div>
    </div>
  );
};
