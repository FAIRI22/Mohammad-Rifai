import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Square,
  Compass,
  MapPin,
  Sparkles,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Ship,
} from 'lucide-react';
import { GuideId, GeoEnvironmentKey } from '../../types/geography';
import { CASE_STUDIES, IMAGES, REGIONS } from '../../data/geographyData';
import { CharacterGuide } from '../CharacterGuide';
import { sound } from '../../utils/audio';

interface Scene6ChecklistProps {
  currentGuideId: GuideId;
  onSwitchGuide: (guideId: GuideId) => void;
  exploredCaseIds: string[];
  visitedRegionIds: string[];
  exploredLandforms: boolean;
  exploredHumanEnv: boolean;
  quizCompleted: boolean;
  manualChecklist: Record<string, boolean>;
  onToggleManualCheck: (missionId: string, currentChecked: boolean) => void;
  onNavigate: (sceneIndex: number) => void;
  onGeoContextChange?: (env: GeoEnvironmentKey) => void;
}

const FINDING_TO_ENV: Record<string, GeoEnvironmentKey> = {
  sahara: 'desert-sahara',
  himalaya: 'mountain-himalaya',
  amazon: 'rainforest-amazon',
  tokyo: 'coast-tokyo',
};

export const Scene6Checklist: React.FC<Scene6ChecklistProps> = ({
  currentGuideId,
  onSwitchGuide,
  exploredCaseIds,
  visitedRegionIds,
  exploredLandforms,
  exploredHumanEnv,
  quizCompleted,
  manualChecklist,
  onToggleManualCheck,
  onNavigate,
  onGeoContextChange,
}) => {
  const [selectedFindingId, setSelectedFindingId] = useState<string>('himalaya');

  useEffect(() => {
    onGeoContextChange?.(FINDING_TO_ENV[selectedFindingId] || 'mountain-himalaya');
  }, [selectedFindingId, onGeoContextChange]);

  const missions = [
    {
      id: 'asia',
      label: 'Jelajahi Benua Asia & Peta Dunia',
      detail: 'Buka Peta Dunia (Scene 04) dan amati benua Asia atau benua lainnya.',
      targetScene: 3,
      autoDone: visitedRegionIds.includes('asia') || visitedRegionIds.length >= 2,
    },
    {
      id: 'iklim',
      label: 'Analisis Iklim & Bentang Alam',
      detail: 'Eksplorasi 6 bentang alam dan 4 zona iklim di Scene 05.',
      targetScene: 4,
      autoDone: exploredLandforms,
    },
    {
      id: 'bencana',
      label: 'Temukan Risiko Bencana & Studi Kasus',
      detail: 'Amati minimal 2 wilayah studi kasus dunia (Sahara, Himalaya, Amazon, Tokyo).',
      targetScene: 1,
      autoDone: exploredCaseIds.length >= 2,
    },
    {
      id: 'sda',
      label: 'Pelajari Sumber Daya & Penduduk',
      detail: 'Cek grafik 10 negara terpadat dan status lingkungan di Scene 06.',
      targetScene: 5,
      autoDone: exploredHumanEnv,
    },
    {
      id: 'laporan',
      label: 'Buat Laporan Akhir & Evaluasi',
      detail: 'Selesaikan kuis evaluasi 5 soal di Scene 08 untuk menerbitkan sertifikat.',
      targetScene: 7,
      autoDone: quizCompleted,
    },
  ];

  const isMissionChecked = (id: string, autoDone: boolean) => {
    if (manualChecklist[id] !== undefined) return manualChecklist[id];
    return autoDone;
  };

  const completedCount = missions.filter((m) => isMissionChecked(m.id, m.autoDone)).length;
  const activeFinding = CASE_STUDIES.find((c) => c.id === selectedFindingId) || CASE_STUDIES[1];

  const guideMessage =
    currentGuideId === 'geo'
      ? `Mari periksa daftar misi ekspedisimu! Saat ini ${completedCount} dari ${missions.length} misi telah tercatat selesai. Kamu bisa langsung melompat ke bagian yang belum selesai atau melanjutkan ke Evaluasi Akhir.`
      : `Checklist Ekspedisi merangkum seluruh temuan geografis dari benua, iklim, sumber daya alam, hingga studi kasus dunia sebelum kita menyusun laporan akhir.`;

  return (
    <div className="space-y-8">
      {/* Header matching Storyboard Panel 07. CHECKLIST EKSPEDISI */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-white/90 border border-sky-200 text-xs font-mono font-bold tracking-wider text-[#0369a1] uppercase shadow-xs">
            SCENE 07 · CHECKLIST EKSPEDISI GEOGRAFI
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow-sm mt-1.5">
            Daftar Misi & Rute Eksplorasi Dunia
          </h2>
          <p className="text-sky-50 drop-shadow-sm font-medium text-sm sm:text-base mt-2">
            Tinjau progres misi penjelajahan, pantau rute ekspedisi pada peta, dan rangkum temuan penting wilayah dunia.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl border border-sky-300 bg-white/95 shadow-sm text-xs font-mono shrink-0">
          <span className="text-slate-600 font-semibold">Progres Misi: </span>
          <span className="text-[#0369a1] font-extrabold tabular-nums">
            {completedCount} / {missions.length} Selesai
          </span>
        </div>
      </div>

      {/* Animated Character Guide */}
      <CharacterGuide
        currentGuideId={currentGuideId}
        onSwitchGuide={onSwitchGuide}
        message={guideMessage}
      />

      {/* Main Grid: Daftar Misi (Left) + Rute Ekspedisi Map (Right) matching Storyboard 07 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Crisp Light Daftar Misi Checklist matching Scene_07 */}
        <div className="lg:col-span-5 rounded-3xl border border-sky-200 bg-white/95 text-slate-900 p-5 sm:p-6 shadow-2xl flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-sky-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="text-lg font-extrabold text-slate-950">Daftar Misi:</h3>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 tabular-nums">
                {Math.round((completedCount / missions.length) * 100)}%
              </span>
            </div>

            <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-sky-500 to-amber-500 transition-all duration-500"
                style={{ width: `${(completedCount / missions.length) * 100}%` }}
              />
            </div>

            <div className="space-y-2.5">
              {missions.map((m) => {
                const checked = isMissionChecked(m.id, m.autoDone);
                return (
                  <div
                    key={m.id}
                    className={`p-3 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                      checked
                        ? 'border-emerald-300 bg-emerald-50'
                        : 'border-sky-100 bg-sky-50/70 hover:border-sky-300'
                    }`}
                  >
                    <button
                      onClick={() => {
                        sound.playClick();
                        onToggleManualCheck(m.id, checked);
                      }}
                      className="flex items-start gap-3 text-left cursor-pointer flex-1"
                    >
                      {checked ? (
                        <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span
                          className={`text-sm font-bold block ${
                            checked ? 'text-emerald-900' : 'text-slate-900'
                          }`}
                        >
                          {m.label}
                        </span>
                        <span className="text-[11px] text-slate-600 block mt-0.5 leading-snug">
                          {m.detail}
                        </span>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        sound.playClick();
                        onNavigate(m.targetScene);
                      }}
                      className="p-1.5 rounded-lg bg-white hover:bg-sky-600 text-sky-700 hover:text-white border border-sky-200 shrink-0 cursor-pointer shadow-sm"
                      title={`Buka ${m.label}`}
                      aria-label={`Buka ${m.label}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onNavigate(7);
            }}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm shadow-lg transition-all cursor-pointer"
          >
            <span>Lanjut ke Evaluasi Akhir (Scene 08)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Expedition Route World Map */}
        <div className="lg:col-span-7 rounded-3xl border-2 border-sky-300 bg-white overflow-hidden shadow-xl flex flex-col justify-between">
          <div className="p-3.5 bg-gradient-to-r from-[#0284c7] to-[#0369a1] border-b border-sky-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-white font-bold">
              <Compass className="w-4 h-4 text-amber-300" />
              <span>Peta Rute Ekspedisi Geografis Dunia</span>
            </div>
            <div className="flex items-center gap-1.5 text-sky-50 font-mono text-[11px]">
              <Ship className="w-3.5 h-3.5 text-amber-300" />
              <span>{visitedRegionIds.length}/{REGIONS.length} Benua</span>
            </div>
          </div>

          <div className="relative aspect-[16/9] w-full bg-sky-100 overflow-hidden">
            <img
              src={IMAGES.worldMapDetailed}
              alt="Peta Rute Ekspedisi Geografi"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />

            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
            >
              <path
                d="M 31 60 Q 40 42, 51 42 T 73 37 T 86.5 34"
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.75"
                strokeDasharray="1.8 1.4"
              />
            </svg>

            <div
              style={{ left: '65%', top: '66%' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none px-2 py-1 rounded-full bg-white/95 border border-sky-300 text-sky-900 shadow-lg flex items-center gap-1 text-[10px] font-mono font-bold"
            >
              <Ship className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Kapal Riset</span>
            </div>

            {CASE_STUDIES.map((cs) => {
              const isSelected = cs.id === selectedFindingId;
              const isVisited = exploredCaseIds.includes(cs.id);
              const labelOffset =
                cs.id === 'himalaya'
                  ? 'top-full right-0 mt-1'
                  : cs.id === 'tokyo'
                  ? 'top-full left-0 mt-1'
                  : 'top-full left-1/2 -translate-x-1/2 mt-1';
              return (
                <button
                  key={cs.id}
                  onClick={() => {
                    sound.playPin();
                    setSelectedFindingId(cs.id);
                  }}
                  style={{ left: `${cs.mapPin.x}%`, top: `${cs.mapPin.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group focus:outline-none"
                  title={cs.title}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition-all ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 ring-4 ring-white scale-110'
                        : isVisited
                        ? 'bg-emerald-500 text-white ring-2 ring-white'
                        : 'bg-rose-600 text-white ring-2 ring-white'
                    }`}
                  >
                    {isVisited ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                  </div>
                  <span
                    className={`absolute ${labelOffset} px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap shadow-md ${
                      isSelected
                        ? 'bg-amber-300 text-slate-950'
                        : 'bg-white/95 text-slate-900 border border-sky-200'
                    }`}
                  >
                    {cs.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-sky-50 border-t border-sky-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-800">
            <div className="flex items-center gap-4 font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Sudah Diamati
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Titik Misi
              </span>
            </div>
            <span className="text-[#0369a1] font-bold">Klik pin pada peta untuk melihat Ringkasan Temuan</span>
          </div>
        </div>
      </div>

      {/* Bottom Section matching Storyboard: Crisp Light Ringkasan Temuan */}
      <div className="rounded-3xl border border-sky-200 bg-white/95 text-slate-900 p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-sky-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="text-base sm:text-lg font-extrabold text-slate-950">Ringkasan Temuan Ekspedisi:</h3>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {CASE_STUDIES.map((cs) => (
              <button
                key={cs.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedFindingId(cs.id);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  selectedFindingId === cs.id
                    ? 'border-amber-500 bg-amber-400 text-slate-950 shadow-sm'
                    : 'border-sky-200 bg-sky-50 text-slate-700 hover:bg-sky-100'
                }`}
              >
                {cs.icon} {cs.title}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-4 rounded-2xl overflow-hidden border border-sky-200 aspect-[16/9] bg-sky-100 shadow-sm">
            <img
              src={activeFinding.imageUrl}
              alt={activeFinding.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="md:col-span-8 space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-2xl">{activeFinding.icon}</span>
              <h4 className="text-lg sm:text-xl font-extrabold text-slate-950">{activeFinding.title}</h4>
              <span className="px-2.5 py-0.5 rounded-md bg-sky-50 border border-sky-200 text-[11px] font-mono font-bold text-sky-800">
                {activeFinding.climate.split('(')[0].trim()}
              </span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{activeFinding.summary}</p>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-slate-800">
              <strong className="text-amber-900">Catatan Utama Lapangan: </strong>
              {activeFinding.keyFindings[0]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
