import React from 'react';
import { GeoEnvironmentKey } from '../types/geography';

interface AmbientBackgroundWildlifeProps {
  environment: GeoEnvironmentKey;
  enabled: boolean;
}

const BlueWhaleSvg: React.FC<{ flip?: boolean; icy?: boolean }> = ({ flip = false, icy = false }) => (
  <svg
    viewBox="0 0 300 120"
    className={`w-56 sm:w-72 h-auto drop-shadow-[0_6px_14px_rgba(7,89,133,0.45)] ${
      flip ? '-scale-x-100' : ''
    }`}
    aria-hidden="true"
  >
    {/* Blowhole water spout mist */}
    <g className="animate-bg-spout-mist">
      <path d="M198 34 Q 190 14, 176 8" fill="none" stroke="#e0f2fe" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <path d="M202 34 Q 210 12, 224 8" fill="none" stroke="#bae6fd" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <circle cx="174" cy="7" r="3" fill="#ffffff" opacity="0.7" />
      <circle cx="226" cy="7" r="3" fill="#ffffff" opacity="0.7" />
    </g>

    {/* Animated Tail Fluke */}
    <g className="animate-bg-whale-fluke">
      <path
        d="M58 64 Q 32 58, 12 36 Q 28 54, 24 68 Q 14 82, 8 92 Q 34 80, 58 72 Z"
        fill={icy ? '#0e7490' : '#0369a1'}
      />
    </g>

    {/* Main Streamlined Body */}
    <path
      d="M54 66 Q 92 40, 168 38 Q 238 36, 272 60 Q 278 72, 250 78 Q 186 86, 114 78 Q 76 74, 54 66 Z"
      fill={icy ? '#0284c7' : '#075985'}
    />

    {/* Pale Ventral Throat Grooves */}
    <path
      d="M142 73 Q 198 83, 266 70 Q 252 79, 206 83 Q 162 84, 134 75 Z"
      fill="#bae6fd"
      opacity="0.75"
    />

    {/* Dorsal Fin */}
    <path d="M108 45 Q 98 30, 92 32 Q 96 42, 96 48 Z" fill="#0369a1" />

    {/* Pectoral Flipper */}
    <path d="M188 68 Q 164 90, 148 94 Q 166 80, 174 68 Z" fill="#38bdf8" opacity="0.85" />

    {/* Subtle Eye */}
    <circle cx="236" cy="59" r="2.2" fill="#f0f9ff" />
    <circle cx="236.5" cy="59" r="1.1" fill="#0f172a" />

    {/* Subtle Ocean Wake Bubbles */}
    <circle cx="28" cy="56" r="2.5" fill="#e0f2fe" opacity="0.55" />
    <circle cx="16" cy="64" r="1.8" fill="#e0f2fe" opacity="0.45" />
  </svg>
);

const SeaTurtleSvg: React.FC<{ flip?: boolean }> = ({ flip = false }) => (
  <svg
    viewBox="0 0 120 75"
    className={`w-24 sm:w-28 h-auto drop-shadow-md ${flip ? '-scale-x-100' : ''}`}
    aria-hidden="true"
  >
    {/* Front Flipper */}
    <g className="animate-bg-bird-wing">
      <path d="M68 42 Q 82 62, 62 66 Q 58 54, 58 44 Z" fill="#10b981" opacity="0.9" />
    </g>
    {/* Back Flipper */}
    <path d="M24 44 Q 12 52, 16 58 Q 26 52, 32 44 Z" fill="#059669" />
    {/* Head */}
    <ellipse cx="94" cy="36" rx="11" ry="8" fill="#34d399" />
    <circle cx="98" cy="34" r="1.5" fill="#0f172a" />
    {/* Shell */}
    <path d="M24 40 Q 48 16, 84 34 Q 76 48, 42 46 Q 28 45, 24 40 Z" fill="#047857" stroke="#a7f3d0" strokeWidth="1.5" />
    <path d="M40 33 L56 29 L66 36 L50 40 Z" fill="#34d399" opacity="0.45" />
  </svg>
);

const MantaRaySvg: React.FC = () => (
  <svg viewBox="0 0 150 80" className="w-32 sm:w-36 h-auto drop-shadow-md" aria-hidden="true">
    <path d="M24 42 L2 46 L24 44 Z" fill="#0369a1" opacity="0.85" />
    <g className="animate-bg-bird-wing">
      <path
        d="M24 42 Q 66 8, 128 36 Q 94 46, 134 56 Q 74 72, 24 42 Z"
        fill="#0c4a6e"
        stroke="#7dd3fc"
        strokeWidth="1.5"
        opacity="0.88"
      />
    </g>
  </svg>
);

const MigratoryBirdSvg: React.FC<{
  color?: string;
  sizeClass?: string;
  wingDelay?: string;
}> = ({ color = '#f8fafc', sizeClass = 'w-12 h-8', wingDelay = '0s' }) => (
  <svg viewBox="0 0 64 36" className={`${sizeClass} drop-shadow-sm`} aria-hidden="true">
    {/* Bird body */}
    <path d="M16 20 Q 34 15, 52 19 Q 36 23, 18 22 Z" fill={color} />
    {/* Beak */}
    <path d="M51 18.5 L59 19.5 L51 20.8 Z" fill="#fbbf24" />
    {/* Animated Flapping Wing */}
    <g className="animate-bg-bird-wing" style={{ animationDelay: wingDelay }}>
      <path d="M26 18 Q 34 2, 46 6 Q 38 14, 38 18 Z" fill={color} opacity="0.95" />
    </g>
  </svg>
);

const MigratoryFlock: React.FC<{ color?: string; flip?: boolean }> = ({
  color = '#f8fafc',
  flip = false,
}) => (
  <div className={`relative w-56 h-24 ${flip ? '-scale-x-100' : ''}`}>
    <div className="absolute left-36 top-4">
      <MigratoryBirdSvg color={color} sizeClass="w-12 h-7" wingDelay="0s" />
    </div>
    <div className="absolute left-24 top-0">
      <MigratoryBirdSvg color={color} sizeClass="w-11 h-7" wingDelay="0.18s" />
    </div>
    <div className="absolute left-20 top-10">
      <MigratoryBirdSvg color={color} sizeClass="w-10 h-6" wingDelay="0.34s" />
    </div>
    <div className="absolute left-8 top-3">
      <MigratoryBirdSvg color={color} sizeClass="w-9 h-6" wingDelay="0.48s" />
    </div>
    <div className="absolute left-2 top-14">
      <MigratoryBirdSvg color={color} sizeClass="w-8 h-5" wingDelay="0.62s" />
    </div>
  </div>
);

const SoaringEagleSvg: React.FC<{ color?: string; headColor?: string }> = ({
  color = '#78350f',
  headColor = '#fef3c7',
}) => (
  <svg viewBox="0 0 120 60" className="w-28 sm:w-36 h-auto drop-shadow-md" aria-hidden="true">
    <path d="M22 34 L4 28 L10 38 L22 36 Z" fill={color} />
    <ellipse cx="56" cy="34" rx="22" ry="7" fill={color} />
    <circle cx="82" cy="33" r="6" fill={headColor} />
    <path d="M87 32 L95 35 L87 37 Z" fill="#f59e0b" />
    <g className="animate-bg-bird-wing">
      <path d="M40 31 Q 48 6, 72 10 Q 62 24, 60 31 Z" fill={color} stroke={headColor} strokeWidth="0.8" />
    </g>
  </svg>
);

const TropicalMacawSvg: React.FC<{ primary?: string; secondary?: string }> = ({
  primary = '#ef4444',
  secondary = '#facc15',
}) => (
  <svg viewBox="0 0 110 64" className="w-24 sm:w-28 h-auto drop-shadow-md" aria-hidden="true">
    {/* Long tail feathers */}
    <path d="M30 34 L2 46 L34 38 Z" fill="#2563eb" />
    <path d="M32 36 L6 52 L36 39 Z" fill={primary} />
    {/* Body & Head */}
    <ellipse cx="56" cy="34" rx="20" ry="9" fill={primary} />
    <circle cx="78" cy="31" r="7" fill={primary} />
    <circle cx="80" cy="30" r="2.2" fill="#ffffff" />
    <circle cx="80.5" cy="30" r="1" fill="#0f172a" />
    <path d="M84 29 Q 93 31, 90 37 L83 34 Z" fill="#fef08a" />
    {/* Colorful Flapping Wing */}
    <g className="animate-bg-bird-wing">
      <path d="M44 31 Q 48 8, 70 12 Q 62 26, 62 32 Z" fill={secondary} />
      <path d="M46 28 Q 52 10, 68 14 Q 60 24, 58 29 Z" fill="#0284c7" opacity="0.85" />
    </g>
  </svg>
);

const ButterflySvg: React.FC<{ color?: string; delay?: string }> = ({
  color = '#38bdf8',
  delay = '0s',
}) => (
  <div className="animate-bg-flutter" style={{ animationDelay: delay }}>
    <svg viewBox="0 0 48 40" className="w-9 h-8 drop-shadow-sm" aria-hidden="true">
      <g className="animate-bg-bird-wing">
        <path d="M24 22 Q 8 2, 4 18 Q 10 26, 24 24 Z" fill={color} opacity="0.9" />
        <path d="M24 22 Q 40 2, 44 18 Q 38 26, 24 24 Z" fill={color} opacity="0.9" />
        <path d="M24 24 Q 10 26, 12 36 Q 20 34, 24 26 Z" fill="#7dd3fc" opacity="0.85" />
        <path d="M24 24 Q 38 26, 36 36 Q 28 34, 24 26 Z" fill="#7dd3fc" opacity="0.85" />
      </g>
      <rect x="22.8" y="14" width="2.4" height="14" rx="1.2" fill="#0f172a" />
    </svg>
  </div>
);

const CamelCaravanSvg: React.FC = () => (
  <svg viewBox="0 0 220 80" className="w-56 sm:w-64 h-auto drop-shadow-md" aria-hidden="true">
    {/* Lead Camel */}
    <g transform="translate(115, 6)">
      <path
        d="M20 48 L22 68 M30 48 L32 68 M48 48 L46 68 M56 48 L58 68"
        stroke="#78350f"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M16 48 Q 22 30, 34 32 Q 42 18, 50 32 Q 62 32, 68 24 L78 16 Q 84 14, 86 20 Q 82 24, 74 26 L68 44 Q 44 54, 16 48 Z"
        fill="#b45309"
      />
    </g>
    {/* Second Camel */}
    <g transform="translate(22, 14) scale(0.86)">
      <path
        d="M20 48 L22 68 M30 48 L32 68 M48 48 L46 68 M56 48 L58 68"
        stroke="#92400e"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M16 48 Q 22 30, 34 32 Q 42 18, 50 32 Q 62 32, 68 24 L78 16 Q 84 14, 86 20 Q 82 24, 74 26 L68 44 Q 44 54, 16 48 Z"
        fill="#d97706"
      />
    </g>
  </svg>
);

const PenguinIceSvg: React.FC = () => (
  <svg viewBox="0 0 180 70" className="w-44 sm:w-52 h-auto drop-shadow-md" aria-hidden="true">
    {/* Floating Ice Floe */}
    <path d="M10 54 L28 42 L152 44 L172 56 L146 64 L24 64 Z" fill="#e0f2fe" stroke="#bae6fd" strokeWidth="1.5" />
    {/* Penguin 1 */}
    <g transform="translate(54, 12)">
      <ellipse cx="14" cy="24" rx="9" ry="14" fill="#0f172a" />
      <ellipse cx="16" cy="25" rx="5.5" ry="10" fill="#ffffff" />
      <circle cx="15" cy="11" r="6" fill="#0f172a" />
      <path d="M20 10 L26 12 L20 14 Z" fill="#f59e0b" />
    </g>
    {/* Penguin 2 */}
    <g transform="translate(96, 17) scale(0.84)">
      <ellipse cx="14" cy="24" rx="9" ry="14" fill="#0f172a" />
      <ellipse cx="16" cy="25" rx="5.5" ry="10" fill="#ffffff" />
      <circle cx="15" cy="11" r="6" fill="#0f172a" />
      <path d="M20 10 L26 12 L20 14 Z" fill="#f59e0b" />
    </g>
  </svg>
);

const RiverFishArcSvg: React.FC = () => (
  <div className="animate-bg-fish-arc">
    <svg viewBox="0 0 60 32" className="w-12 h-7 drop-shadow-sm" aria-hidden="true">
      <path d="M12 16 Q 28 6, 48 16 Q 28 26, 12 16 Z" fill="#bae6fd" />
      <path d="M14 16 L4 10 L7 16 L4 22 Z" fill="#7dd3fc" />
      <circle cx="40" cy="15" r="1.4" fill="#0f172a" />
    </svg>
  </div>
);

export const AmbientBackgroundWildlife: React.FC<AmbientBackgroundWildlifeProps> = ({
  environment,
  enabled,
}) => {
  if (!enabled) return null;

  return (
    <div
      className="no-print fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. GLOBAL OCEAN / COASTAL TOKYO / OCEANIA: Blue Whales, Sea Turtles & Ocean Birds */}
      {(environment === 'ocean-global' || environment === 'coast-tokyo') && (
        <>
          <div className="absolute top-[11%] left-0 opacity-75 animate-bg-fly-ltr">
            <MigratoryFlock color="#f0f9ff" />
          </div>
          <div className="absolute top-[22%] left-0 opacity-65 animate-bg-fly-rtl">
            <MigratoryBirdSvg color="#bae6fd" sizeClass="w-14 h-9" />
          </div>
          <div className="absolute bottom-[5%] left-0 opacity-80 animate-bg-glide-ltr-slow">
            <BlueWhaleSvg />
          </div>
          <div
            className="absolute bottom-[16%] left-0 opacity-75 animate-bg-glide-rtl"
            style={{ animationDelay: '-12s' }}
          >
            <SeaTurtleSvg flip />
          </div>
        </>
      )}

      {/* 2. OCEANIA / NUSANTARA REEF */}
      {environment === 'continent-oceania' && (
        <>
          <div className="absolute top-[12%] left-0 opacity-80 animate-bg-fly-ltr">
            <MigratoryFlock color="#fef9c3" />
          </div>
          <div className="absolute bottom-[8%] left-0 opacity-85 animate-bg-glide-ltr">
            <SeaTurtleSvg />
          </div>
          <div
            className="absolute bottom-[16%] left-0 opacity-75 animate-bg-glide-rtl"
            style={{ animationDelay: '-14s' }}
          >
            <MantaRaySvg />
          </div>
        </>
      )}

      {/* 3. HIMALAYA / HIGH MOUNTAINS */}
      {environment === 'mountain-himalaya' && (
        <>
          <div className="absolute top-[9%] left-0 opacity-85 animate-bg-fly-ltr">
            <MigratoryFlock color="#ffffff" />
          </div>
          <div
            className="absolute top-[18%] left-0 opacity-75 animate-bg-fly-rtl"
            style={{ animationDelay: '-8s' }}
          >
            <MigratoryFlock color="#e0f2fe" flip />
          </div>
          <div
            className="absolute top-[27%] left-0 opacity-80 animate-bg-glide-ltr-slow"
            style={{ animationDelay: '-5s' }}
          >
            <SoaringEagleSvg color="#334155" headColor="#f8fafc" />
          </div>
          {/* Subtle Misty Mountain Silhouette Along Bottom Edge */}
          <svg
            viewBox="0 0 1200 130"
            preserveAspectRatio="none"
            className="absolute bottom-0 inset-x-0 w-full h-24 sm:h-28 text-[#0c4a6e]/35 fill-current"
          >
            <path d="M0 130 L0 90 L130 42 L250 96 L390 28 L530 88 L680 18 L820 84 L960 36 L1090 88 L1200 44 L1200 130 Z" />
          </svg>
        </>
      )}

      {/* 4. DESERT SAHARA */}
      {environment === 'desert-sahara' && (
        <>
          <div className="absolute top-[13%] left-0 opacity-80 animate-bg-fly-rtl">
            <SoaringEagleSvg color="#92400e" headColor="#fde68a" />
          </div>
          <div
            className="absolute top-[19%] left-0 opacity-70 animate-bg-fly-ltr-slow"
            style={{ animationDelay: '-11s' }}
          >
            <MigratoryFlock color="#fef3c7" />
          </div>
          <div className="absolute bottom-[6%] left-0 opacity-80 animate-bg-glide-ltr-slow">
            <CamelCaravanSvg />
          </div>
          {/* Warm Sand Dune Horizon */}
          <svg
            viewBox="0 0 1200 110"
            preserveAspectRatio="none"
            className="absolute bottom-0 inset-x-0 w-full h-20 text-amber-500/25 fill-current"
          >
            <path d="M0 110 L0 60 Q 240 20, 490 58 T 960 44 Q 1100 32, 1200 54 L1200 110 Z" />
          </svg>
        </>
      )}

      {/* 5. RAINFOREST AMAZON */}
      {environment === 'rainforest-amazon' && (
        <>
          <div className="absolute top-[11%] left-0 opacity-85 animate-bg-fly-ltr">
            <TropicalMacawSvg primary="#ef4444" secondary="#facc15" />
          </div>
          <div
            className="absolute top-[18%] left-0 opacity-80 animate-bg-fly-rtl"
            style={{ animationDelay: '-9s' }}
          >
            <TropicalMacawSvg primary="#10b981" secondary="#38bdf8" />
          </div>
          <div className="absolute top-[30%] left-[4%] opacity-80">
            <ButterflySvg color="#38bdf8" delay="0s" />
          </div>
          <div className="absolute bottom-[22%] right-[5%] opacity-80">
            <ButterflySvg color="#fde047" delay="-2.4s" />
          </div>
          <div className="absolute bottom-[14%] left-[7%] opacity-75">
            <ButterflySvg color="#4ade80" delay="-4.1s" />
          </div>
        </>
      )}

      {/* 6. EUROPE (Atlantik Utara) */}
      {environment === 'continent-europe' && (
        <>
          <div className="absolute top-[10%] left-0 opacity-85 animate-bg-fly-ltr">
            <MigratoryFlock color="#ffffff" />
          </div>
          <div
            className="absolute top-[22%] left-0 opacity-75 animate-bg-fly-rtl"
            style={{ animationDelay: '-10s' }}
          >
            <MigratoryBirdSvg color="#e0f2fe" sizeClass="w-16 h-10" />
          </div>
          <div className="absolute bottom-[7%] left-0 opacity-75 animate-bg-glide-ltr-slow">
            <MantaRaySvg />
          </div>
        </>
      )}

      {/* 7. AFRICA (Savanna & Flamingos) */}
      {environment === 'continent-africa' && (
        <>
          <div className="absolute top-[12%] left-0 opacity-85 animate-bg-fly-ltr">
            <MigratoryFlock color="#fda4af" />
          </div>
          <div
            className="absolute top-[21%] left-0 opacity-80 animate-bg-fly-rtl"
            style={{ animationDelay: '-7s' }}
          >
            <SoaringEagleSvg color="#78350f" headColor="#fed7aa" />
          </div>
          <div className="absolute bottom-[5%] left-0 opacity-75 animate-bg-glide-ltr-slow">
            <CamelCaravanSvg />
          </div>
        </>
      )}

      {/* 8. NORTH AMERICA (Bald Eagle & Humpback Whale) */}
      {environment === 'continent-north-america' && (
        <>
          <div className="absolute top-[12%] left-0 opacity-85 animate-bg-fly-ltr-slow">
            <SoaringEagleSvg color="#451a03" headColor="#ffffff" />
          </div>
          <div className="absolute top-[20%] left-0 opacity-75 animate-bg-fly-rtl">
            <MigratoryFlock color="#f0f9ff" flip />
          </div>
          <div className="absolute bottom-[6%] left-0 opacity-80 animate-bg-glide-rtl">
            <BlueWhaleSvg flip />
          </div>
        </>
      )}

      {/* 9. ANTARCTICA (Polar Blue Whale, Albatross & Penguins) */}
      {environment === 'continent-antarctica' && (
        <>
          <div className="absolute top-[11%] left-0 opacity-80 animate-bg-fly-ltr">
            <SoaringEagleSvg color="#cbd5e1" headColor="#ffffff" />
          </div>
          <div className="absolute bottom-[5%] left-0 opacity-85 animate-bg-glide-ltr-slow">
            <BlueWhaleSvg icy />
          </div>
          <div
            className="absolute bottom-[4%] left-0 opacity-85 animate-bg-glide-rtl"
            style={{ animationDelay: '-16s' }}
          >
            <PenguinIceSvg />
          </div>
        </>
      )}

      {/* 10. PLAINS & RIVERS (Herons, Swallows & Leaping River Fish) */}
      {environment === 'plains-river' && (
        <>
          <div className="absolute top-[11%] left-0 opacity-85 animate-bg-fly-ltr">
            <MigratoryFlock color="#fef9c3" />
          </div>
          <div
            className="absolute top-[20%] left-0 opacity-75 animate-bg-fly-rtl"
            style={{ animationDelay: '-9s' }}
          >
            <MigratoryFlock color="#ffffff" flip />
          </div>
          <div className="absolute bottom-[10%] left-[12%] opacity-80">
            <RiverFishArcSvg />
          </div>
          <div className="absolute bottom-[12%] right-[14%] opacity-80" style={{ animationDelay: '-3.5s' }}>
            <RiverFishArcSvg />
          </div>
        </>
      )}
    </div>
  );
};
