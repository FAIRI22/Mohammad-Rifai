import React, { useState } from 'react';
import { AnimalId } from '../types/geography';

interface AnimatedAnimalCharacterProps {
  animalId: AnimalId;
  isSpeaking?: boolean;
  className?: string;
  onClick?: () => void;
  title?: string;
}

export const AnimatedAnimalCharacter: React.FC<AnimatedAnimalCharacterProps> = ({
  animalId,
  isSpeaking = false,
  className = 'w-full h-full',
  onClick,
  title,
}) => {
  const [hopping, setHopping] = useState(false);

  const handleInteraction = () => {
    setHopping(true);
    setTimeout(() => setHopping(false), 680);
    onClick?.();
  };

  return (
    <div
      onClick={onClick ? handleInteraction : undefined}
      title={title}
      className={`relative select-none overflow-hidden ${
        onClick ? 'cursor-pointer' : ''
      } ${hopping ? 'animate-animal-hop' : isSpeaking ? 'animate-guide-talk' : 'animate-guide-bob'} ${className}`}
    >
      {animalId === 'komodo' && (
        <svg viewBox="0 0 160 160" className="w-full h-full" role="img" aria-label="Komo si Komodo Nusantara">
          <defs>
            <linearGradient id="bgKomodo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="65%" stopColor="#fef9c3" />
              <stop offset="100%" stopColor="#86efac" />
            </linearGradient>
          </defs>
          <rect width="160" height="160" fill="url(#bgKomodo)" />
          {/* Distant Komodo Island hills */}
          <path d="M0 132 Q 35 104, 78 122 T 160 112 L160 160 L0 160 Z" fill="#4ade80" opacity="0.55" />

          {/* Animated Tail */}
          <g className="animate-animal-tail">
            <path d="M36 124 Q 10 116, 16 90 Q 24 88, 30 102 Q 36 112, 48 118 Z" fill="#4d7c0f" stroke="#365314" strokeWidth="2" />
          </g>

          {/* Body */}
          <ellipse cx="78" cy="126" rx="34" ry="26" fill="#65a30d" stroke="#365314" strokeWidth="2.5" />
          <ellipse cx="78" cy="130" rx="22" ry="18" fill="#bef264" />

          {/* Explorer Scarf & Compass Medal */}
          <path d="M52 104 Q 78 120, 104 104 L 98 116 Q 78 126, 58 116 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
          <circle cx="78" cy="118" r="7" fill="#fde047" stroke="#b45309" strokeWidth="2" />
          <circle cx="78" cy="118" r="2.5" fill="#0284c7" />

          {/* Head */}
          <ellipse cx="82" cy="78" rx="33" ry="27" fill="#84cc16" stroke="#365314" strokeWidth="2.5" />
          <ellipse cx="94" cy="84" rx="22" ry="16" fill="#a3e635" />

          {/* Khaki Explorer Hat */}
          <ellipse cx="80" cy="54" rx="38" ry="8" fill="#d97706" stroke="#78350f" strokeWidth="2" />
          <path d="M56 54 Q 60 32, 80 32 Q 100 32, 104 54 Z" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
          <rect x="57" y="47" width="46" height="5" rx="2" fill="#0284c7" />

          {/* Blinking Eyes */}
          <g className="animate-animal-blink">
            <circle cx="68" cy="74" r="6" fill="#ffffff" stroke="#1e293b" strokeWidth="1.8" />
            <circle cx="69" cy="74" r="3.2" fill="#0f172a" />
            <circle cx="70.5" cy="72.5" r="1.2" fill="#ffffff" />

            <circle cx="98" cy="74" r="6" fill="#ffffff" stroke="#1e293b" strokeWidth="1.8" />
            <circle cx="99" cy="74" r="3.2" fill="#0f172a" />
            <circle cx="100.5" cy="72.5" r="1.2" fill="#ffffff" />
          </g>

          {/* Cheeks */}
          <circle cx="58" cy="85" r="4" fill="#fb7185" opacity="0.45" />
          <circle cx="110" cy="85" r="4" fill="#fb7185" opacity="0.45" />

          {/* Mouth & Talking Tongue */}
          <path d="M72 91 Q 88 99, 106 90" fill="none" stroke="#365314" strokeWidth="2.5" strokeLinecap="round" />
          <g className={isSpeaking ? 'animate-animal-talk' : ''}>
            <path d="M84 95 Q 92 104, 98 94 Z" fill="#fb7185" />
          </g>
        </svg>
      )}

      {animalId === 'riko' && (
        <svg viewBox="0 0 160 160" className="w-full h-full" role="img" aria-label="Riko si Burung Tukan Amazon">
          <defs>
            <linearGradient id="bgToucan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#bbf7d0" />
            </linearGradient>
          </defs>
          <rect width="160" height="160" fill="url(#bgToucan)" />
          {/* Rainforest leaves */}
          <ellipse cx="22" cy="140" rx="28" ry="18" fill="#16a34a" opacity="0.7" />
          <ellipse cx="142" cy="138" rx="26" ry="20" fill="#15803d" opacity="0.7" />

          {/* Tail */}
          <g className="animate-animal-tail">
            <path d="M40 120 L16 142 L34 148 L52 126 Z" fill="#0f172a" />
          </g>

          {/* Body */}
          <ellipse cx="70" cy="112" rx="30" ry="34" fill="#0f172a" />
          {/* Golden Chest Bib */}
          <ellipse cx="76" cy="96" rx="20" ry="22" fill="#fde047" />
          <path d="M62 114 Q 76 122, 90 114" fill="none" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />

          {/* Animated Flapping Wing */}
          <g className="animate-animal-wing">
            <path d="M44 96 Q 26 114, 42 136 Q 60 132, 62 104 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          </g>

          {/* Head */}
          <circle cx="72" cy="64" r="26" fill="#0f172a" />
          {/* Explorer Bandana */}
          <path d="M48 54 Q 72 44, 94 54 L90 45 Q 72 36, 52 45 Z" fill="#0284c7" />

          {/* Large Colorful Toucan Beak */}
          <g className={isSpeaking ? 'animate-animal-talk' : ''}>
            <path d="M88 52 Q 142 50, 146 72 Q 144 82, 88 80 Z" fill="#fb923c" stroke="#c2410c" strokeWidth="2" />
            <path d="M132 57 Q 145 62, 146 72 Q 143 79, 132 79 Z" fill="#ef4444" />
            <line x1="90" y1="71" x2="142" y2="71" stroke="#7c2d12" strokeWidth="2" />
          </g>

          {/* Blinking Eye */}
          <circle cx="78" cy="60" r="10" fill="#38bdf8" />
          <g className="animate-animal-blink">
            <circle cx="79" cy="60" r="6" fill="#ffffff" />
            <circle cx="80.5" cy="60" r="3.4" fill="#0f172a" />
            <circle cx="81.8" cy="58.5" r="1.2" fill="#ffffff" />
          </g>
        </svg>
      )}

      {animalId === 'fennec' && (
        <svg viewBox="0 0 160 160" className="w-full h-full" role="img" aria-label="Feni si Rubah Gurun Sahara">
          <defs>
            <linearGradient id="bgFennec" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="60%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fcd34d" />
            </linearGradient>
          </defs>
          <rect width="160" height="160" fill="url(#bgFennec)" />
          <path d="M0 132 Q 48 114, 96 128 T 160 120 L160 160 L0 160 Z" fill="#f59e0b" opacity="0.45" />

          {/* Wagging Fluffy Tail */}
          <g className="animate-animal-tail">
            <path d="M44 128 Q 14 118, 22 92 Q 36 86, 48 112 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
            <circle cx="24" cy="96" r="7" fill="#fef3c7" />
          </g>

          {/* Body */}
          <ellipse cx="80" cy="126" rx="28" ry="26" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
          <ellipse cx="80" cy="130" rx="16" ry="18" fill="#fef3c7" />
          {/* Explorer Blue Bandana */}
          <path d="M58 106 L80 124 L102 106 Z" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />

          {/* Large Wiggling Desert Ears */}
          <g className="animate-animal-ear">
            <path d="M56 64 L22 20 L68 48 Z" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
            <path d="M54 58 L30 28 L64 49 Z" fill="#fda4af" opacity="0.7" />
            <path d="M104 64 L138 20 L92 48 Z" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
            <path d="M106 58 L130 28 L96 49 Z" fill="#fda4af" opacity="0.7" />
          </g>

          {/* Fox Head */}
          <ellipse cx="80" cy="76" rx="30" ry="24" fill="#fcd34d" stroke="#b45309" strokeWidth="2" />
          <ellipse cx="80" cy="84" rx="22" ry="14" fill="#fffbeb" />

          {/* Blinking Eyes */}
          <g className="animate-animal-blink">
            <circle cx="67" cy="74" r="5" fill="#0f172a" />
            <circle cx="68.5" cy="72.5" r="1.6" fill="#ffffff" />
            <circle cx="93" cy="74" r="5" fill="#0f172a" />
            <circle cx="94.5" cy="72.5" r="1.6" fill="#ffffff" />
          </g>

          {/* Nose & Smile */}
          <polygon points="76,84 84,84 80,89" fill="#1e293b" />
          <g className={isSpeaking ? 'animate-animal-talk' : ''}>
            <path d="M74 91 Q 80 96, 86 91" fill="none" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      )}

      {animalId === 'snow-leopard' && (
        <svg viewBox="0 0 160 160" className="w-full h-full" role="img" aria-label="Sora si Macan Tutul Salju Himalaya">
          <defs>
            <linearGradient id="bgSnow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="65%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <rect width="160" height="160" fill="url(#bgSnow)" />
          <path d="M0 130 L42 96 L78 118 L120 88 L160 130 L160 160 L0 160 Z" fill="#cbd5e1" opacity="0.65" />

          {/* Fluffy Spotted Tail */}
          <g className="animate-animal-tail">
            <path d="M44 128 Q 10 120, 18 90 Q 26 86, 32 100 Q 38 114, 52 120 Z" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
            <circle cx="24" cy="100" r="3" fill="#475569" />
            <circle cx="30" cy="114" r="3" fill="#475569" />
          </g>

          {/* Body */}
          <ellipse cx="80" cy="126" rx="30" ry="26" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
          {/* Warm Red-Gold Scarf */}
          <path d="M54 104 Q 80 118, 106 104 L102 115 Q 80 124, 58 115 Z" fill="#e11d48" />

          {/* Ears */}
          <g className="animate-animal-ear">
            <circle cx="56" cy="54" r="10" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
            <circle cx="56" cy="54" r="5" fill="#94a3b8" />
            <circle cx="104" cy="54" r="10" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
            <circle cx="104" cy="54" r="5" fill="#94a3b8" />
          </g>

          {/* Head */}
          <ellipse cx="80" cy="78" rx="30" ry="26" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
          {/* Rosette Spots */}
          <circle cx="62" cy="64" r="3" fill="#64748b" opacity="0.6" />
          <circle cx="98" cy="64" r="3" fill="#64748b" opacity="0.6" />
          <circle cx="80" cy="59" r="2.8" fill="#64748b" opacity="0.55" />

          {/* Ice-blue Blinking Eyes */}
          <g className="animate-animal-blink">
            <circle cx="67" cy="76" r="5.5" fill="#0ea5e9" stroke="#1e293b" strokeWidth="1.5" />
            <circle cx="67.5" cy="76" r="2.6" fill="#0f172a" />
            <circle cx="69" cy="74.5" r="1.2" fill="#ffffff" />

            <circle cx="93" cy="76" r="5.5" fill="#0ea5e9" stroke="#1e293b" strokeWidth="1.5" />
            <circle cx="93.5" cy="76" r="2.6" fill="#0f172a" />
            <circle cx="95" cy="74.5" r="1.2" fill="#ffffff" />
          </g>

          {/* Muzzle */}
          <ellipse cx="80" cy="88" rx="12" ry="8" fill="#ffffff" />
          <polygon points="76,84 84,84 80,88" fill="#fb7185" />
          <g className={isSpeaking ? 'animate-animal-talk' : ''}>
            <path d="M74 91 Q 80 96, 86 91" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      )}

      {animalId === 'hachi' && (
        <svg viewBox="0 0 160 160" className="w-full h-full" role="img" aria-label="Hachi si Shiba Penjelajah Tokyo">
          <defs>
            <linearGradient id="bgTokyo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#fde68a" />
            </linearGradient>
          </defs>
          <rect width="160" height="160" fill="url(#bgTokyo)" />
          {/* Tokyo Skyline Silhouette */}
          <path d="M10 160 L10 116 L28 116 L28 104 L46 104 L46 160 Z" fill="#64748b" opacity="0.3" />
          <path d="M114 160 L114 102 L134 102 L134 114 L150 114 L150 160 Z" fill="#64748b" opacity="0.3" />

          {/* Curled Shiba Tail */}
          <g className="animate-animal-tail">
            <circle cx="38" cy="118" r="14" fill="#ea580c" stroke="#9a3412" strokeWidth="2" />
            <circle cx="40" cy="118" r="6" fill="#ffedd5" />
          </g>

          {/* Body */}
          <ellipse cx="80" cy="126" rx="28" ry="25" fill="#f97316" stroke="#9a3412" strokeWidth="2" />
          <ellipse cx="80" cy="128" rx="17" ry="18" fill="#fff7ed" />
          {/* Teal Explorer Collar */}
          <path d="M56 104 Q 80 116, 104 104 L100 114 Q 80 122, 60 114 Z" fill="#0d9488" />
          <circle cx="80" cy="116" r="5" fill="#fde047" />

          {/* Pointy Wiggling Ears */}
          <g className="animate-animal-ear">
            <path d="M52 66 L44 36 L68 52 Z" fill="#ea580c" stroke="#9a3412" strokeWidth="2" />
            <path d="M53 62 L48 43 L64 53 Z" fill="#ffedd5" />
            <path d="M108 66 L116 36 L92 52 Z" fill="#ea580c" stroke="#9a3412" strokeWidth="2" />
            <path d="M107 62 L112 43 L96 53 Z" fill="#ffedd5" />
          </g>

          {/* Head */}
          <ellipse cx="80" cy="78" rx="31" ry="26" fill="#f97316" stroke="#9a3412" strokeWidth="2" />
          <path d="M52 84 Q 80 68, 108 84 Q 108 104, 80 104 Q 52 104, 52 84 Z" fill="#fff7ed" />
          {/* Cute Shiba Eyebrow Dots */}
          <ellipse cx="66" cy="66" rx="4" ry="2.5" fill="#fff7ed" />
          <ellipse cx="94" cy="66" rx="4" ry="2.5" fill="#fff7ed" />

          {/* Blinking Eyes */}
          <g className="animate-animal-blink">
            <circle cx="67" cy="75" r="4.8" fill="#0f172a" />
            <circle cx="68.5" cy="73.5" r="1.5" fill="#ffffff" />
            <circle cx="93" cy="75" r="4.8" fill="#0f172a" />
            <circle cx="94.5" cy="73.5" r="1.5" fill="#ffffff" />
          </g>

          {/* Nose & Cheerful Smile */}
          <polygon points="76,84 84,84 80,88" fill="#0f172a" />
          <g className={isSpeaking ? 'animate-animal-talk' : ''}>
            <path d="M72 91 Q 80 97, 88 91" fill="none" stroke="#7c2d12" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        </svg>
      )}

      {animalId === 'deer' && (
        <svg viewBox="0 0 160 160" className="w-full h-full" role="img" aria-label="Dara si Rusa Dataran">
          <defs>
            <linearGradient id="bgDeer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="70%" stopColor="#d9f99d" />
              <stop offset="100%" stopColor="#84cc16" />
            </linearGradient>
          </defs>
          <rect width="160" height="160" fill="url(#bgDeer)" />
          <g className="animate-animal-tail">
            <ellipse cx="42" cy="120" rx="8" ry="12" fill="#fef3c7" stroke="#92400e" strokeWidth="1.5" />
          </g>
          <ellipse cx="80" cy="126" rx="28" ry="26" fill="#d97706" stroke="#78350f" strokeWidth="2" />
          <circle cx="64" cy="122" r="3" fill="#fef3c7" />
          <circle cx="96" cy="124" r="3" fill="#fef3c7" />
          <circle cx="72" cy="134" r="2.5" fill="#fef3c7" />

          {/* Antlers */}
          <path d="M64 52 L54 26 M59 38 L46 34 M96 52 L106 26 M101 38 L114 34" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
          <g className="animate-animal-ear">
            <ellipse cx="52" cy="64" rx="12" ry="6" transform="rotate(-25 52 64)" fill="#d97706" />
            <ellipse cx="108" cy="64" rx="12" ry="6" transform="rotate(25 108 64)" fill="#d97706" />
          </g>
          <ellipse cx="80" cy="78" rx="26" ry="24" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
          <ellipse cx="80" cy="88" rx="14" ry="10" fill="#fef3c7" />
          <g className="animate-animal-blink">
            <circle cx="68" cy="75" r="4.8" fill="#0f172a" />
            <circle cx="69.5" cy="73.5" r="1.5" fill="#ffffff" />
            <circle cx="92" cy="75" r="4.8" fill="#0f172a" />
            <circle cx="93.5" cy="73.5" r="1.5" fill="#ffffff" />
          </g>
          <polygon points="76,85 84,85 80,89" fill="#1e293b" />
          <g className={isSpeaking ? 'animate-animal-talk' : ''}>
            <path d="M74 92 Q 80 96, 86 92" fill="none" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      )}

      {animalId === 'otter' && (
        <svg viewBox="0 0 160 160" className="w-full h-full" role="img" aria-label="Beri si Berang-berang Sungai">
          <defs>
            <linearGradient id="bgOtter" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="65%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          <rect width="160" height="160" fill="url(#bgOtter)" />
          <path d="M0 112 Q 40 104, 80 112 T 160 112" fill="none" stroke="#e0f2fe" strokeWidth="3" opacity="0.65" />

          <g className="animate-animal-tail">
            <path d="M46 128 Q 16 122, 22 100 Q 34 102, 52 120 Z" fill="#78350f" />
          </g>
          <ellipse cx="80" cy="124" rx="29" ry="26" fill="#92400e" stroke="#451a03" strokeWidth="2" />
          <ellipse cx="80" cy="126" rx="18" ry="18" fill="#fde68a" />

          <g className="animate-animal-ear">
            <circle cx="54" cy="56" r="8" fill="#92400e" stroke="#451a03" strokeWidth="2" />
            <circle cx="106" cy="56" r="8" fill="#92400e" stroke="#451a03" strokeWidth="2" />
          </g>
          <ellipse cx="80" cy="76" rx="28" ry="24" fill="#b45309" stroke="#451a03" strokeWidth="2" />
          <ellipse cx="80" cy="84" rx="20" ry="13" fill="#fef3c7" />

          <g className="animate-animal-blink">
            <circle cx="67" cy="72" r="4.6" fill="#0f172a" />
            <circle cx="68.5" cy="70.5" r="1.4" fill="#ffffff" />
            <circle cx="93" cy="72" r="4.6" fill="#0f172a" />
            <circle cx="94.5" cy="70.5" r="1.4" fill="#ffffff" />
          </g>
          <ellipse cx="80" cy="82" rx="5.5" ry="3.8" fill="#1e293b" />
          <g className={isSpeaking ? 'animate-animal-talk' : ''}>
            <path d="M73 89 Q 80 94, 87 89" fill="none" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      )}

      {animalId === 'turtle' && (
        <svg viewBox="0 0 160 160" className="w-full h-full" role="img" aria-label="Peni si Penyu Pesisir">
          <defs>
            <linearGradient id="bgTurtle" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="65%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>
          <rect width="160" height="160" fill="url(#bgTurtle)" />
          <circle cx="28" cy="40" r="4" fill="#e0f2fe" opacity="0.6" />
          <circle cx="132" cy="54" r="5" fill="#e0f2fe" opacity="0.5" />

          {/* Animated Flippers */}
          <g className="animate-animal-wing">
            <ellipse cx="42" cy="108" rx="18" ry="9" transform="rotate(-25 42 108)" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
            <ellipse cx="118" cy="108" rx="18" ry="9" transform="rotate(25 118 108)" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
          </g>

          {/* Hexagonal Shell */}
          <ellipse cx="80" cy="108" rx="34" ry="32" fill="#0d9488" stroke="#115e59" strokeWidth="3" />
          <polygon points="80,88 94,98 90,116 70,116 66,98" fill="#14b8a6" stroke="#fde047" strokeWidth="2" />

          {/* Head */}
          <circle cx="80" cy="56" r="22" fill="#4ade80" stroke="#15803d" strokeWidth="2.5" />
          <g className="animate-animal-blink">
            <circle cx="71" cy="54" r="4.5" fill="#0f172a" />
            <circle cx="72" cy="52.5" r="1.4" fill="#ffffff" />
            <circle cx="89" cy="54" r="4.5" fill="#0f172a" />
            <circle cx="90" cy="52.5" r="1.4" fill="#ffffff" />
          </g>
          <g className={isSpeaking ? 'animate-animal-talk' : ''}>
            <path d="M73 64 Q 80 69, 87 64" fill="none" stroke="#14532d" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        </svg>
      )}
    </div>
  );
};
