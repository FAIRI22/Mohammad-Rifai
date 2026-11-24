import React, { useState, useEffect } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  Printer,
  RotateCcw,
  Home,
  Check,
  Trophy,
  User,
  ShieldCheck,
} from 'lucide-react';
import { GuideId, GeoEnvironmentKey } from '../../types/geography';
import { GUIDES, IMAGES, QUIZ_QUESTIONS } from '../../data/geographyData';
import { CharacterGuide } from '../CharacterGuide';
import { AnimatedAnimalCharacter } from '../AnimatedAnimalCharacter';
import { sound } from '../../utils/audio';

interface Scene7EvaluationProps {
  currentGuideId: GuideId;
  onSwitchGuide: (guideId: GuideId) => void;
  score: number;
  quizCompleted: boolean;
  onUpdateScore: (newScore: number) => void;
  onCompleteQuiz: () => void;
  onRetakeQuiz: () => void;
  onNavigateHome: () => void;
  onRestartExpedition: () => void;
  onGeoContextChange?: (env: GeoEnvironmentKey) => void;
}

const QUESTION_TO_ENV: GeoEnvironmentKey[] = [
  'desert-sahara',
  'mountain-himalaya',
  'plains-river',
  'rainforest-amazon',
  'coast-tokyo',
];

export const Scene7Evaluation: React.FC<Scene7EvaluationProps> = ({
  currentGuideId,
  onSwitchGuide,
  score,
  quizCompleted,
  onUpdateScore,
  onCompleteQuiz,
  onRetakeQuiz,
  onNavigateHome,
  onRestartExpedition,
  onGeoContextChange,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('PENJELAJAH GEOGRAFI');

  useEffect(() => {
    if (!onGeoContextChange) return;
    if (quizCompleted) {
      onGeoContextChange('ocean-global');
    } else {
      onGeoContextChange(QUESTION_TO_ENV[currentQuestionIndex] || 'ocean-global');
    }
  }, [quizCompleted, currentQuestionIndex, onGeoContextChange]);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === QUIZ_QUESTIONS.length - 1;
  const guide = GUIDES[currentGuideId];

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
    setIsAnswered(true);

    const isCorrect = optionIndex === currentQ.correctIndex;
    if (isCorrect) {
      sound.playSuccess();
      onUpdateScore(score + 20);
    } else {
      sound.playWrong();
    }
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (isLastQuestion) {
      sound.playSuccess();
      onCompleteQuiz();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  const handleRetake = () => {
    sound.playClick();
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    onRetakeQuiz();
  };

  const handlePrint = () => {
    sound.playSuccess();
    window.print();
  };

  const getRank = (sc: number) => {
    if (sc >= 100) {
      return {
        title: 'Penjelajah Geografi Utama',
        badge: 'GOLD LAUREL MASTER',
        color: 'text-amber-300',
      };
    }
    if (sc >= 80) {
      return {
        title: 'Penjelajah Geografi Terampil',
        badge: 'SILVER CARTOGRAPHER',
        color: 'text-sky-300',
      };
    }
    if (sc >= 60) {
      return {
        title: 'Penjelajah Geografi Madya',
        badge: 'BRONZE NAVIGATOR',
        color: 'text-emerald-300',
      };
    }
    return {
      title: 'Penjelajah Geografi Muda',
      badge: 'APPRENTICE EXPLORER',
      color: 'text-slate-200',
    };
  };

  const rank = getRank(score);
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // PHASE 1: Active 5-Question Quiz
  if (!quizCompleted) {
    const guideMessage =
      currentGuideId === 'geo'
        ? `Saatnya Evaluasi Akhir! Jawab 5 pertanyaan analitis berikut tentang iklim gurun Sahara, relief Himalaya, kepadatan penduduk, tata air DAS, dan mitigasi bencana Tokyo.`
        : `Setiap soal bernilai 20 poin (total 100). Baca pembahasan geografis setelah memilih jawaban untuk memperdalam pemahamanmu!`;

    return (
      <div className="space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-white/90 border border-sky-200 text-xs font-mono font-bold tracking-wider text-[#0369a1] uppercase shadow-xs">
            SCENE 08 · EVALUASI AKHIR EKSPEDISI
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow-sm mt-1.5">
            Tantangan Evaluasi Penjelajah Geografi
          </h2>
          <p className="text-sky-50 drop-shadow-sm font-medium text-sm sm:text-base mt-2">
            Selesaikan 5 pertanyaan untuk meraih Skor Akhir, Lencana Penjelajah Geografi, dan Sertifikat Resmi.
          </p>
        </div>

        <CharacterGuide
          currentGuideId={currentGuideId}
          onSwitchGuide={onSwitchGuide}
          message={guideMessage}
        />

        <div className="rounded-3xl border border-sky-200 bg-white/95 text-slate-900 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-sky-100">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-md bg-sky-100 border border-sky-300 text-sky-900 font-bold">
                Soal {currentQuestionIndex + 1} dari {QUIZ_QUESTIONS.length}
              </span>
              <span className="text-slate-600 font-medium">· {currentQ.geographicConcept}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-600 font-mono font-semibold">Skor Saat Ini:</span>
              <span className="text-lg font-bold font-mono text-amber-900 bg-amber-100 border border-amber-300 px-3 py-0.5 rounded-lg tabular-nums">
                {score} / 100
              </span>
            </div>
          </div>

          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-sky-500 to-amber-500 transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + (isAnswered ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100}%`,
              }}
            />
          </div>

          <div className="py-2">
            <h3 className="text-lg sm:text-2xl font-extrabold text-slate-950 leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const letter = String.fromCharCode(65 + idx);
              let optionStyles =
                'border-sky-200 bg-sky-50/70 hover:bg-sky-100 text-slate-900';

              if (isAnswered) {
                if (idx === currentQ.correctIndex) {
                  optionStyles =
                    'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-400 shadow-md';
                } else if (idx === selectedOption) {
                  optionStyles =
                    'border-rose-500 bg-rose-50 text-rose-950 ring-1 ring-rose-400';
                } else {
                  optionStyles = 'opacity-50 border-slate-200 bg-slate-100 text-slate-500';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full flex items-start gap-3.5 p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${optionStyles}`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border ${
                      isAnswered && idx === currentQ.correctIndex
                        ? 'bg-emerald-500 border-emerald-600 text-white'
                        : isAnswered && idx === selectedOption
                        ? 'bg-rose-500 border-rose-600 text-white'
                        : 'bg-white border-sky-300 text-sky-800'
                    }`}
                  >
                    {letter}
                  </span>

                  <span className="text-sm sm:text-base font-semibold leading-relaxed flex-1">
                    {option}
                  </span>

                  {isAnswered && idx === currentQ.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div
              className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                selectedOption === currentQ.correctIndex
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-950'
                  : 'border-amber-400 bg-amber-50 text-amber-950'
              }`}
            >
              <div className="flex items-center gap-2 font-extrabold text-sm mb-1">
                {selectedOption === currentQ.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-800">Jawaban Tepat! (+20 Poin)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span className="text-amber-900">Jawaban Kurang Tepat</span>
                  </>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed mt-2">
                <strong>Pembahasan Geografis: </strong>
                {currentQ.explanation}
              </p>

              <div className="mt-4 pt-3 border-t border-black/10 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm shadow-lg transition-all cursor-pointer"
                >
                  <span>{isLastQuestion ? 'Lihat Hasil & Lencana Akhir →' : 'Soal Berikutnya →'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // PHASE 2: Bright Storyboard Panel 08. EVALUASI AKHIR Celebration + Certificate
  return (
    <div className="space-y-8">
      {/* Header (hidden on print) */}
      <div className="no-print">
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-white/90 border border-sky-200 text-xs font-mono font-bold text-[#0369a1] uppercase shadow-xs">
          08. Evaluasi Akhir · Misi Selesai
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow-sm mt-1.5">
          Selamat, Penjelajah!
        </h2>
        <p className="text-sky-50 drop-shadow-sm font-medium text-sm sm:text-base mt-2">
          Kamu telah menyelesaikan seluruh rangkaian Lab Maya “Eksplorasi Geografis Dunia”.
        </p>
      </div>

      {/* Storyboard Panel 08 Bright Ocean-Teal Celebration Card */}
      <div className="no-print relative rounded-3xl overflow-hidden border-2 border-sky-300 bg-[#0284c7] shadow-2xl">
        <div className="absolute inset-0">
          <img
            src={IMAGES.earthHorizon}
            alt="Latar Bumi Evaluasi Akhir"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0284c7]/80 via-[#0ea5e9]/60 to-[#0d9488]/75" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Trophy + Animated Character Celebration */}
          <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 text-slate-950 flex items-center justify-center shadow-2xl border-2 border-white mx-auto">
                <Trophy className="w-10 h-10 stroke-[2.2]" />
              </div>
              <div className="mt-3 inline-block px-5 py-1.5 rounded-xl bg-gradient-to-r from-amber-300 to-amber-400 text-slate-950 font-black text-base shadow-lg">
                Selamat, Penjelajah!
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/95 text-slate-900 border border-sky-200 max-w-sm text-left shadow-xl">
              {guide.animalId ? (
                <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-amber-400 shrink-0 bg-sky-100">
                  <AnimatedAnimalCharacter animalId={guide.animalId} />
                </div>
              ) : (
                <img
                  src={guide.avatar}
                  alt={`Karakter Animasi ${guide.name}`}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover object-top border-2 border-amber-400 shrink-0 bg-sky-100 animate-guide-bob"
                />
              )}
              <div>
                <span className="text-[11px] font-mono text-sky-700 uppercase font-bold block">
                  {guide.name}
                </span>
                <p className="text-xs text-slate-700 font-medium leading-snug mt-0.5">
                  Hebat! Penguasaan konsep ruang, bentang alam, dan kelingkunganmu sangat mengesankan.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Skor Akhir + Lencana + 3 Storyboard Action Buttons */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-sky-200 bg-white/95 text-slate-900 text-center space-y-1 shadow-xl">
                <span className="text-xs font-mono text-amber-600 uppercase tracking-wider font-bold">
                  ★ Skor Akhir
                </span>
                <div className="text-4xl font-black font-mono text-[#0369a1] tabular-nums">
                  {score} <span className="text-xl text-slate-400">/ 100</span>
                </div>
                <span className="text-xs text-emerald-700 font-bold block">Evaluasi 5 Soal Analitis</span>
              </div>

              <div className="p-5 rounded-2xl border border-amber-300 bg-white/95 text-slate-900 text-center space-y-2 shadow-xl flex flex-col items-center justify-center">
                <span className="text-xs font-mono text-amber-600 uppercase tracking-wider font-bold">
                  Lencana Kehormatan
                </span>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-300 to-sky-400 flex items-center justify-center border-2 border-white shadow-md">
                  <ShieldCheck className="w-6 h-6 text-slate-950" />
                </div>
                <span className="text-sm font-extrabold text-[#0b2f4e]">{rank.title}</span>
              </div>
            </div>

            {/* 3 Storyboard Bottom Action Buttons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <button
                onClick={handleRetake}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-sky-200/60 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-lg transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Kuis</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onNavigateHome();
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-sky-200/60 bg-sky-700 hover:bg-sky-600 text-white font-bold text-sm shadow-lg transition-all cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Menu Utama</span>
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 text-slate-950 font-black text-sm shadow-xl transition-all cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Selesai & Cetak Sertifikat</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Student Name Customization Bar */}
      <div className="no-print p-4 rounded-2xl border border-sky-200 bg-white/95 text-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <User className="w-5 h-5 text-sky-700 shrink-0" />
          <div className="flex-1">
            <label htmlFor="cert-name" className="text-xs text-slate-600 font-semibold block">
              Nama Peserta pada Sertifikat Resmi:
            </label>
            <input
              id="cert-name"
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value.toUpperCase())}
              placeholder="MASUKKAN NAMA LENGKAPMU"
              className="mt-1 bg-sky-50 border border-sky-300 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-950 focus:outline-none focus:border-sky-600 w-full sm:w-80"
            />
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Simpan PDF</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onRestartExpedition();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-sky-300 bg-sky-50 hover:bg-sky-100 text-sky-900 text-xs sm:text-sm font-bold cursor-pointer"
          >
            <span>Reset Ekspedisi</span>
          </button>
        </div>
      </div>

      {/* Official Bright Printable Certificate */}
      <div className="relative rounded-3xl border-4 border-amber-400 bg-gradient-to-b from-[#fefcf5] via-[#ffffff] to-[#f0f7ff] text-slate-900 p-8 sm:p-14 shadow-2xl text-center space-y-8 overflow-hidden">
        <div className="absolute inset-2 border-2 border-amber-400/50 rounded-2xl pointer-events-none" />

        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-300 to-amber-500 text-slate-950 shadow-xl border-2 border-amber-200">
            <Award className="w-9 h-9 stroke-[2.2]" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-amber-700 uppercase">
              CERTIFICATE OF GEOGRAPHIC MASTERY
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-sky-950 tracking-wide uppercase font-serif">
              Sertifikat Penjelajah Geografi
            </h1>
            <p className="text-xs text-sky-700 font-bold tracking-wider">
              LAB MAYA EKSPLORASI GEOGRAFIS DUNIA · SMA KELAS XI
            </p>
          </div>
        </div>

        <div className="space-y-2 py-4">
          <p className="text-xs sm:text-sm text-slate-600 italic">
            Diberikan dengan hormat kepada penjelajah:
          </p>
          <div className="inline-block border-b-2 border-amber-500 pb-2 px-8">
            <h2 className="text-2xl sm:text-4xl font-black text-sky-900 tracking-wider uppercase">
              {studentName || 'PENJELAJAH GEOGRAFI'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto pt-3 leading-relaxed">
            Atas dedikasi dan keberhasilan menuntaskan 8 tahapan ekspedisi pembelajaran Geografi Dunia,
            meliputi studi kasus wilayah, atlas 7 benua & 5 samudra, bentang alam, iklim, serta analisis penduduk & lingkungan.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 py-2">
          <div className="px-5 py-2.5 rounded-xl bg-amber-50 border border-amber-300 text-center">
            <span className="text-[11px] text-slate-600 font-mono font-semibold block">SKOR EVALUASI AKHIR</span>
            <span className="text-2xl font-extrabold font-mono text-amber-700 tabular-nums">{score} / 100</span>
          </div>

          <div className="px-5 py-2.5 rounded-xl bg-sky-50 border border-sky-300 text-center">
            <span className="text-[11px] text-slate-600 font-mono font-semibold block">PREDIKAT LENCANA</span>
            <span className="text-base font-extrabold text-sky-800">{rank.title}</span>
          </div>

          <div className="px-5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-center">
            <span className="text-[11px] text-slate-600 font-mono font-semibold block">TANGGAL PENERBITAN</span>
            <span className="text-sm font-bold text-emerald-900">{currentDate}</span>
          </div>
        </div>

        <div className="pt-8 border-t border-sky-200 grid grid-cols-2 gap-8 max-w-xl mx-auto items-center">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <img
                src={GUIDES.geo.avatar}
                alt={GUIDES.geo.name}
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-full object-cover object-top border-2 border-amber-400 bg-sky-100"
              />
              <div className="text-left">
                <span className="font-serif italic text-base text-sky-950 font-bold block">
                  Geo Nusantara
                </span>
                <span className="text-[10px] text-slate-600 font-mono block">
                  Expedition Chief
                </span>
              </div>
            </div>
            <div className="w-32 h-0.5 bg-sky-300 mx-auto" />
            <span className="text-[11px] text-slate-900 font-bold block">Pak Geo</span>
            <span className="text-[10px] text-slate-600 block">Pemandu Lapangan Geografi</span>
          </div>

          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <img
                src={GUIDES.maya.avatar}
                alt={GUIDES.maya.name}
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-full object-cover object-top border-2 border-amber-400 bg-sky-100"
              />
              <div className="text-left">
                <span className="font-serif italic text-base text-sky-950 font-bold block">
                  Dr. Maya Kartini
                </span>
                <span className="text-[10px] text-slate-600 font-mono block">
                  Lead Cartographer
                </span>
              </div>
            </div>
            <div className="w-32 h-0.5 bg-sky-300 mx-auto" />
            <span className="text-[11px] text-slate-900 font-bold block">Dr. Maya</span>
            <span className="text-[10px] text-slate-600 block">Pakar SIG & Geografi Lingkungan</span>
          </div>
        </div>

        <div className="text-[10px] font-mono text-slate-500 pt-4">
          NO. REG: GEO-LAB-2026-{(score * 137).toString().padStart(6, '0')} · TERVERIFIKASI LAB MAYA GEOGRAFI
        </div>
      </div>
    </div>
  );
};
