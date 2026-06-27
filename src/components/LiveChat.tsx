import { useState } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { cx } from '../lib/utils';

const QUICK_REPLIES = [
  'I need a new website',
  'I want to redesign my site',
  'Tell me about pricing',
  'Schedule a call',
];

export function LiveChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([
    { from: 'bot', text: 'Hi there! 👋 How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const handleSend = (text?: string) => {
    const message = text || input.trim();
    if (!message) return;

    setMessages((prev) => [...prev, { from: 'user', text: message }]);
    setInput('');
    setTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setTyping(false);
      const responses: Record<string, string> = {
        'I need a new website': 'Great! I would love to help you build a stunning new website. Would you like to tell me more about your project, or check out our pricing page at /pricing?',
        'I want to redesign my site': 'Refreshing your website can make a huge difference! Share some details about your current site and what you would like to improve.',
        'Tell me about pricing': 'Our packages start at ₹49,999 for a starter site up to ₹4,99,999 for enterprise solutions. Check out /pricing for full details!',
        'Schedule a call': 'I can help you schedule a call with our team! Please share your preferred date and time, or email us at b53595205@gmail.com.',
      };
      const response = responses[message] || 'Thanks for your message! Our team typically responds within a few hours. For urgent inquiries, email b53595205@gmail.com or call +91 9149960912.';
      setMessages((prev) => [...prev, { from: 'bot', text: response }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setOpen(true)}
        className={cx(
          'fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-cosmic-400 text-ink-950 shadow-lg transition-all hover:bg-cosmic-300 hover:shadow-glow',
          open && 'hidden'
        )}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      <div
        className={cx(
          'fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] rounded-3xl border border-white/[0.08] bg-ink-900 shadow-2xl backdrop-blur-xl transition-all',
          open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cosmic-400/10">
              <MessageCircle className="h-5 w-5 text-cosmic-300" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Weborys Support</div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-success-400" />
                Online
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/[0.04] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cx(
                  'flex',
                  msg.from === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cx(
                    'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm',
                    msg.from === 'user'
                      ? 'bg-cosmic-400 text-ink-950'
                      : 'bg-ink-800 text-slate-200'
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl bg-ink-800 px-4 py-2.5">
                  <Loader2 className="h-4 w-4 animate-spin text-cosmic-400" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Replies */}
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 border-t border-white/[0.06] px-4 py-3">
            {QUICK_REPLIES.map((reply) => (
              <button
                key={reply}
                onClick={() => handleSend(reply)}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-cosmic-400/30 hover:bg-cosmic-400/10 hover:text-cosmic-300"
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="border-t border-white/[0.06] p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="input flex-1 py-2.5"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="btn-primary h-11 w-11 !p-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
