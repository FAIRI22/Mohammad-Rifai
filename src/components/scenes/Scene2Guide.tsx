import React, { useState, useEffect } from 'react';
import { Compass, Volume2, ArrowLeft, ArrowRight, Sliders, ExternalLink, MapPin, Globe2 } from 'lucide-react';
import { GuideId, GeoEnvironmentKey } from '../../types/geography';
import { GUIDES, GUIDE_FEATURES, IMAGES, getNextGuideId } from '../../data/geographyData';
import { AnimatedAnimalCharacter } from '../AnimatedAnimalCharacter';
import { sound } from '../../utils/audio';

interface Scene2GuideProps {
  currentGuideId: GuideId;
  onSwitchGuide: (guideId: GuideId) => void;
  onNavigate: (sceneIndex: number) => void;
  onGeoContextChange?: (env: GeoEnvironmentKey) => void;
}

const GUIDE_MAP_SPOTS = [
  {
    id: 'iklim',
    label: 'Iklim & Bioma (Amazon)',
    summary: 'Analisis zona iklim tropis, curah hujan, & bentang alam dunia.',
    x: 29,
    y: 54,
    dotColor: 'bg-emerald-500',
    targetScene: 4,
  },
  {
    id: 'peta',
    label: 'Peta Interaktif (Sahara)',
    summary: 'Eksplorasi relief benua, samudra, & studi kasus wilayah ekstrem.',
    x: 50,
    y: 39,
    dotColor: 'bg-amber-500',
    targetScene: 3,
  },
  {
    id: 'penduduk',
    label: 'Kependudukan (Asia)',
    summary: 'Amati persebaran penduduk dunia, negara terpadat, & sumber daya.',
    x: 73,
    y: 39,
    dotColor: 'bg-rose-500',
    targetScene: 5,
  },
  {
    id: 'misi',
    label: 'Misi Ekspedisi (Nusantara)',
    summary: 'Selesaikan checklist penjelajahan & raih Lencana Geografi.',
    x: 80,
    y: 53,
    dotColor: 'bg-sky-500',
    targetScene: 6,
  },
] as const;

export const Scene2Guide: React.FC<Scene2GuideProps> = ({
  currentGuideId,
  onSwitchGuide,
  onNavigate,
  onGeoContextChange,
}) => {
  const guide = GUIDES[currentGuideId];
  const [compassBearing, setCompassBearing] = useState<number>(45);
  const [elevationDelta, setElevationDelta] = useState<number>(250);
  const [horizontalDistance, setHorizontalDistance] = useState<number>(1000);
  const [activeSpotId, setActiveSpotId] = useState<string>('peta');

  useEffect(() => {
    const spotEnvMap: Record<string, GeoEnvironmentKey> = {
      iklim: 'rainforest-amazon',
      peta: 'ocean-global',
      penduduk: 'coast-tokyo',
      misi: 'continent-oceania',
    };
    onGeoContextChange?.(spotEnvMap[activeSpotId] || 'ocean-global');
  }, [activeSpotId, onGeoContextChange]);

  const activeSpot =
    GUIDE_MAP_SPOTS.find((s) => s.id === activeSpotId) || GUIDE_MAP_SPOTS[1];

  const slopePercent = ((elevationDelta / horizontalDistance) * 100).toFixed(1);
  const slopeCategory =
    Number(slopePercent) < 8
      ? 'Datar / Landai (0–8%) — Cocok untuk permukiman & persawahan'
      : Number(slopePercent) < 15
      ? 'Agak Curam (8–15%) — Perlu terasering konservasi'
      : Number(slopePercent) < 45
      ? 'Curam (15–45%) — Zona rawan erosi, disarankan hutan lindung'
      : 'Sangat Curam (>45%) — Zona bahaya longsor';

  const getDirectionLabel = (deg: number) => {
    if (deg >= 337.5 || deg < 22.5) return 'Utara (N)';
    if (deg < 67.5) return 'Timur Laut (NE)';
    if (deg < 112.5) return 'Timur (E)';
    if (deg < 157.5) return 'Tenggara (SE)';
    if (deg < 202.5) return 'Selatan (S)';
    if (deg < 247.5) return 'Barat Daya (SW)';
    if (deg < 292.5) return 'Barat (W)';
    return 'Barat Laut (NW)';
  };

  const guideWelcome =
    'Halo, Penjelajah! Di sini kamu akan menjelajahi dunia melalui peta interaktif, menganalisis data kependudukan dan iklim, serta menyelesaikan misi seru hingga tuntas!';

  return (
    <div className="space-y-8">
      {/* Header matching Storyboard 03. PANDUAN */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-white/90 border border-sky-200 text-xs font-mono font-bold tracking-wider text-[#0369a1] uppercase shadow-xs">
            SCENE 03 · PANDUAN PENJELAJAH LAB MAYA
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow-sm mt-1.5">
            Panduan & Fitur Utama Lab Maya
          </h2>
          <p className="text-sky-50 drop-shadow-sm font-medium text-sm sm:text-base mt-2">
            Kenali seluruh instrumen navigasi dan fitur interaktif yang akan membantumu selama ekspedisi geografi.
          </p>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            sound.speak(guideWelcome);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md border border-amber-500/40 cursor-pointer shrink-0"
        >
          <Volume2 className="w-4 h-4" />
          <span>Putar Sapaan {guide.name}</span>
        </button>
      </div>

      {/* Main Storyboard Split: Character Welcome + Contextual World Map | Fitur Utama List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Animated Character Guide Spotlight + Interactive Expedition Map */}
        <div className="lg:col-span-5 rounded-3xl border-2 border-sky-300/90 bg-gradient-to-b from-[#e0f2fe] via-[#f0f9ff] to-[#dcfce7] p-6 flex flex-col justify-between gap-5 shadow-xl text-slate-900">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {guide.animalId ? (
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md shrink-0 bg-sky-100">
                  <AnimatedAnimalCharacter
                    animalId={guide.animalId}
                    onClick={() => {
                      sound.playClick();
                      sound.speak(guideWelcome);
                    }}
                    title={`Klik ${guide.name} untuk memutar sapaan!`}
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md shrink-0 bg-sky-100 animate-guide-bob">
                  <img
                    src={guide.avatar}
                    alt={`Karakter Animasi ${guide.name}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}
              <div>
                <span className="inline-block px-2 py-0.5 rounded bg-amber-100 border border-amber-300 text-[10px] font-mono text-amber-800 uppercase font-bold">
                  {guide.badge}
                </span>
                <h3 className="text-xl font-extrabold text-[#0c3559] mt-1">{guide.name}</h3>
                <p className="text-xs font-semibold text-sky-800">{guide.role}</p>
                <button
                  onClick={() => {
                    sound.playClick();
                    onSwitchGuide(getNextGuideId(currentGuideId));
                  }}
                  className="mt-1.5 text-[11px] font-bold text-[#0369a1] hover:text-sky-900 underline underline-offset-4 cursor-pointer"
                >
                  Ganti Karakter ke {GUIDES[getNextGuideId(currentGuideId)].name}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white text-slate-900 shadow-sm border border-sky-200">
              <p className="text-sm font-semibold leading-relaxed">
                “{guideWelcome}”
              </p>
            </div>
          </div>

          {/* Contextual Interactive Map Preview matching Guide Welcome Text */}
          <div className="rounded-2xl border border-sky-200/70 bg-white/95 text-slate-900 p-3 shadow-xl space-y-2.5">
            <div className="flex items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900">
                <Globe2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Peta Rute Ekspedisi & Zona Analisis</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md border border-sky-200">
                Klik Pin Misi
              </span>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-sky-200 bg-white">
              <img
                src={IMAGES.guideExpeditionMap}
                alt="Peta Dunia Interaktif: Zona Iklim, Persebaran Penduduk, dan Rute Misi"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover select-none"
              />

              {/* Subtle Compass Badge */}
              <div className="pointer-events-none absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 border border-sky-300 shadow flex items-center justify-center text-[9px] font-extrabold text-sky-900">
                U
              </div>

              {/* Interactive Mission Hotspots */}
              {GUIDE_MAP_SPOTS.map((spot) => {
                const isActive = spot.id === activeSpot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setActiveSpotId(spot.id);
                    }}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    title={spot.label}
                    aria-label={spot.label}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-transform ${
                      isActive ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-6 h-6 rounded-full border-2 border-white shadow-md ${spot.dotColor} ${
                        isActive ? 'ring-2 ring-amber-400' : ''
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5 text-white" />
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Hotspot Readout Bar */}
            <div className="flex items-center justify-between gap-2 rounded-xl bg-sky-50 border border-sky-200 px-3 py-2">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${activeSpot.dotColor}`} />
                  <p className="text-xs font-extrabold text-slate-900 truncate">
                    {activeSpot.label}
                  </p>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                  {activeSpot.summary}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onNavigate(activeSpot.targetScene);
                }}
                className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-[11px] font-bold shadow cursor-pointer"
              >
                <span>Buka</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-sky-200 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onNavigate(1);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-sky-300 bg-white hover:bg-sky-50 text-sky-900 text-xs sm:text-sm font-bold shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onNavigate(3);
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-extrabold shadow-lg cursor-pointer"
            >
              <span>Lanjut ke Peta Dunia</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Fitur Utama Bright Frosted Panel matching Storyboard */}
        <div className="lg:col-span-7 rounded-3xl border border-sky-200 bg-white/95 text-slate-900 p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-sky-100">
            <h3 className="text-lg font-extrabold text-slate-950">Fitur Utama Lab Maya</h3>
            <span className="text-xs font-mono font-semibold text-sky-700">Klik fitur untuk langsung mencoba</span>
          </div>

          <div className="space-y-3">
            {GUIDE_FEATURES.map((feat) => (
              <button
                key={feat.id}
                onClick={() => {
                  sound.playClick();
                  onNavigate(feat.targetScene);
                }}
                className="w-full flex items-center justify-between gap-4 p-3.5 rounded-xl border border-sky-100 bg-sky-50/80 hover:bg-sky-100 hover:border-sky-400 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3.5">
                  <span className="text-2xl p-2 rounded-xl bg-white border border-sky-200 shrink-0 shadow-sm">
                    {feat.icon}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-950 group-hover:text-sky-700 transition-colors">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                      {feat.desc}
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-sky-600 group-hover:text-sky-800 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Practice Instruments: Compass Orientation & Slope Calculator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-sky-200 bg-white/95 text-slate-900 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-500" />
              <span>Latihan Orientasi Kompas Azimut</span>
            </h4>
            <span className="text-xs font-mono text-sky-700 font-bold tabular-nums">
              {compassBearing}° · {getDirectionLabel(compassBearing)}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-full border-2 border-sky-500 bg-sky-950 flex items-center justify-center shrink-0 shadow-inner">
              <span className="absolute top-1 text-[9px] font-bold text-amber-300">N</span>
              <span className="absolute right-1.5 text-[9px] font-bold text-sky-200">E</span>
              <span className="absolute bottom-1 text-[9px] font-bold text-sky-200">S</span>
              <span className="absolute left-1.5 text-[9px] font-bold text-sky-200">W</span>
              <div
                className="w-1 h-16 transition-transform duration-200 flex flex-col items-center"
                style={{ transform: `rotate(${compassBearing}deg)` }}
              >
                <div className="w-2 h-8 bg-rose-500 rounded-t-full" />
                <div className="w-2 h-8 bg-white rounded-b-full" />
              </div>
            </div>

            <div className="flex-1 space-y-2 text-xs">
              <label className="block text-slate-700 font-semibold">Putar Arah Jarum Azimut (0°–359°):</label>
              <input
                type="range"
                min="0"
                max="359"
                value={compassBearing}
                onChange={(e) => setCompassBearing(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <p className="text-slate-600 leading-relaxed">
                Dalam membaca peta dunia dan topografi, arah Utara (0°/360°) selalu mengacu ke bagian atas peta sebagai patokan navigasi.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-sky-200 bg-white/95 text-slate-900 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-600" />
              <span>Simulasi Kemiringan Lereng Peta Kontur</span>
            </h4>
            <span className="text-xs font-mono text-emerald-700 font-bold tabular-nums">
              {slopePercent}%
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="flex justify-between text-slate-700 font-medium mb-1">
                <span>Beda Tinggi (Δh):</span>
                <span className="font-mono font-bold text-slate-950 tabular-nums">{elevationDelta} m</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="25"
                value={elevationDelta}
                onChange={(e) => setElevationDelta(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-700 font-medium mb-1">
                <span>Jarak Datar:</span>
                <span className="font-mono font-bold text-slate-950 tabular-nums">{horizontalDistance} m</span>
              </div>
              <input
                type="range"
                min="200"
                max="3000"
                step="100"
                value={horizontalDistance}
                onChange={(e) => setHorizontalDistance(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-slate-800">
            <strong className="text-emerald-800">Klasifikasi Zonasi: </strong>
            <span className="font-semibold text-slate-900">{slopeCategory}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
