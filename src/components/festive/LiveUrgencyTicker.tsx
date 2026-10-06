import React, { useState, useEffect } from 'react';
import { MOCK_LIVE_BOOKINGS } from '@/data/guilds';
import { LiveBookingEvent } from '@/types/guild.types';
import { MessageCircle, Video, Package, X, Sparkles, ExternalLink } from 'lucide-react';

interface Props {
  onSelectSku?: (sku: string) => void;
}

export const LiveUrgencyTicker: React.FC<Props> = ({ onSelectSku }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isDismissed || isPaused) return;

    const interval = setInterval(() => {
      // Fade out, switch event, fade back in
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % MOCK_LIVE_BOOKINGS.length);
        setIsVisible(true);
      }, 400);
    }, 7000);

    return () => clearInterval(interval);
  }, [isDismissed, isPaused]);

  if (isDismissed || MOCK_LIVE_BOOKINGS.length === 0) return null;

  const currentEvent: LiveBookingEvent = MOCK_LIVE_BOOKINGS[currentIndex] || MOCK_LIVE_BOOKINGS[0];

  const getActionBadge = () => {
    switch (currentEvent.actionType) {
      case 'whatsapp_trial':
        return {
          icon: <Video className="h-3.5 w-3.5 text-emerald-400" />,
          label: 'Live Video Trial Requested',
          color: 'text-emerald-400',
        };
      case 'direct_booking':
        return {
          icon: <MessageCircle className="h-3.5 w-3.5 text-dasara-gold" />,
          label: 'Reserved Over WhatsApp',
          color: 'text-dasara-gold',
        };
      case 'lot_unpacked':
      default:
        return {
          icon: <Package className="h-3.5 w-3.5 text-amber-400" />,
          label: 'Fresh Maal Lot Unpacked',
          color: 'text-amber-400',
        };
    }
  };

  const badge = getActionBadge();

  const handleCardClick = () => {
    if (onSelectSku && currentEvent.sareeSku) {
      onSelectSku(currentEvent.sareeSku);
    }
  };

  return (
    <aside
      aria-label="Live festive customer booking notifications"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`fixed bottom-4 left-4 right-4 sm:right-auto sm:left-5 z-40 sm:max-w-sm rounded-2xl border border-dasara-gold/40 bg-gradient-to-br from-[#1A0E15]/95 via-black/95 to-[#120B10]/95 p-3.5 shadow-2xl backdrop-blur-xl transition-all duration-400 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={handleCardClick}
          className="flex items-start gap-3 text-left flex-1 min-w-0 cursor-pointer group/toast"
          title={`Click to view ${currentEvent.sareeName}`}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-dasara-maroon/90 border border-dasara-gold/40 shadow-md group-hover/toast:border-dasara-gold transition-colors">
            <Sparkles className="h-4 w-4 text-dasara-gold animate-pulse" />
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold truncate ${badge.color}`}>
                {badge.icon}
                <span className="truncate">{badge.label}</span>
              </span>
              <span className="text-[10px] text-zinc-500 font-mono shrink-0">
                {currentEvent.timestampMinutesAgo}m ago
              </span>
            </div>

            <p className="text-xs text-white font-medium truncate group-hover/toast:text-dasara-goldLight transition-colors">
              {currentEvent.sareeName}
            </p>

            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] text-zinc-400 truncate">
                {currentEvent.customerInitial} from <strong className="text-zinc-200">{currentEvent.customerCity}</strong>
              </p>
              <span className="text-[9px] font-mono text-dasara-gold/80 flex items-center gap-0.5 shrink-0 opacity-0 group-hover/toast:opacity-100 transition-opacity">
                <span>View</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </span>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsDismissed(true);
          }}
          className="text-zinc-500 hover:text-zinc-300 p-0.5 rounded transition cursor-pointer shrink-0"
          aria-label="Dismiss live alert"
          title="Dismiss notification"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </aside>
  );
};
