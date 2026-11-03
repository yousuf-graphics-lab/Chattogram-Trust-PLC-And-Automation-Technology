import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, MessageCircle, Send, X } from 'lucide-react';
import type { ChatMessage } from '@/types';
import { waLink } from '@/lib/site';
import { uid } from '@/lib/storage';
import { answer, SUGGESTIONS } from '@/lib/assistant';

const now = () =>
  new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'bot',
      text: 'আসসালামু আলাইকুম! 👋 আমি Trust Assist। বাংলা, English বা Banglish-এ প্রশ্ন করুন — কোর্স ফি, ভর্তি, লোকেশন, ট্রেইনার অথবা PLC/SCADA/VFD-এর মতো টেকনিক্যাল বিষয়েও জানতে পারেন।',
      time: now(),
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    const userMsg: ChatMessage = { id: uid('u'), role: 'user', text: trimmed, time: now() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);
    const reply = answer(trimmed);
    const delay = 600 + Math.min(reply.length * 4, 1200);
    window.setTimeout(() => {
      setMessages((m) => [...m, { id: uid('b'), role: 'bot', text: reply, time: now() }]);
      setTyping(false);
    }, delay);
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-4 z-50 flex items-center gap-2 rounded-md bg-electric px-4 py-3 text-xs font-bold text-white shadow-card sm:right-6"
        aria-label={open ? 'Close assistant' : 'Open AI assistant'}
      >
        {open ? <X size={16} /> : <MessageCircle size={16} />}
        {!open && <span>Trust Assist</span>}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="glass-strong fixed bottom-36 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden shadow-card sm:right-6"
            style={{ height: 'min(560px, calc(100vh - 200px))' }}
            role="dialog"
            aria-label="Chattogram Trust AI assistant"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-line bg-electric px-4 py-3 text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <Bot size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-extrabold">Trust Assist</div>
                <div className="flex items-center gap-1.5 text-[10px] text-white/80">
                  <span className="h-1.5 w-1.5 animate-blink rounded-full bg-green-300" />
                  Online • বাংলা / English / Banglish
                </div>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-lg p-1.5 hover:bg-white/15">
                <X size={18} />
              </button>
            </div>

            {/* messages */}
            <div className="flex-1 space-y-3 overflow-y-auto bg-base/40 px-3 py-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      m.role === 'user'
                        ? 'rounded-br-md bg-electric text-white'
                        : 'rounded-bl-md border border-line bg-surface text-ink'
                    }`}
                  >
                    {m.text}
                    <div className={`mt-1 text-[9px] ${m.role === 'user' ? 'text-white/85' : 'text-muted'}`}>
                      {m.time}
                    </div>
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-line bg-surface px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-2 w-2 animate-bounce rounded-full bg-glow"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* quick replies */}
            <div className="no-scrollbar flex gap-1.5 overflow-x-auto border-t border-line bg-surface/60 px-3 py-2">
              {SUGGESTIONS.map((q) => (
                <button
                  key={q.label}
                  type="button"
                  onClick={() => send(q.text)}
                  className="shrink-0 rounded-full border border-glow/30 bg-glow/10 px-3 py-1 text-[11px] font-semibold text-glow transition-colors hover:bg-glow/20"
                >
                  {q.label}
                </button>
              ))}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-line bg-surface px-3 py-2.5"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="প্রশ্ন লিখুন... / Ask anything..."
                className="input !rounded-full !py-2.5 text-[13px]"
                aria-label="Chat message"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-electric text-white transition-all hover:bg-electric-600 disabled:opacity-40"
                aria-label="Send message"
              >
                <Send size={17} />
              </button>
            </form>
            <a
              href={waLink('আসসালামু আলাইকুম, আমি কোর্স সম্পর্কে জানতে চাই।')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 border-t border-line bg-whatsapp/10 py-2 text-[11px] font-bold text-whatsapp transition-colors hover:bg-whatsapp/20"
            >
              <MessageCircle size={13} />
              সরাসরি WhatsApp-এ কথা বলুন
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
