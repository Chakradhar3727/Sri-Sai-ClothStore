import React, { useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  perspective?: number;
  glareOpacity?: number;
}

export const TiltedCard: React.FC<TiltedCardProps> = ({
  children,
  className = '',
  maxTilt = 8,
  scale = 1.02,
  perspective = 1200,
  glareOpacity = 0.22,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const isTouchDevice = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch capability to ensure smooth vertical mobile scroll
    if (window.matchMedia('(hover: none)').matches) {
      isTouchDevice.current = true;
    }
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice.current || !cardRef.current || !innerRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const tiltX = ((y - centerY) / centerY) * -maxTilt;
      const tiltY = ((x - centerX) / centerX) * maxTilt;

      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        if (innerRef.current) {
          innerRef.current.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale}, ${scale}, ${scale})`;
        }
        if (glareRef.current) {
          const glareX = 50 + ((x - centerX) / centerX) * 35;
          const glareY = 50 + ((y - centerY) / centerY) * 35;
          glareRef.current.style.opacity = `${glareOpacity}`;
          glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(245, 208, 110, 0.45) 0%, rgba(245, 208, 110, 0) 65%)`;
        }
      });
    },
    [maxTilt, scale, glareOpacity]
  );

  const handleMouseEnter = useCallback(() => {
    if (isTouchDevice.current || !innerRef.current) return;
    innerRef.current.style.transition = 'transform 0.1s ease-out';
    if (glareRef.current) {
      glareRef.current.style.opacity = `${glareOpacity * 0.5}`;
    }
  }, [glareOpacity]);

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    if (innerRef.current) {
      innerRef.current.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      innerRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn('relative will-change-transform', className)}
      style={{
        perspective: `${perspective}px`,
      }}
    >
      <div
        ref={innerRef}
        className="w-full h-full ease-out will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          willChange: 'transform',
        }}
      >
        {children}

        {/* Dynamic Specular Glare Overlay */}
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 z-40 rounded-[inherit] overflow-hidden opacity-0 transition-opacity duration-300 will-change-transform"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(245, 208, 110, 0.45) 0%, rgba(245, 208, 110, 0) 65%)',
          }}
        />
      </div>
    </div>
  );
};
