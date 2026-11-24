import React, { useState } from 'react';
import { GuideId, GeoEnvironmentKey } from './types/geography';
import { GUIDES, GEO_ENVIRONMENTS, IMAGES } from './data/geographyData';
import { Header } from './components/Header';
import { FooterNav } from './components/FooterNav';
import { AmbientBackgroundWildlife } from './components/AmbientBackgroundWildlife';
import { Scene0Hero } from './components/scenes/Scene0Hero';
import { Scene1CaseStudies } from './components/scenes/Scene1CaseStudies';
import { Scene2Guide } from './components/scenes/Scene2Guide';
import { Scene3MapAtlas } from './components/scenes/Scene3MapAtlas';
import { Scene4Biomes } from './components/scenes/Scene4Biomes';
import { Scene5HumanEnvironment } from './components/scenes/Scene5HumanEnvironment';
import { Scene6Checklist } from './components/scenes/Scene6Checklist';
import { Scene7Evaluation } from './components/scenes/Scene7Evaluation';
import { sound } from './utils/audio';

export default function App() {
  const [currentScene, setCurrentScene] = useState<number>(0);
  const [currentGuideId, setCurrentGuideId] = useState<GuideId>('geo');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [backdropMode, setBackdropMode] = useState<'nature' | 'earth'>('nature');
  const [activeGeoEnv, setActiveGeoEnv] = useState<GeoEnvironmentKey>('ocean-global');
  const [bgWildlifeEnabled, setBgWildlifeEnabled] = useState<boolean>(true);
  const currentGeoContext = GEO_ENVIRONMENTS[activeGeoEnv];

  // Shared Expedition Progress State across Scenes 01–08
  const [exploredCaseIds, setExploredCaseIds] = useState<string[]>(['sahara']);
  const [visitedRegionIds, setVisitedRegionIds] = useState<string[]>(['asia']);
  const [exploredLandforms, setExploredLandforms] = useState<boolean>(false);
  const [exploredHumanEnv, setExploredHumanEnv] = useState<boolean>(false);
  const [manualChecklist, setManualChecklist] = useState<Record<string, boolean>>({});

  const sceneTitles = [
    '01. Beranda',
    '02. Studi Kasus',
    '03. Panduan',
    '04. Peta Dunia',
    '05. Bentang Alam & Iklim',
    '06. Penduduk & Lingkungan',
    '07. Checklist Ekspedisi',
    '08. Evaluasi Akhir',
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleToggleSound = () => {
    const newState = !soundEnabled;
    sound.enabled = newState;
    setSoundEnabled(newState);
    if (!newState) {
      sound.stopSpeech();
    }
    showToast(newState ? '🔊 Suara & Narasi Diaktifkan' : '🔇 Suara & Narasi Dimatikan');
  };

  const handleNavigate = (sceneIndex: number) => {
    if (sceneIndex < 0 || sceneIndex >= sceneTitles.length) return;
    sound.stopSpeech();
    setCurrentScene(sceneIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreCase = (caseId: string) => {
    setExploredCaseIds((prev) => (prev.includes(caseId) ? prev : [...prev, caseId]));
  };

  const handleVisitRegion = (regionId: string) => {
    setVisitedRegionIds((prev) => (prev.includes(regionId) ? prev : [...prev, regionId]));
  };

  const handleToggleManualCheck = (missionId: string, currentChecked: boolean) => {
    setManualChecklist((prev) => ({
      ...prev,
      [missionId]: !currentChecked,
    }));
  };

  const handleRestart = () => {
    setScore(0);
    setQuizCompleted(false);
    setExploredCaseIds(['sahara']);
    setVisitedRegionIds(['asia']);
    setExploredLandforms(false);
    setExploredHumanEnv(false);
    setManualChecklist({});
    setCurrentScene(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Ekspedisi dimulai kembali dari awal.');
  };

  return (
    <div className="min-h-screen bg-[#2f78a8] text-white flex flex-col relative selection:bg-amber-300/40 selection:text-slate-950">
      {/* Balanced Medium-Daylight Nature / Planet Earth Background Layer */}
      <div className="no-print fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={backdropMode === 'nature' ? IMAGES.natureValley : IMAGES.earthHorizon}
          alt={backdropMode === 'nature' ? 'Latar Alam Pegunungan dan Lembah Sungai Bumi' : 'Latar Planet Bumi dari Orbit'}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-65 transition-opacity duration-500"
        />
        <div
          className={`absolute inset-0 transition-colors duration-500 ${
            backdropMode === 'nature'
              ? 'bg-gradient-to-b from-[#2c75a6]/55 via-[#3582a8]/45 to-[#23696e]/60'
              : 'bg-gradient-to-b from-[#276ba3]/55 via-[#2e7bb3]/45 to-[#1f628c]/60'
          }`}
        />

        {/* Dynamic Region-Aware Animated Background Wildlife */}
        <AmbientBackgroundWildlife environment={activeGeoEnv} enabled={bgWildlifeEnabled} />
      </div>

      {/* Top Bar Navigation */}
      <Header
        currentScene={currentScene}
        onNavigate={handleNavigate}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        currentGuideId={currentGuideId}
        onSwitchGuide={(guide) => {
          setCurrentGuideId(guide);
          showToast(`Pemandu ekspedisi diubah ke ${GUIDES[guide].name}`);
        }}
      />

      {/* Topographic Hypsometric Legend & Nature/Earth Backdrop Switcher */}
      <div className="no-print relative z-10 border-b border-sky-200 bg-white/90 backdrop-blur-md px-4 py-2 text-[11px] text-slate-800 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono font-extrabold text-[#0369a1]">WARNA HIPSOMETRI:</span>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 text-[10px] font-mono font-medium text-slate-700">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#0284c7] border border-sky-800/30"></span>
                <span>Laut</span>
              </span>
              <span className="text-slate-400">→</span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#2d6a4f] border border-emerald-900/30"></span>
                <span>Dataran Rendah</span>
              </span>
              <span className="text-slate-400">→</span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#d4a373] border border-amber-900/30"></span>
                <span>Perbukitan</span>
              </span>
              <span className="text-slate-400">→</span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#8c4f27] border border-amber-950/30"></span>
                <span>Pegunungan</span>
              </span>
              <span className="text-slate-400">→</span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#f8fafc] border border-slate-300"></span>
                <span>Salju</span>
              </span>
            </div>
          </div>

          {/* Interactive Lab Backdrop Selector + Active Regional Wildlife Readout */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="hidden md:flex items-center gap-1.5 text-[11px] text-slate-700">
              <span className="font-bold text-[#0369a1]">{currentGeoContext.regionLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-slate-600">{currentGeoContext.wildlifeSummary}</span>
            </div>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setBgWildlifeEnabled((v) => !v);
              }}
              className={`px-2.5 py-1 rounded-md text-[10px] font-bold border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                bgWildlifeEnabled
                  ? 'bg-amber-400 border-amber-500 text-slate-950 shadow-xs'
                  : 'bg-white border-sky-200 text-slate-600 hover:text-slate-900'
              }`}
              title="Aktifkan atau sembunyikan animasi satwa di latar belakang"
            >
              {bgWildlifeEnabled ? 'Satwa Latar: Aktif' : 'Satwa Latar: Nonaktif'}
            </button>

            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-sky-100 border border-sky-200">
              <button
                onClick={() => {
                  sound.playClick();
                  setBackdropMode('nature');
                }}
                className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                  backdropMode === 'nature'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                Latar Alam
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setBackdropMode('earth');
                }}
                className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                  backdropMode === 'earth'
                    ? 'bg-[#0284c7] text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                Latar Bumi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Non-sticky 8-Scene Navigation Switcher (hidden in print) */}
        <div className="no-print mb-6 overflow-x-auto pb-1">
          <div className="inline-flex sm:flex items-center gap-1.5 p-1.5 rounded-2xl border border-sky-200 bg-white/95 backdrop-blur-md min-w-full shadow-md">
            {sceneTitles.map((title, idx) => {
              const isActive = currentScene === idx;
              return (
                <button
                  key={title}
                  onClick={() => {
                    sound.playClick();
                    handleNavigate(idx);
                  }}
                  className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 text-center ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0284c7] to-[#0d9488] text-white font-bold shadow-md'
                      : 'text-slate-700 hover:bg-sky-50 hover:text-sky-900'
                  }`}
                >
                  {title}
                </button>
              );
            })}
          </div>
        </div>

        <div key={currentScene} className="animate-scene-enter">
          {currentScene === 0 && (
            <Scene0Hero
              onNavigate={handleNavigate}
              currentGuideId={currentGuideId}
              onSelectGuide={setCurrentGuideId}
              onGeoContextChange={setActiveGeoEnv}
            />
          )}

        {currentScene === 1 && (
          <Scene1CaseStudies
            currentGuideId={currentGuideId}
            onSwitchGuide={setCurrentGuideId}
            exploredCaseIds={exploredCaseIds}
            onExploreCase={handleExploreCase}
            onGoToNext={() => handleNavigate(2)}
            onGeoContextChange={setActiveGeoEnv}
          />
        )}

        {currentScene === 2 && (
          <Scene2Guide
            currentGuideId={currentGuideId}
            onSwitchGuide={setCurrentGuideId}
            onNavigate={handleNavigate}
            onGeoContextChange={setActiveGeoEnv}
          />
        )}

        {currentScene === 3 && (
          <Scene3MapAtlas
            currentGuideId={currentGuideId}
            onSwitchGuide={setCurrentGuideId}
            visitedRegionIds={visitedRegionIds}
            onVisitRegion={handleVisitRegion}
            onGeoContextChange={setActiveGeoEnv}
          />
        )}

        {currentScene === 4 && (
          <Scene4Biomes
            currentGuideId={currentGuideId}
            onSwitchGuide={setCurrentGuideId}
            onMarkExplored={() => setExploredLandforms(true)}
            onGeoContextChange={setActiveGeoEnv}
          />
        )}

        {currentScene === 5 && (
          <Scene5HumanEnvironment
            currentGuideId={currentGuideId}
            onSwitchGuide={setCurrentGuideId}
            onMarkExplored={() => setExploredHumanEnv(true)}
            onGeoContextChange={setActiveGeoEnv}
          />
        )}

        {currentScene === 6 && (
          <Scene6Checklist
            currentGuideId={currentGuideId}
            onSwitchGuide={setCurrentGuideId}
            exploredCaseIds={exploredCaseIds}
            visitedRegionIds={visitedRegionIds}
            exploredLandforms={exploredLandforms}
            exploredHumanEnv={exploredHumanEnv}
            quizCompleted={quizCompleted}
            manualChecklist={manualChecklist}
            onToggleManualCheck={handleToggleManualCheck}
            onNavigate={handleNavigate}
            onGeoContextChange={setActiveGeoEnv}
          />
        )}

          {currentScene === 7 && (
            <Scene7Evaluation
              currentGuideId={currentGuideId}
              onSwitchGuide={setCurrentGuideId}
              score={score}
              quizCompleted={quizCompleted}
              onUpdateScore={setScore}
              onCompleteQuiz={() => setQuizCompleted(true)}
              onRetakeQuiz={() => {
                setScore(0);
                setQuizCompleted(false);
              }}
              onNavigateHome={() => handleNavigate(0)}
              onRestartExpedition={handleRestart}
              onGeoContextChange={setActiveGeoEnv}
            />
          )}
        </div>

        {/* Footer Navigation (hidden in print) */}
        <div className="no-print">
          <FooterNav
            currentScene={currentScene}
            totalScenes={sceneTitles.length}
            onNavigate={handleNavigate}
            sceneTitles={sceneTitles}
          />
        </div>
      </main>

      {/* Quiet Footer Brand Note */}
      <footer className="no-print relative z-10 border-t border-sky-200 bg-white/85 backdrop-blur-sm py-5 text-center text-xs text-slate-700">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-bold text-slate-900">Lab Maya Eksplorasi Geografis Dunia</span>
          <span className="font-mono text-[11px] font-semibold text-sky-700">Media Edukasi Geografi SMA Kelas XI</span>
        </div>
      </footer>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-white text-slate-900 border border-sky-400 text-xs sm:text-sm font-bold shadow-2xl">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
