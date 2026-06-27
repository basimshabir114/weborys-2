import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { cx } from '../lib/utils';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('weborys_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('weborys_cookie_consent', 'accepted');
    setClosing(true);
    setTimeout(() => setVisible(false), 300);
  };

  const handleDecline = () => {
    localStorage.setItem('weborys_cookie_consent', 'declined');
    setClosing(true);
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <div
      className={cx(
        'fixed bottom-6 left-6 z-50 max-w-md rounded-3xl border border-white/[0.08] bg-ink-900/95 p-6 shadow-2xl backdrop-blur-xl transition-all',
        closing ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-400/10">
          <Cookie className="h-5 w-5 text-gold-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-white">Cookie Preferences</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
          </p>
          <div className="mt-4 flex gap-3">
            <button onClick={handleAccept} className="btn-primary py-2.5">
              Accept All
            </button>
            <button onClick={handleDecline} className="btn-ghost py-2.5">
              Decline
            </button>
          </div>
        </div>
        <button
          onClick={handleDecline}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-white/[0.04] hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
