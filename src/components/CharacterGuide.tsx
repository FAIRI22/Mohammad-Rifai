import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, UserCheck } from 'lucide-react';
import { GuideId } from '../types/geography';
import { GUIDES, getNextGuideId } from '../data/geographyData';
import { AnimatedAnimalCharacter } from './AnimatedAnimalCharacter';
import { sound } from '../utils/audio';

interface CharacterGuideProps {
  currentGuideId: GuideId;
  onSwitchGuide: (id: GuideId) => void;
  message: string;
  className?: string;
}

export const CharacterGuide: React.FC<CharacterGuideProps> = ({
  currentGuideId,
  onSwitchGuide,
  message,
  className = '',
}) => {
  const guide = GUIDES[currentGuideId];
  const nextGuideId: GuideId = getNextGuideId(currentGuideId);
  const nextGuide = GUIDES[nextGuideId];
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      sound.stopSpeech();
      setIsSpeaking(false);
    };
  }, [message]);

  const handleToggleSpeak = () => {
    sound.playClick();
    if (isSpeaking) {
      sound.stopSpeech();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const textToRead = `${guide.name} berkata: ${message}`;
      sound.speak(textToRead, () => {
        setIsSpeaking(false);
      });
    }
  };

  return (
    <div
      className={`relative rounded-2xl border-2 border-sky-300/90 bg-gradient-to-r from-[#e0f2fe]/95 via-[#f0f9ff]/95 to-[#dcfce7]/95 p-4 md:p-5 shadow-lg backdrop-blur-md ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Animated Character Avatar Frame */}
        <div className="relative shrink-0">
          {guide.animalId ? (
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md ring-4 ring-sky-200 bg-sky-100">
              <AnimatedAnimalCharacter
                animalId={guide.animalId}
                isSpeaking={isSpeaking}
                onClick={handleToggleSpeak}
                title={`Klik ${guide.name} untuk mendengarkan sapaan!`}
              />
              <div className="pointer-events-none absolute bottom-0 inset-x-0 bg-gradient-to-t from-sky-950/90 via-sky-900/55 to-transparent py-0.5 text-center">
                <span className="text-[10px] font-bold tracking-wider text-amber-300 uppercase">
                  {guide.name}
                </span>
              </div>
            </div>
          ) : (
            <div
              className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md ring-4 ring-sky-200 bg-sky-100 ${
                isSpeaking ? 'animate-guide-talk' : 'animate-guide-bob'
              }`}
            >
              <img
                src={guide.avatar}
                alt={`Karakter Animasi ${guide.name}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-sky-950/90 via-sky-900/55 to-transparent py-0.5 text-center">
                <span className="text-[10px] font-bold tracking-wider text-amber-300 uppercase">
                  {guide.name}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Bright Frosted Speech Bubble & Controls */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-sm font-extrabold text-[#0c3559]">{guide.name}</span>
              <span aria-hidden="true" className="text-sky-400">·</span>
              <span className="text-sky-800 font-semibold hidden sm:inline">{guide.role}</span>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                sound.stopSpeech();
                setIsSpeaking(false);
                onSwitchGuide(nextGuideId);
              }}
              title={`Ganti pemandu ke ${nextGuide.name}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border border-sky-300 bg-white text-sky-900 hover:bg-sky-50 transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Ganti ke {nextGuide.name}</span>
            </button>
          </div>

          <p className="text-slate-900 text-sm md:text-base font-medium leading-relaxed bg-white p-3.5 rounded-xl border border-sky-200 shadow-sm">
            “{message}”
          </p>

          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-slate-700 text-[11px] font-mono font-medium">
              Perlengkapan: {guide.fieldGear}
            </span>

            <button
              onClick={handleToggleSpeak}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isSpeaking
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-sm'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Hentikan Suara</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Dengarkan Suara {guide.name}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
