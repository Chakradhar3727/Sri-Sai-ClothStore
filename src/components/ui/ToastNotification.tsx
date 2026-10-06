import React, { useEffect, useRef } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastData {
  id?: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

interface ToastNotificationProps {
  toast: ToastData | null;
  onClose: () => void;
  duration?: number;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  toast,
  onClose,
  duration = 7500,
}) => {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onCloseRef.current();
    }, duration);
    return () => clearTimeout(timer);
  }, [toast, duration]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';
  const isInfo = toast.type === 'info';

  return (
    <>
      <style>{`
        @keyframes shrinkToastProgress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
      <div className="fixed bottom-6 right-6 z-[100] max-w-sm w-full animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-auto">
        <div
          className={`relative flex items-start gap-3 p-4 rounded-2xl shadow-2xl backdrop-blur-xl border overflow-hidden ${
            isSuccess
              ? 'bg-[#0E1511] border-emerald-500/60 shadow-[0_10px_30px_rgba(16,185,129,0.25)]'
              : isError
              ? 'bg-[#180E10] border-rose-500/60 shadow-[0_10px_30px_rgba(244,63,94,0.25)]'
              : 'bg-[#16120E] border-dasara-gold/60 shadow-[0_10px_30px_rgba(212,175,55,0.25)]'
          }`}
          role="alert"
        >
          <div className="mt-0.5 shrink-0">
            {isSuccess && (
              <div className="h-7 w-7 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            )}
            {isError && (
              <div className="h-7 w-7 rounded-full bg-rose-950/80 border border-rose-500/50 flex items-center justify-center text-rose-400">
                <AlertCircle className="h-4 w-4" />
              </div>
            )}
            {isInfo && (
              <div className="h-7 w-7 rounded-full bg-amber-950/80 border border-dasara-gold/50 flex items-center justify-center text-dasara-gold">
                <Info className="h-4 w-4" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 pr-2">
            <h4
              className={`text-xs font-bold font-serif ${
                isSuccess
                  ? 'text-emerald-300'
                  : isError
                  ? 'text-rose-300'
                  : 'text-dasara-goldLight'
              }`}
            >
              {toast.title}
            </h4>
            <p className="text-[11px] text-zinc-300 mt-0.5 leading-relaxed break-words font-sans">
              {toast.message}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition shrink-0 cursor-pointer"
            aria-label="Close notification"
          >
            <X className="h-3.5 w-3.5" />
          </button>

          {/* Auto-dismiss countdown bar */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-zinc-800/80 overflow-hidden">
            <div
              className={`h-full ${
                isSuccess ? 'bg-emerald-400' : isError ? 'bg-rose-400' : 'bg-dasara-gold'
              }`}
              style={{
                animation: `shrinkToastProgress ${duration}ms linear forwards`,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
