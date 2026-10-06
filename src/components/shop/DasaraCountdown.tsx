import React, { useState, useEffect } from 'react';

export const DasaraCountdown: React.FC = () => {
  // 10-day countdown target from today
  const [timeLeft, setTimeLeft] = useState({
    days: 9,
    hours: 14,
    minutes: 38,
    seconds: 45,
  });

  useEffect(() => {
    // 10 days ahead festive window
    const target = new Date();
    target.setDate(target.getDate() + 9);
    target.setHours(target.getHours() + 14);
    target.setMinutes(target.getMinutes() + 38);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = target.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'DAYS', value: String(timeLeft.days).padStart(2, '0') },
    { label: 'HOURS', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'MINUTES', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'SECONDS', value: String(timeLeft.seconds).padStart(2, '0') },
  ];

  return (
    <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-dasara-gold/15 via-dasara-gold/45 to-dasara-gold/15 shadow-[0_0_35px_rgba(212,175,55,0.08)]">
      <div className="rounded-2xl bg-gradient-to-r from-[#140C11]/90 via-[#0E0C0F]/95 to-[#160B12]/90 backdrop-blur-xl px-5 sm:px-8 py-4 sm:py-5 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-8">
        {/* Understated Typography & Event Status */}
        <div className="flex items-center gap-3.5 text-center md:text-left">
          <div className="hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-dasara-gold/10 border border-dasara-gold/30 text-dasara-gold shadow-[0_0_12px_rgba(212,175,55,0.2)]">
            <span className="text-xs">✦</span>
          </div>
          <div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h3 className="font-serif text-sm sm:text-base tracking-wide font-medium text-dasara-champagne">
                Dasara Grand Festive Utsav
              </h3>
              <span className="text-dasara-gold/40 text-xs hidden sm:inline">•</span>
              <span className="text-[11px] sm:text-xs font-sans tracking-widest uppercase font-semibold text-dasara-goldLight">
                Limited 10-Day Window
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-sans tracking-normal mt-0.5">
              Direct loom wholesale pricing active throughout the auspicious festive window
            </p>
          </div>
        </div>

        {/* Haute Horlogerie Minimalist Digits (No Cluttered Boxes) */}
        <div className="flex items-center gap-4 sm:gap-7">
          {timeUnits.map((unit, idx) => (
            <React.Fragment key={unit.label}>
              <div className="flex flex-col items-center">
                {/* Thin Gold Numerals with Refined Letter-Spacing */}
                <span className="font-serif text-2xl sm:text-3xl font-light tracking-[0.08em] tabular-nums text-transparent bg-clip-text bg-gradient-to-b from-[#FFF3D1] via-[#D4AF37] to-[#A37B1B] drop-shadow-sm">
                  {unit.value}
                </span>
                <span className="text-[9px] font-sans font-medium tracking-[0.25em] text-dasara-gold/70 uppercase mt-0.5">
                  {unit.label}
                </span>
              </div>
              {idx < 3 && (
                <span className="text-dasara-gold/30 font-light text-xl -mt-3 select-none">
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
