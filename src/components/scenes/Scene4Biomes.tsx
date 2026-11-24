import React, { useState, useEffect } from 'react';
import { Sliders, Sparkles, Mountain, Sun } from 'lucide-react';
import { GuideId, GeoEnvironmentKey } from '../../types/geography';
import { LANDFORMS, CLIMATE_ZONES, IMAGES } from '../../data/geographyData';
import { CharacterGuide } from '../CharacterGuide';
import { AnimatedAnimalCharacter } from '../AnimatedAnimalCharacter';
import { sound } from '../../utils/audio';

interface Scene4BiomesProps {
  currentGuideId: GuideId;
  onSwitchGuide: (guideId: GuideId) => void;
  onMarkExplored: () => void;
  onGeoContextChange?: (env: GeoEnvironmentKey) => void;
}

const LANDFORM_TO_ENV: Record<string, GeoEnvironmentKey> = {
  pegunungan: 'mountain-himalaya',
  gurun: 'desert-sahara',
  'hutan-hujan': 'rainforest-amazon',
  dataran: 'plains-river',
  sungai: 'plains-river',
  pesisir: 'ocean-global',
};

const CLIMATE_TO_ENV: Record<string, GeoEnvironmentKey> = {
  tropis: 'rainforest-amazon',
  sedang: 'continent-europe',
  dingin: 'continent-antarctica',
  subtropis: 'coast-tokyo',
};

export const Scene4Biomes: React.FC<Scene4BiomesProps> = ({
  currentGuideId,
  onSwitchGuide,
  onMarkExplored,
  onGeoContextChange,
}) => {
  const [selectedLandformId, setSelectedLandformId] = useState<string>('pegunungan');
  const [selectedClimateId, setSelectedClimateId] = useState<string>('tropis');
  const [activeEnvSource, setActiveEnvSource] = useState<'landform' | 'climate' | 'whittaker'>('landform');

  // Interactive Whittaker Climate Parameter Simulation
  const [simTemp, setSimTemp] = useState<number>(27);
  const [simRain, setSimRain] = useState<number>(2500);

  useEffect(() => {
    if (!onGeoContextChange) return;
    if (activeEnvSource === 'climate') {
      onGeoContextChange(CLIMATE_TO_ENV[selectedClimateId] || 'rainforest-amazon');
    } else if (activeEnvSource === 'whittaker') {
      if (simTemp <= 0) {
        onGeoContextChange('continent-antarctica');
      } else if (simTemp < 10 && simRain < 400) {
        onGeoContextChange('mountain-himalaya');
      } else if (simTemp < 10) {
        onGeoContextChange('continent-europe');
      } else if (simRain < 300) {
        onGeoContextChange('desert-sahara');
      } else if (simRain < 1000) {
        onGeoContextChange(simTemp > 20 ? 'continent-africa' : 'plains-river');
      } else if (simTemp >= 22 && simRain >= 2000) {
        onGeoContextChange('rainforest-amazon');
      } else {
        onGeoContextChange('continent-europe');
      }
    } else {
      onGeoContextChange(LANDFORM_TO_ENV[selectedLandformId] || 'mountain-himalaya');
    }
  }, [activeEnvSource, selectedLandformId, selectedClimateId, simTemp, simRain, onGeoContextChange]);

  const activeLandform = LANDFORMS.find((l) => l.id === selectedLandformId) || LANDFORMS[0];
  const activeClimate = CLIMATE_ZONES.find((c) => c.id === selectedClimateId) || CLIMATE_ZONES[0];

  const getPredictedBiome = (temp: number, rain: number) => {
    if (temp <= 0) {
      return {
        name: 'Tundra Kutub & Lapisan Es Abadi',
        tag: 'Iklim Dingin Ekstrem',
        desc: 'Vegetasi terbatas pada lumut kerak karena tanah permafrost membeku sepanjang tahun.',
        icon: '❄️',
      };
    }
    if (temp < 10) {
      if (rain < 400) {
        return {
          name: 'Tundra Alpin Pegunungan',
          tag: 'Zona Elevasi Tinggi',
          desc: 'Lereng pegunungan tinggi dengan angin kencang dan musim tumbuh tanaman amat singkat.',
          icon: '🏔️',
        };
      }
      return {
        name: 'Hutan Taiga / Konifer Boreal',
        tag: 'Iklim Dingin Lembap',
        desc: 'Didominasi pohon berdaun jarum seperti pinus, cemara, dan spruce yang tahan salju.',
        icon: '🌲',
      };
    }
    if (rain < 300) {
      return {
        name: 'Gurun Kering (Arid Desert)',
        tag: 'Presipitasi Minimal',
        desc: 'Penguapan melampaui curah hujan. Hanya tumbuhan penyimpan air seperti kaktus yang bertahan.',
        icon: '🏜️',
      };
    }
    if (rain < 1000) {
      return temp > 20
        ? {
            name: 'Sabana Tropis & Padang Rumput',
            tag: 'Iklim Hangat Musiman',
            desc: 'Padang rumput luas dengan pepohonan akasia yang memiliki musim kemarau jelas.',
            icon: '🌾',
          }
        : {
            name: 'Stepa & Padang Rumput Iklim Sedang',
            tag: 'Zona Sub-Lembap',
            desc: 'Lahan padang rumput subur yang banyak dimanfaatkan untuk pertanian gandum dan peternakan.',
            icon: '🌱',
          };
    }
    if (temp >= 22 && rain >= 2000) {
      return {
        name: 'Hutan Hujan Tropis Khatulistiwa',
        tag: 'Biodiversitas Maksimal',
        desc: 'Suhu hangat (±27°C) dan hujan tinggi sepanjang tahun menumbuhkan kanopi rimba berlapis.',
        icon: '🌳',
      };
    }
    return {
      name: 'Hutan Gugur Iklim Sedang / Subtropis',
      tag: 'Zona Empat Musim',
      desc: 'Pepohonan berdaun lebar yang menggugurkan daunnya pada musim gugur untuk menghemat air.',
      icon: '🍁',
    };
  };

  const predicted = getPredictedBiome(simTemp, simRain);

  const guideMessage =
    currentGuideId === 'geo'
      ? `Amati 6 bentang alam utama dunia — Pegunungan, Gurun, Hutan Hujan, Dataran, Sungai, dan Pesisir — serta 4 zona iklim dunia di bawah! Klik setiap kartu untuk menelaah proses geologis dan adaptasinya.`
      : `Suhu rata-rata (dari ±0°C di wilayah dingin hingga ±27°C di daerah tropis) dan curah hujan bekerja sama membentuk bentang alam di permukaan Bumi. Coba uji kombinasinya di Simulator Whittaker!`;

  return (
    <div className="space-y-8">
      {/* Header matching Storyboard Panel 05. BENTANG ALAM & IKLIM */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-white/90 border border-sky-200 text-xs font-mono font-bold tracking-wider text-[#0369a1] uppercase shadow-xs">
          SCENE 05 · BENTANG ALAM & IKLIM DUNIA
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow-sm mt-1.5">
          Bentang Alam & Zona Iklim Bumi
        </h2>
        <p className="text-sky-50 drop-shadow-sm font-medium text-sm sm:text-base mt-2">
          Pelajari enam bentuk bentang alam utama dan empat zona iklim dunia beserta pengaruhnya terhadap kehidupan.
        </p>
      </div>

      {/* Realistic Character Guide */}
      <CharacterGuide
        currentGuideId={currentGuideId}
        onSwitchGuide={onSwitchGuide}
        message={guideMessage}
      />

      {/* Panoramic Natural Showcase */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-sky-300 bg-white shadow-xl">
        <div className="aspect-[21/9] sm:aspect-[24/9] w-full relative">
          <img
            src={IMAGES.biomesShowcase}
            alt="Panorama Bentang Alam Bumi"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0369a1]/65 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 sm:left-6 flex items-center gap-2 text-xs font-bold text-slate-900 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-sky-200 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Spektrum Bentang Alam: Pegunungan, Gurun Pasir, Hutan Hujan Tropis, Dataran, Sungai & Pesisir</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: BENTANG ALAM DUNIA (6 Scenic Cards matching Storyboard) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-extrabold text-white drop-shadow-sm flex items-center gap-2">
            <Mountain className="w-5 h-5 text-amber-300" />
            <span>Bentang Alam Dunia (6 Tipe Utama)</span>
          </h3>
          <span className="text-xs font-semibold text-sky-50 drop-shadow-sm hidden sm:inline">Klik salah satu kartu untuk melihat analisis</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {LANDFORMS.map((lf) => {
            const isSelected = lf.id === selectedLandformId;
            return (
              <button
                key={lf.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedLandformId(lf.id);
                  setActiveEnvSource('landform');
                  onMarkExplored();
                }}
                className={`rounded-2xl border-2 overflow-hidden text-center transition-all cursor-pointer flex flex-col shadow-md ${
                  isSelected
                    ? 'border-amber-400 bg-amber-50 ring-2 ring-amber-400/60 shadow-xl scale-[1.02]'
                    : 'border-sky-200 bg-white hover:border-sky-400 text-slate-900'
                }`}
              >
                {/* Crisp Photorealistic Thumbnail per Landform */}
                <div className="w-full aspect-[16/10] relative overflow-hidden bg-sky-100">
                  <img
                    src={lf.imageUrl}
                    alt={`Bentang alam ${lf.name}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                  <span className="absolute top-1.5 right-1.5 text-sm bg-white/85 backdrop-blur-xs rounded-md px-1 py-0.5 shadow-sm">
                    {lf.icon}
                  </span>
                </div>

                <div className="p-2.5 flex flex-col items-center gap-0.5 bg-white/95 text-slate-900">
                  <span className="text-xs sm:text-sm font-extrabold text-slate-950">{lf.name}</span>
                  <span className="text-[10px] font-mono font-semibold text-sky-700 line-clamp-1">
                    {lf.shortTag}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Landform Inspector Panel */}
        <div className="rounded-2xl border border-sky-200 bg-white/95 text-slate-900 p-6 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-sky-100">
            <div className="flex items-center gap-3">
              <img
                src={activeLandform.imageUrl}
                alt={activeLandform.name}
                referrerPolicy="no-referrer"
                className="w-16 h-11 rounded-xl object-cover border border-sky-200 shadow-sm shrink-0"
              />
              <div>
                <span className="text-[11px] font-mono text-sky-700 uppercase font-bold">
                  Profil Bentang Alam
                </span>
                <h4 className="text-xl font-extrabold text-slate-950">{activeLandform.name}</h4>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
                Elevasi: {activeLandform.elevation}
              </span>
              <span className="px-3 py-1 rounded-lg bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
                Proses: {activeLandform.process}
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-800 leading-relaxed">{activeLandform.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-100 space-y-1">
              <strong className="text-sky-800 block">Contoh di Dunia:</strong>
              <p className="text-slate-700 leading-relaxed">{activeLandform.examplesGlobal}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100 space-y-1">
              <strong className="text-emerald-800 block">Contoh di Indonesia:</strong>
              <p className="text-slate-700 leading-relaxed">{activeLandform.examplesIndonesia}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
              <strong className="text-amber-900 block">Aktivitas Manusia:</strong>
              <p className="text-slate-700 leading-relaxed">{activeLandform.humanActivity}</p>
            </div>
          </div>

          {/* Animated Biome Wildlife Mascot Bar */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-sky-50 via-white to-emerald-50 border border-sky-200 flex items-center gap-4 shadow-xs">
            <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-amber-400 bg-white shrink-0 shadow-sm">
              <AnimatedAnimalCharacter
                animalId={activeLandform.wildlife.animalId}
                onClick={() => {
                  sound.playClick();
                  sound.speak(`${activeLandform.wildlife.name}. ${activeLandform.wildlife.adaptationFact}`);
                }}
                title={`Klik ${activeLandform.wildlife.name} untuk dengar adaptasi bioma!`}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-700">
                  Satwa Adaptasi Bioma (Animasi) · {activeLandform.wildlife.species}
                </span>
                <button
                  onClick={() => {
                    sound.playClick();
                    sound.speak(`${activeLandform.wildlife.name}. ${activeLandform.wildlife.adaptationFact}`);
                  }}
                  className="text-[11px] font-bold text-sky-700 hover:text-sky-900 underline cursor-pointer"
                >
                  Klik Hewan / Dengar Fakta
                </button>
              </div>
              <h5 className="text-sm font-extrabold text-slate-900 mt-0.5">
                {activeLandform.wildlife.name}
              </h5>
              <p className="text-xs text-slate-700 leading-relaxed mt-0.5">
                {activeLandform.wildlife.adaptationFact}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: IKLIM DUNIA (4 Cards matching Storyboard) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-extrabold text-white drop-shadow-sm flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-300" />
            <span>Iklim Dunia (4 Zona Utama)</span>
          </h3>
          <span className="text-xs font-semibold text-sky-50 drop-shadow-sm hidden sm:inline">Klasifikasi Iklim Matahari & Suhu Rata-rata</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CLIMATE_ZONES.map((cz) => {
            const isSelected = cz.id === selectedClimateId;
            return (
              <button
                key={cz.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedClimateId(cz.id);
                  setActiveEnvSource('climate');
                  onMarkExplored();
                }}
                className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                  isSelected
                    ? 'border-amber-400 bg-gradient-to-b from-[#0284c7] to-[#0d9488] text-white ring-2 ring-amber-300/70 shadow-xl'
                    : 'border-sky-200 bg-white/95 hover:bg-white text-slate-900 shadow-md'
                }`}
              >
                <span className="text-3xl">{cz.icon}</span>
                <div>
                  <h4 className={`text-base font-extrabold ${isSelected ? 'text-white' : 'text-slate-950'}`}>
                    {cz.name}
                  </h4>
                  <span
                    className={`text-xs font-mono font-bold tabular-nums ${
                      isSelected ? 'text-amber-300' : 'text-sky-700'
                    }`}
                  >
                    ({cz.avgTemp})
                  </span>
                </div>
                <span className={`text-[11px] line-clamp-1 ${isSelected ? 'text-sky-100' : 'text-slate-600'}`}>
                  {cz.latitudeBand}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Climate Detail Panel */}
        <div className="rounded-2xl border border-sky-200 bg-white/95 text-slate-900 p-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs shadow-lg">
          <div>
            <span className="text-amber-700 font-bold block mb-1">
              Zona Lintang ({activeClimate.name} · {activeClimate.avgTemp}):
            </span>
            <p className="text-slate-800 font-medium">{activeClimate.latitudeBand}</p>
            <p className="text-sky-700 font-mono font-semibold mt-1">Hujan: {activeClimate.rainfall}</p>
          </div>
          <div>
            <span className="text-emerald-800 font-bold block mb-1">Ciri Iklim & Musim:</span>
            <p className="text-slate-700 leading-relaxed">{activeClimate.characteristics}</p>
          </div>
          <div>
            <span className="text-sky-800 font-bold block mb-1">Vegetasi Alami Dominan:</span>
            <p className="text-slate-700 leading-relaxed">{activeClimate.vegetation}</p>
          </div>
        </div>
      </div>

      {/* SECTION 3: Interactive Whittaker Biome Simulator */}
      <div className="rounded-2xl border border-sky-200 bg-white/95 text-slate-900 p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-700 uppercase font-bold">
              <Sliders className="w-3.5 h-3.5" />
              <span>Simulator Iklim & Bioma Whittaker</span>
            </div>
            <h4 className="text-lg font-extrabold text-slate-950 mt-0.5">
              Uji Coba Suhu & Curah Hujan terhadap Pembentukan Bioma
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-700 font-semibold">Suhu Rata-Rata Tahunan:</span>
              <span className="font-mono text-base font-bold text-amber-700 tabular-nums">{simTemp}°C</span>
            </div>
            <input
              type="range"
              min="-15"
              max="40"
              step="1"
              value={simTemp}
              onChange={(e) => {
                setSimTemp(Number(e.target.value));
                setActiveEnvSource('whittaker');
                onMarkExplored();
              }}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-600 font-mono">
              <span>-15°C (Dingin)</span>
              <span>15°C (Sedang)</span>
              <span>40°C (Tropis Panas)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-700 font-semibold">Curah Hujan Tahunan:</span>
              <span className="font-mono text-base font-bold text-sky-700 tabular-nums">{simRain} mm/thn</span>
            </div>
            <input
              type="range"
              min="50"
              max="4000"
              step="50"
              value={simRain}
              onChange={(e) => {
                setSimRain(Number(e.target.value));
                setActiveEnvSource('whittaker');
                onMarkExplored();
              }}
              className="w-full accent-sky-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-600 font-mono">
              <span>50 mm (Gurun)</span>
              <span>1.500 mm (Sedang)</span>
              <span>4.000 mm (Tropis Basah)</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#0d9488] text-white border border-sky-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{predicted.icon}</span>
            <div>
              <span className="text-[11px] font-mono text-amber-300 uppercase tracking-wider font-bold">
                {predicted.tag}
              </span>
              <h5 className="text-base font-extrabold text-white">{predicted.name}</h5>
              <p className="text-xs text-sky-100 mt-0.5">{predicted.desc}</p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-lg bg-amber-400 text-xs text-slate-950 font-extrabold whitespace-nowrap self-start sm:self-center">
            Hasil Simulasi Langsung
          </span>
        </div>
      </div>
    </div>
  );
};
