import React from 'react';
import { cn } from '@/lib/utils';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = '',
}) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={cn(
        'inline-block bg-clip-text text-transparent font-serif',
        disabled
          ? 'text-white'
          : 'bg-gradient-to-r from-dasara-gold via-dasara-goldLight to-dasara-gold bg-[200%_auto] animate-shimmer',
        className
      )}
      style={{
        animationDuration,
        backgroundImage: 'linear-gradient(110deg, #D4AF37 0%, #FFF3C4 25%, #F5C75D 50%, #D4AF37 75%, #AA7C11 100%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
      }}
    >
      {text}
    </span>
  );
};
