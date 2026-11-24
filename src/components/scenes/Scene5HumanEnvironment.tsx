import React, { useState, useEffect } from 'react';
import { Users, Droplets, Trees, BarChart3, PieChart } from 'lucide-react';
import { GuideId, GeoEnvironmentKey } from '../../types/geography';
import { TOP_COUNTRIES_POP, RESOURCE_CATEGORIES, REGIONS } from '../../data/geographyData';
import { CharacterGuide } from '../CharacterGuide';
import { sound } from '../../utils/audio';

interface Scene5HumanEnvironmentProps {
  currentGuideId: GuideId;
  onSwitchGuide: (guideId: GuideId) => void;
  onMarkExplored: () => void;
  onGeoContextChange?: (env: GeoEnvironmentKey) => void;
}

const RESOURCE_TO_ENV: Record<string, GeoEnvironmentKey> = {
  hutan: 'rainforest-amazon',
  air: 'ocean-global',
  mineral: 'mountain-himalaya',
  pangan: 'plains-river',
};

const COUNTRY_TO_ENV: Record<string, GeoEnvironmentKey> = {
  Indonesia: 'continent-oceania',
  India: 'mountain-himalaya',
  Tiongkok: 'coast-tokyo',
  'Amerika Serikat': 'continent-north-america',
  Pakistan: 'mountain-himalaya',
  Nigeria: 'continent-africa',
  Brasil: 'rainforest-amazon',
  Bangladesh: 'plains-river',
  Rusia: 'continent-europe',
  Meksiko: 'continent-north-america',
};

export const Scene5HumanEnvironment: React.FC<Scene5HumanEnvironmentProps> = ({
  currentGuideId,
  onSwitchGuide,
  onMarkExplored,
  onGeoContextChange,
}) => {
  const [showAllTop10, setShowAllTop10] = useState<boolean>(false);
  const [selectedCountryRank, setSelectedCountryRank] = useState<number>(4); // Default highlight Indonesia (#4)
  const [selectedResourceId, setSelectedResourceId] = useState<'hutan' | 'air' | 'mineral' | 'pangan'>('hutan');
  const [focusSource, setFocusSource] = useState<'resource' | 'country'>('resource');

  useEffect(() => {
    if (!onGeoContextChange) return;
    if (focusSource === 'country') {
      const country = TOP_COUNTRIES_POP.find((c) => c.rank === selectedCountryRank);
      if (country) {
        onGeoContextChange(COUNTRY_TO_ENV[country.name] || 'plains-river');
        return;
      }
    }
    onGeoContextChange(RESOURCE_TO_ENV[selectedResourceId] || 'rainforest-amazon');
  }, [focusSource, selectedCountryRank, selectedResourceId, onGeoContextChange]);

  // Interactive DAS Forest Cover vs Flood Risk
  const [forestCover, setForestCover] = useState<number>(40);
  const [rainIntensity, setRainIntensity] = useState<'sedang' | 'lebat' | 'ekstrem'>('lebat');

  const rainFactor = rainIntensity === 'sedang' ? 1 : rainIntensity === 'lebat' ? 1.6 : 2.4;
  const runoffRate = Math.max(10, Math.round((100 - forestCover) * 1.8 * rainFactor));
  const infiltrationRate = Math.round(forestCover * 0.95);

  const floodRiskLevel =
    runoffRate > 180
      ? { label: 'Risiko Banjir Tinggi', color: 'text-red-400', badge: 'bg-red-950/80 border-red-700' }
      : runoffRate > 90
      ? { label: 'Waspada Genangan', color: 'text-amber-400', badge: 'bg-amber-950/80 border-amber-700' }
      : { label: 'Resapan Aman', color: 'text-emerald-400', badge: 'bg-emerald-950/80 border-emerald-700' };

  const visibleCountries = showAllTop10 ? TOP_COUNTRIES_POP : TOP_COUNTRIES_POP.slice(0, 5);
  const activeCountry = TOP_COUNTRIES_POP.find((c) => c.rank === selectedCountryRank) || TOP_COUNTRIES_POP[3];
  const activeResource = RESOURCE_CATEGORIES.find((r) => r.id === selectedResourceId) || RESOURCE_CATEGORIES[0];

  // Donut Chart SVG circumference math (r=42 -> C ≈ 263.89)
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const goodLen = (activeResource.goodPct / 100) * circumference;
  const modLen = (activeResource.moderatePct / 100) * circumference;
  const critLen = (activeResource.criticalPct / 100) * circumference;

  const populationDensityColor = (regionId: string) => {
    if (regionId === 'asia') return '#dc2626'; // Padat sangat tinggi (Merah)
    if (regionId === 'eropa' || regionId === 'afrika') return '#f97316'; // Padat sedang-tinggi (Oranye)
    if (regionId === 'amerika-utara' || regionId === 'amerika-selatan') return '#facc15'; // Sedang (Kuning)
    if (regionId === 'australia') return '#fde047'; // Jarang (Kuning Muda)
    return '#cbd5e1'; // Antartika (0 tetap)
  };

  const guideMessage =
    currentGuideId === 'geo'
      ? `Lebih dari separuh penduduk Bumi tinggal di Benua Asia (India, Tiongkok, Indonesia, Pakistan). Klik 4 jenis sumber daya di bawah — Hutan, Air, Mineral, dan Pangan — untuk memantau kondisi lingkungannya!`
      : `Perhatikan grafik Kondisi Lingkungan di kanan bawah. Tekanan jumlah penduduk menuntut pengelolaan sumber daya alam yang bijak agar tidak bergeser ke zona kritis.`;

  return (
    <div className="space-y-8">
      {/* Header matching Storyboard Panel 06. PENDUDUK & LINGKUNGAN */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-white/90 border border-sky-200 text-xs font-mono font-bold tracking-wider text-[#0369a1] uppercase shadow-xs">
          SCENE 06 · PENDUDUK & SUMBER DAYA LINGKUNGAN
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow-sm mt-1.5">
          Dinamika Penduduk & Kondisi Lingkungan
        </h2>
        <p className="text-sky-50 drop-shadow-sm font-medium text-sm sm:text-base mt-2">
          Analisis persebaran penduduk dunia, 10 negara berpenduduk terbanyak, serta status daya dukung sumber daya alam.
        </p>
      </div>

      {/* Realistic Character Guide */}
      <CharacterGuide
        currentGuideId={currentGuideId}
        onSwitchGuide={onSwitchGuide}
        message={guideMessage}
      />

      {/* TOP ROW: Persebaran Penduduk Map + 10 Negara Terpadat Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Top-Left: Persebaran Penduduk Choropleth Heatmap */}
        <div className="lg:col-span-6 rounded-2xl border border-sky-200 bg-white/95 text-slate-900 p-5 flex flex-col justify-between space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-950 flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-700" />
              <span>Persebaran Penduduk Dunia</span>
            </h3>
            <span className="text-[11px] font-mono font-semibold text-sky-700">± 8,1 Milyar Jiwa Global</span>
          </div>

          <div className="rounded-xl bg-[#eaf4fb] border border-sky-200 p-3">
            <svg viewBox="0 0 700 360" className="w-full h-52 sm:h-60" role="img" aria-label="Peta Kepadatan Penduduk Dunia">
              {REGIONS.filter((r) => r.svgPath).map((reg) => (
                <path
                  key={reg.id}
                  d={reg.svgPath}
                  fill={populationDensityColor(reg.id)}
                  stroke="rgba(15,23,42,0.35)"
                  strokeWidth="1"
                  className="transition-opacity hover:opacity-85"
                />
              ))}
              {/* Density hotspots */}
              <circle cx="515" cy="115" r="16" fill="#b91c1c" opacity="0.65" />
              <circle cx="475" cy="126" r="13" fill="#b91c1c" opacity="0.65" />
              <circle cx="545" cy="166" r="10" fill="#dc2626" opacity="0.7" />
              <circle cx="368" cy="88" r="10" fill="#ea580c" opacity="0.65" />
              <circle cx="176" cy="106" r="9" fill="#ea580c" opacity="0.55" />
            </svg>

            <div className="mt-2 pt-2 border-t border-slate-300 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-800 font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#dc2626]" /> Sangat Padat (Asia)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#f97316]" /> Padat (Eropa & Afrika)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#facc15]" /> Sedang (Amerika)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#fde047]" /> Jarang (Oseania)
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed">
            Lebih dari 60% populasi dunia bermukim di dataran rendah subur dan lembah sungai besar Asia Selatan, Asia Timur, dan Asia Tenggara.
          </p>
        </div>

        {/* Top-Right: 10 Negara Terpadat Horizontal Bar Chart */}
        <div className="lg:col-span-6 rounded-2xl border border-sky-200 bg-white/95 text-slate-900 p-5 flex flex-col justify-between space-y-4 shadow-xl">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-extrabold text-slate-950 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-sky-600" />
              <span>10 Negara Terpadat</span>
            </h3>
            <button
              onClick={() => {
                sound.playClick();
                setShowAllTop10((v) => !v);
                onMarkExplored();
              }}
              className="px-2.5 py-1 rounded-lg border border-sky-300 bg-sky-50 hover:bg-sky-100 text-[11px] font-bold text-sky-800 cursor-pointer"
            >
              {showAllTop10 ? 'Tampilkan Top 5' : 'Lihat Semua (1–10)'}
            </button>
          </div>

          <div className="space-y-2.5">
            {visibleCountries.map((country) => {
              const widthPct = Math.round((country.populationMillions / 1450) * 100);
              const isSelected = country.rank === selectedCountryRank;
              return (
                <button
                  key={country.rank}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCountryRank(country.rank);
                    setFocusSource('country');
                    onMarkExplored();
                  }}
                  className={`w-full text-left p-2 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-amber-400 bg-amber-50'
                      : 'border-transparent hover:border-sky-200 hover:bg-sky-50/70'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-900">
                      {country.rank}. {country.name}{' '}
                      <span className="text-[10px] text-slate-500 font-normal">({country.continent})</span>
                    </span>
                    <span className="font-mono font-bold text-sky-800 tabular-nums">
                      {country.populationMillions >= 1000
                        ? `${(country.populationMillions / 1000).toFixed(2)} M`
                        : `${country.populationMillions} Jt`}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        country.name === 'Indonesia'
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                          : 'bg-gradient-to-r from-sky-500 to-blue-600'
                      }`}
                      style={{ width: `${Math.max(8, widthPct)}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-xs text-slate-800">
            <div className="flex items-center justify-between mb-0.5">
              <strong className="text-sky-900">Sorotan #{activeCountry.rank} {activeCountry.name}</strong>
              <span className="font-mono text-[11px] font-bold text-amber-700 tabular-nums">
                Kepadatan: {activeCountry.densityPerKm2} jiwa/km²
              </span>
            </div>
            <p className="text-slate-700">{activeCountry.highlight}</p>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: Sumber Daya & Lingkungan + Kondisi Lingkungan Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Bottom-Left: 4 Resource Medallions (Hutan, Air, Mineral, Pangan) */}
        <div className="lg:col-span-7 rounded-2xl border border-sky-200 bg-white/95 text-slate-900 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-950 flex items-center gap-2">
              <Trees className="w-4 h-4 text-emerald-600" />
              <span>Sumber Daya & Lingkungan</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Klik sektor untuk memantau kondisinya</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {RESOURCE_CATEGORIES.map((res) => {
              const isSelected = res.id === selectedResourceId;
              return (
                <button
                  key={res.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedResourceId(res.id);
                    setFocusSource('resource');
                    onMarkExplored();
                  }}
                  className={`p-3.5 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50 shadow-lg'
                      : 'border-sky-100 bg-sky-50/60 hover:bg-sky-50 hover:border-sky-300'
                  }`}
                >
                  <span className="w-14 h-14 rounded-full bg-white border-2 border-sky-200 shadow-sm flex items-center justify-center text-3xl">
                    {res.icon}
                  </span>
                  <span className="text-sm font-extrabold text-slate-950">{res.name}</span>
                  <span
                    className={`text-[10px] font-mono font-bold ${
                      res.status === 'Baik'
                        ? 'text-emerald-700'
                        : res.status === 'Sedang'
                        ? 'text-amber-700'
                        : 'text-rose-700'
                    }`}
                  >
                    {res.status}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Resource Details */}
          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 space-y-2.5 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <strong className="text-sm text-slate-950">
                {activeResource.icon} Sektor {activeResource.name}
              </strong>
              <span className="text-emerald-800 font-mono font-semibold">{activeResource.indonesiaExample}</span>
            </div>
            <p className="text-slate-700 leading-relaxed">{activeResource.summary}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200">
                <strong className="text-rose-800 block mb-0.5">Tantangan / Tekanan:</strong>
                <span className="text-slate-700">{activeResource.challenges}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                <strong className="text-emerald-800 block mb-0.5">Solusi Keberlanjutan:</strong>
                <span className="text-slate-700">{activeResource.conservationSolution}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom-Right: Kondisi Lingkungan Interactive Donut Chart */}
        <div className="lg:col-span-5 rounded-2xl border border-sky-200 bg-white/95 text-slate-900 p-5 flex flex-col justify-between space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-950 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-sky-700" />
              <span>Kondisi Lingkungan ({activeResource.name})</span>
            </h3>
          </div>

          <div className="flex items-center justify-center gap-6 py-2">
            <div className="relative w-36 h-36 shrink-0">
              <svg viewBox="0 0 110 110" className="w-full h-full -rotate-90">
                <circle
                  cx="55"
                  cy="55"
                  r={radius}
                  fill="transparent"
                  stroke="#22c55e"
                  strokeWidth="16"
                  strokeDasharray={`${goodLen} ${circumference}`}
                  strokeDashoffset="0"
                />
                <circle
                  cx="55"
                  cy="55"
                  r={radius}
                  fill="transparent"
                  stroke="#facc15"
                  strokeWidth="16"
                  strokeDasharray={`${modLen} ${circumference}`}
                  strokeDashoffset={-goodLen}
                />
                <circle
                  cx="55"
                  cy="55"
                  r={radius}
                  fill="transparent"
                  stroke="#ef4444"
                  strokeWidth="16"
                  strokeDasharray={`${critLen} ${circumference}`}
                  strokeDashoffset={-(goodLen + modLen)}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs text-slate-500 font-mono">Status</span>
                <span className="text-sm font-extrabold text-slate-950">{activeResource.status}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#22c55e] shrink-0" />
                <div>
                  <span className="text-slate-950 font-bold block">Baik: {activeResource.goodPct}%</span>
                  <span className="text-[10px] text-slate-600">Terjaga lestari</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#facc15] shrink-0" />
                <div>
                  <span className="text-slate-950 font-bold block">Sedang: {activeResource.moderatePct}%</span>
                  <span className="text-[10px] text-slate-600">Perlu pemulihan</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#ef4444] shrink-0" />
                <div>
                  <span className="text-slate-950 font-bold block">Kritis: {activeResource.criticalPct}%</span>
                  <span className="text-[10px] text-slate-600">Rawan degradasi</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-700 bg-sky-50 p-3 rounded-xl border border-sky-200">
            Data kondisi lingkungan berubah sesuai sektor sumber daya yang dipilih di sebelah kiri.
          </p>
        </div>
      </div>

      {/* Interactive Simulation: DAS Hulu-Hilir */}
      <div className="rounded-2xl border border-sky-200 bg-white/95 text-slate-900 p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-sky-100">
          <div>
            <span className="text-xs font-mono text-sky-700 uppercase font-bold">
              Simulasi Interaktif Daerah Aliran Sungai (DAS)
            </span>
            <h3 className="text-lg font-extrabold text-slate-950">
              Pengaruh Tutupan Hutan Hulu terhadap Risiko Banjir Hilir
            </h3>
          </div>
          <div
            className={`px-3 py-1 rounded-lg border text-xs font-extrabold ${
              runoffRate > 180
                ? 'bg-rose-100 border-rose-300 text-rose-800'
                : runoffRate > 90
                ? 'bg-amber-100 border-amber-300 text-amber-900'
                : 'bg-emerald-100 border-emerald-300 text-emerald-800'
            }`}
          >
            {floodRiskLevel.label}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-700 font-semibold">Tutupan Hutan Alami di Hulu:</span>
              <span className="font-mono text-base font-bold text-emerald-700 tabular-nums">{forestCover}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              step="5"
              value={forestCover}
              onChange={(e) => {
                setForestCover(Number(e.target.value));
                onMarkExplored();
              }}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-700 font-semibold flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-sky-600" />
                <span>Intensitas Curah Hujan:</span>
              </span>
              <span className="font-mono text-xs font-bold text-sky-800 uppercase">{rainIntensity}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['sedang', 'lebat', 'ekstrem'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    sound.playClick();
                    setRainIntensity(lvl);
                    onMarkExplored();
                  }}
                  className={`py-1.5 px-2 rounded-lg border text-xs font-bold capitalize cursor-pointer ${
                    rainIntensity === lvl
                      ? 'border-sky-600 bg-sky-600 text-white'
                      : 'border-sky-200 bg-white text-slate-700 hover:bg-sky-100'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center text-xs">
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-slate-600 font-medium block">Daya Infiltrasi Tanah</span>
            <span className="text-xl font-extrabold font-mono text-emerald-800 tabular-nums">{infiltrationRate}%</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
            <span className="text-slate-600 font-medium block">Limpasan Permukaan (Runoff)</span>
            <span className="text-xl font-extrabold font-mono text-amber-800 tabular-nums">{runoffRate} m³/det</span>
          </div>
        </div>
      </div>
    </div>
  );
};
