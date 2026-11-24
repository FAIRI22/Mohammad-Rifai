import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Globe, Volume2, ZoomIn, ZoomOut, RotateCcw, Tag, Compass, CheckCircle2 } from 'lucide-react';
import { GuideId, RegionInfo, GeoEnvironmentKey } from '../../types/geography';
import { REGIONS, IMAGES } from '../../data/geographyData';
import { CharacterGuide } from '../CharacterGuide';
import { sound } from '../../utils/audio';

interface Scene3MapAtlasProps {
  currentGuideId: GuideId;
  onSwitchGuide: (guideId: GuideId) => void;
  visitedRegionIds: string[];
  onVisitRegion: (regionId: string) => void;
  onGeoContextChange?: (env: GeoEnvironmentKey) => void;
}

const REGION_TO_GEO_ENV: Record<string, GeoEnvironmentKey> = {
  asia: 'mountain-himalaya',
  eropa: 'continent-europe',
  afrika: 'continent-africa',
  'amerika-utara': 'continent-north-america',
  'amerika-selatan': 'rainforest-amazon',
  australia: 'continent-oceania',
  antartika: 'continent-antarctica',
};

export const Scene3MapAtlas: React.FC<Scene3MapAtlasProps> = ({
  currentGuideId,
  onSwitchGuide,
  visitedRegionIds,
  onVisitRegion,
  onGeoContextChange,
}) => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('asia');
  const [mapViewMode, setMapViewMode] = useState<'image' | 'vector'>('image');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const dragStartRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);

  useEffect(() => {
    onGeoContextChange?.(REGION_TO_GEO_ENV[selectedRegionId] || 'ocean-global');
  }, [selectedRegionId, onGeoContextChange]);

  const selectedRegion =
    REGIONS.find((r) => r.id === selectedRegionId) || REGIONS[0];

  const handleSelectRegion = (region: RegionInfo) => {
    sound.playPin();
    setSelectedRegionId(region.id);
    onVisitRegion(region.id);
  };

  const handleZoom = (delta: number) => {
    sound.playClick();
    setZoomLevel((prev) => {
      const next = Math.min(2.4, Math.max(1, Number((prev + delta).toFixed(2))));
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetView = () => {
    sound.playClick();
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (zoomLevel <= 1) return;
    if ((e.target as HTMLElement).closest('button')) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: panOffset.x,
      panY: panOffset.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const maxPan = (zoomLevel - 1) * 260;
    setPanOffset({
      x: Math.max(-maxPan, Math.min(maxPan, dragStartRef.current.panX + dx)),
      y: Math.max(-maxPan * 0.6, Math.min(maxPan * 0.6, dragStartRef.current.panY + dy)),
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  const handleSpeakRegion = () => {
    sound.playClick();
    const narration = `Benua ${selectedRegion.name}. Luas wilayah ${selectedRegion.area}, dengan titik tertinggi ${selectedRegion.highestPoint}. Karakteristik: ${selectedRegion.description}`;
    sound.speak(narration);
  };

  const guideMessage =
    currentGuideId === 'geo'
      ? `Saat ini kita mengamati benua ${selectedRegion.name} (${selectedRegion.pinCoordinates}). Pilih lokasi lewat dropdown di kiri atas, ganti ke mode Warna Benua, atau perbesar peta dengan Zoom untuk melihat relief bumi dengan jernih!`
      : `Peta dunia ini merangkum 7 benua dan 5 samudra. Pada benua ${selectedRegion.name}, sungai terpanjangnya adalah ${selectedRegion.longestRiver}. Amati letak lintangnya terhadap Garis Khatulistiwa.`;

  return (
    <div className="space-y-8">
      {/* Header matching Storyboard Panel 04. PETA DUNIA */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-white/90 border border-sky-200 text-xs font-mono font-bold tracking-wider text-[#0369a1] uppercase shadow-xs">
            SCENE 04 · PETA DUNIA & ATLAS DIGITAL
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow-sm mt-1.5">
            Peta Interaktif 7 Benua & 5 Samudra
          </h2>
          <p className="text-sky-50 drop-shadow-sm font-medium text-sm sm:text-base mt-2">
            Gunakan pemilih lokasi, kompas arah mata angin, skala hipsometri, dan tombol zoom untuk menjelajahi benua dunia.
          </p>
        </div>

        <div className="px-3.5 py-2 rounded-xl border border-sky-300 bg-white/95 shadow-sm text-xs font-mono shrink-0">
          <span className="text-slate-600 font-semibold">Benua Dijelajahi: </span>
          <span className="text-[#0369a1] font-extrabold tabular-nums">
            {visitedRegionIds.length} / {REGIONS.length}
          </span>
        </div>
      </div>

      {/* Animated Character Guide */}
      <CharacterGuide
        currentGuideId={currentGuideId}
        onSwitchGuide={onSwitchGuide}
        message={guideMessage}
      />

      {/* Main Map + Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Map Container */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl border-2 border-sky-300 bg-white overflow-hidden shadow-xl relative">
            {/* Top Toolbar matching Storyboard: Lokasi Dropdown + Zoom + Mode */}
            <div className="p-3 bg-gradient-to-r from-[#0284c7] to-[#0369a1] border-b border-sky-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
                <label htmlFor="region-select" className="text-sky-50 font-semibold">
                  Lokasi:
                </label>
                <select
                  id="region-select"
                  value={selectedRegionId}
                  onChange={(e) => {
                    const found = REGIONS.find((r) => r.id === e.target.value);
                    if (found) handleSelectRegion(found);
                  }}
                  className="bg-white border border-sky-200 rounded-lg px-2.5 py-1 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-amber-300 cursor-pointer"
                >
                  {REGIONS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {mapViewMode === 'image' && (
                  <>
                    <button
                      onClick={() => {
                        sound.playClick();
                        setShowLabels((v) => !v);
                      }}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all cursor-pointer ${
                        showLabels
                          ? 'border-amber-300 bg-amber-400 text-slate-950'
                          : 'border-white/30 bg-white/15 text-white hover:bg-white/25'
                      }`}
                      title="Tampilkan atau sembunyikan label geografis"
                    >
                      <Tag className="w-3 h-3" />
                      <span className="hidden sm:inline">Label</span>
                    </button>

                    <div className="flex items-center gap-1 bg-white/15 border border-white/30 rounded-lg p-0.5">
                      <button
                        onClick={() => handleZoom(-0.4)}
                        disabled={zoomLevel <= 1}
                        className="p-1 rounded hover:bg-white/20 text-white disabled:opacity-40 cursor-pointer"
                        title="Perkecil Peta"
                        aria-label="Perkecil Peta"
                      >
                        <ZoomOut className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-1.5 font-mono text-[11px] text-amber-300 min-w-[38px] text-center tabular-nums font-bold">
                        {zoomLevel.toFixed(1)}x
                      </span>
                      <button
                        onClick={() => handleZoom(0.4)}
                        disabled={zoomLevel >= 2.2}
                        className="p-1 rounded hover:bg-white/20 text-white disabled:opacity-40 cursor-pointer"
                        title="Perbesar Peta"
                        aria-label="Perbesar Peta"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                      {zoomLevel > 1 && (
                        <button
                          onClick={handleResetView}
                          className="p-1 rounded hover:bg-white/20 text-amber-300 cursor-pointer"
                          title="Reset Posisi Peta"
                          aria-label="Reset Posisi Peta"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </>
                )}

                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-white/15 border border-white/30">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setMapViewMode('image');
                    }}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                      mapViewMode === 'image'
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'text-sky-50 hover:text-white'
                    }`}
                  >
                    Peta Fisik Jernih
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setMapViewMode('vector');
                      handleResetView();
                    }}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                      mapViewMode === 'vector'
                        ? 'bg-amber-400 text-slate-950 shadow-sm'
                        : 'text-sky-50 hover:text-white'
                    }`}
                  >
                    Warna Benua
                  </button>
                </div>
              </div>
            </div>

            {/* Map Canvas Stage */}
            <div
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`relative aspect-[16/9] w-full bg-[#38bdf8]/30 flex items-center justify-center overflow-hidden select-none ${
                zoomLevel > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : ''
              }`}
            >
              {/* Crisp Compass Rose Overlay */}
              <div className="absolute top-3 right-3 z-30 pointer-events-none w-12 h-12 rounded-full bg-[#0369a1]/90 border-2 border-amber-300 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <span className="absolute top-0.5 text-[8px] font-bold text-amber-300">N</span>
                <span className="absolute right-1 text-[8px] font-bold text-white">E</span>
                <span className="absolute bottom-0.5 text-[8px] font-bold text-white">S</span>
                <span className="absolute left-1 text-[8px] font-bold text-white">W</span>
                <Compass className="w-5 h-5 text-amber-300" />
              </div>

              {mapViewMode === 'image' ? (
                <div
                  className="relative w-full h-full transition-transform duration-200 ease-out origin-center"
                  style={{
                    transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                  }}
                >
                  <img
                    src={IMAGES.worldMapDetailed}
                    alt="Peta Fisik Geografis Dunia Resolusi Tinggi"
                    referrerPolicy="no-referrer"
                    draggable={false}
                    className="w-full h-full object-cover object-center"
                  />

                  {showLabels && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-x-0 top-[53.5%] border-t border-dashed border-amber-300/60 flex justify-start pl-3">
                        <span className="-mt-4 px-1.5 py-0.5 rounded bg-slate-950/80 text-[9px] font-mono text-amber-300 border border-amber-300/40">
                          0° Garis Khatulistiwa
                        </span>
                      </div>

                      <span className="absolute left-[11%] top-[53%] text-[10px] font-semibold tracking-widest uppercase text-sky-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                        Samudra Pasifik
                      </span>
                      <span className="absolute left-[38%] top-[44%] text-[10px] font-semibold tracking-widest uppercase text-sky-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                        Samudra Atlantik
                      </span>
                      <span className="absolute left-[63%] top-[61%] text-[10px] font-semibold tracking-widest uppercase text-sky-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                        Samudra Hindia
                      </span>
                    </div>
                  )}

                  {REGIONS.map((region) => {
                    const isSelected = region.id === selectedRegionId;
                    const isVisited = visitedRegionIds.includes(region.id);
                    return (
                      <button
                        key={region.id}
                        onClick={() => handleSelectRegion(region)}
                        style={{
                          left: `${region.mapPin.x}%`,
                          top: `${region.mapPin.y}%`,
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20 focus:outline-none"
                        title={`Klik untuk eksplorasi ${region.name}`}
                      >
                        <span
                          className={`absolute -inset-2 rounded-full transition-all ${
                            isSelected
                              ? 'bg-amber-400/50 animate-ping'
                              : 'group-hover:bg-emerald-400/30'
                          }`}
                        />
                        <div
                          className={`relative flex items-center justify-center rounded-full transition-all ${
                            isSelected
                              ? 'w-7 h-7 bg-amber-400 text-slate-950 shadow-lg ring-4 ring-white'
                              : isVisited
                              ? 'w-5 h-5 bg-emerald-500 text-white shadow-md ring-2 ring-white'
                              : 'w-5 h-5 bg-sky-500 text-white hover:bg-amber-400 hover:text-slate-950 shadow-md ring-2 ring-white'
                          }`}
                        >
                          {isVisited && !isSelected ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'stroke-[2.5]' : ''}`} />
                          )}
                        </div>

                        <span
                          className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold whitespace-nowrap shadow-lg pointer-events-none transition-all ${
                            isSelected
                              ? 'bg-amber-300 text-slate-950 opacity-100 ring-1 ring-slate-900'
                              : showLabels
                              ? 'bg-white/95 text-slate-900 border border-sky-300 opacity-95 group-hover:bg-amber-300'
                              : 'bg-slate-900/90 text-white opacity-0 group-hover:opacity-100'
                          }`}
                        >
                          {region.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* Color-Coded Continents Vector View matching Bright Ocean Scene 04 */
                <div className="w-full h-full p-4 flex items-center justify-center bg-gradient-to-b from-[#0284c7] to-[#0ea5e9]">
                  <svg
                    viewBox="0 0 700 360"
                    className="w-full h-full max-h-[400px] drop-shadow-2xl"
                    role="img"
                    aria-label="Peta Warna Benua Dunia"
                  >
                    <defs>
                      <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="0.8" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    <line x1="0" y1="185" x2="700" y2="185" stroke="rgba(253, 224, 71, 0.65)" strokeDasharray="4 4" strokeWidth="1" />
                    <text x="12" y="179" className="fill-amber-200 text-[8px] font-mono font-bold">0° KHATULISTIWA</text>

                    {REGIONS.filter((r) => r.svgPath).map((reg) => {
                      const isSelected = reg.id === selectedRegionId;
                      return (
                        <path
                          key={reg.id}
                          d={reg.svgPath}
                          onClick={() => handleSelectRegion(reg)}
                          style={{
                            fill: reg.storyboardColor,
                            opacity: isSelected ? 1 : 0.92,
                            stroke: isSelected ? '#ffffff' : 'rgba(15, 23, 42, 0.45)',
                            strokeWidth: isSelected ? 2.5 : 1,
                            filter: isSelected ? `drop-shadow(0 0 12px ${reg.storyboardColor})` : 'none',
                          }}
                          className="transition-all duration-300 cursor-pointer hover:opacity-100"
                        />
                      );
                    })}

                    <text x="118" y="96" className="fill-slate-950 text-[10px] font-extrabold tracking-wider pointer-events-none">AMERIKA UTARA</text>
                    <text x="194" y="242" className="fill-slate-950 text-[9px] font-extrabold tracking-wider pointer-events-none">AMERIKA SELATAN</text>
                    <text x="352" y="98" className="fill-white text-[10px] font-extrabold tracking-wider pointer-events-none">EROPA</text>
                    <text x="355" y="182" className="fill-slate-950 text-[10px] font-extrabold tracking-wider pointer-events-none">AFRIKA</text>
                    <text x="488" y="106" className="fill-slate-950 text-[11px] font-extrabold tracking-wider pointer-events-none">ASIA</text>
                    <text x="546" y="256" className="fill-slate-950 text-[10px] font-extrabold tracking-wider pointer-events-none">OSEANIA</text>
                    <text x="325" y="342" className="fill-slate-900 text-[10px] font-extrabold tracking-wider pointer-events-none">ANTARTIKA</text>
                  </svg>
                </div>
              )}

              {/* Bottom-Left Compact Color Legend */}
              <div className="hidden sm:flex flex-col gap-1 absolute bottom-3 left-3 z-20 p-2.5 rounded-xl bg-white/95 border border-sky-200 backdrop-blur-sm text-[10px] shadow-md">
                {REGIONS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleSelectRegion(r)}
                    className={`flex items-center gap-2 text-left hover:text-sky-700 cursor-pointer ${
                      r.id === selectedRegionId ? 'text-[#0369a1] font-extrabold' : 'text-slate-700 font-medium'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 border border-black/15"
                      style={{ backgroundColor: mapViewMode === 'vector' ? r.storyboardColor : r.hypsometricColor }}
                    />
                    <span>{r.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Summary Strip matching Storyboard Scene 04 */}
            <div className="p-3 bg-sky-50 border-t border-sky-200 text-xs text-slate-900 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Globe className="w-5 h-5 text-[#0284c7] shrink-0" />
                <div>
                  <span className="font-extrabold text-slate-950 block leading-tight">
                    Dunia · {selectedRegion.name}
                  </span>
                  <span className="text-sky-700 font-mono font-semibold text-[11px]">
                    Benua: 7 | Samudra: 5
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[#0369a1] font-bold text-[11px] hidden md:inline">
                  {zoomLevel > 1
                    ? 'Geser peta dengan mouse/jari'
                    : '5 Samudra: Pasifik, Atlantik, Hindia, Arktik, Selatan'}
                </span>
                <div className="w-20 h-11 rounded-lg overflow-hidden border border-sky-300 bg-[#0284c7] p-0.5 shrink-0 hidden sm:block">
                  <svg viewBox="0 0 700 360" className="w-full h-full">
                    {REGIONS.map((reg) => (
                      <path
                        key={reg.id}
                        d={reg.svgPath}
                        fill={reg.id === selectedRegionId ? '#facc15' : '#e0f2fe'}
                        opacity={reg.id === selectedRegionId ? 1 : 0.75}
                      />
                    ))}
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Region Quick Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {REGIONS.map((r) => {
              const isSelected = r.id === selectedRegionId;
              const isVisited = visitedRegionIds.includes(r.id);
              return (
                <button
                  key={r.id}
                  onClick={() => handleSelectRegion(r)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 truncate ${
                    isSelected
                      ? 'border-amber-400 bg-amber-400 text-slate-950 shadow-md'
                      : 'border-sky-200/40 bg-white/90 text-slate-900 hover:bg-white'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm border border-black/15"
                    style={{ backgroundColor: mapViewMode === 'vector' ? r.storyboardColor : r.hypsometricColor }}
                  />
                  <span className="truncate flex-1 text-left">{r.name}</span>
                  {isVisited && (
                    <CheckCircle2
                      className={`w-3 h-3 shrink-0 ${isSelected ? 'text-slate-900' : 'text-emerald-600'}`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Region Information Inspector Card (Bright Daylight Card) */}
        <div className="lg:col-span-4 rounded-2xl border border-sky-200 bg-white/95 text-slate-900 p-5 sm:p-6 shadow-2xl space-y-5">
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-sky-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-3 h-3 rounded-full shadow-sm border border-black/15"
                  style={{ backgroundColor: selectedRegion.hypsometricColor }}
                />
                <span className="text-xs font-mono text-sky-700 tracking-wider uppercase font-bold">
                  Kartu Informasi Benua
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-950">
                {selectedRegion.name}
              </h3>
              <p className="text-xs text-emerald-700 font-semibold">{selectedRegion.englishName}</p>
            </div>

            <button
              onClick={handleSpeakRegion}
              title="Dengarkan pembacaan fakta benua"
              className="p-2 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-800 border border-sky-300 cursor-pointer shadow-sm"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-xs">
            <span className="text-[10px] font-mono text-sky-800 font-bold block uppercase">Zonasi Relief & Elevasi:</span>
            <span className="font-semibold text-slate-900 mt-0.5 block">{selectedRegion.elevationZone}</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 font-medium">Luas Wilayah:</span>
              <span className="font-mono font-bold text-slate-950 tabular-nums">{selectedRegion.area}</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 font-medium">Estimasi Populasi:</span>
              <span className="font-bold text-amber-700">{selectedRegion.population}</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 font-medium">Titik Tertinggi:</span>
              <span className="font-bold text-emerald-800">{selectedRegion.highestPoint}</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 font-medium">Sungai Terpanjang:</span>
              <span className="font-bold text-sky-800">{selectedRegion.longestRiver}</span>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-800 block mb-1">
              GAMBARAN FISIK & IKLIM:
            </span>
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed bg-sky-50/70 p-3 rounded-xl border border-sky-100">
              {selectedRegion.description}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-sky-800 block">
              FAKTA GEOGRAFIS UNIK:
            </span>
            <ul className="space-y-2 text-xs text-slate-700">
              {selectedRegion.geographicFacts.map((fact, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold shrink-0 mt-0.5">✦</span>
                  <span className="leading-snug">{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
