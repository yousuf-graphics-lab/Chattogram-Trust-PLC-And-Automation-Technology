import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Bot, Send } from "lucide-react";
import { answerQuestion } from "../lib/assistant";
import type { AssistantReply } from "../lib/assistant";
import { whatsappUrl } from "../data/brand";
import { Button, Modal } from "./ui";

interface ChatMessage extends AssistantReply {
  id: number;
  role: "assistant" | "user";
}
const initialMessage: ChatMessage = {
  id: 0,
  role: "assistant",
  text: "আসসালামু আলাইকুম! 👋\nI’m your training assistant. কোর্স, ফি, ভর্তি বা ঠিকানা—কী জানতে চান?\n\nAsk in Bangla, English or Banglish.",
};
const suggestions = [
  "Course fees · কোর্স ফি",
  "ভর্তি কীভাবে করব?",
  "Location · ঠিকানা",
  "Trainer details",
];

export function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.3-6.2-3.5-8.4ZM12.1 21.7a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 18.3-5.1 9.9 9.9 0 0 1-9.9 9.8Zm5.4-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6L8.6 6.8c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.8.4-.3.3-1.1 1-1.1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.4 5.4 4.8.8.3 1.3.5 1.8.7.8.2 1.5.2 2 .1.6-.1 1.8-.7 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.5Z" />
    </svg>
  );
}

export function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [typing, setTyping] = useState(false);
  const nextId = useRef(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing, open]);
  function send(text: string) {
    const clean = text.trim().slice(0, 500);
    if (!clean || typing) return;
    setMessages((current) => [
      ...current,
      { id: nextId.current++, role: "user", text: clean },
    ]);
    setInput("");
    setTyping(true);
    timer.current = setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: nextId.current++, role: "assistant", ...answerQuestion(clean) },
      ]);
      setTyping(false);
    }, 550);
  }
  return (
    <>
      <div className="floating-utilities">
        <a
          className="float-button float-whatsapp"
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
        >
          <WhatsAppIcon size={25} />
          <span className="float-tooltip">WhatsApp Inquiry</span>
        </a>
        <button
          className="float-button float-assistant"
          onClick={() => setOpen(true)}
          aria-label="Open training assistant"
          aria-expanded={open}
        >
          <Bot size={24} />
          <span className="float-tooltip">Ask our training assistant</span>
        </button>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Training assistant"
        className="chat-modal"
      >
        <div
          className="chat-messages"
          ref={scrollRef}
          role="log"
          aria-live="polite"
          aria-label="Chat messages"
        >
          {messages.map((message) => (
            <div key={message.id} className={`chat-message ${message.role}`}>
              <p>{message.text}</p>
              {message.link &&
                (message.link.external ? (
                  <a
                    href={message.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-cyan-500 dark:text-cyan-400"
                  >
                    {message.link.label}
                    <ArrowUpRight size={12} />
                  </a>
                ) : (
                  <Link
                    to={message.link.url}
                    onClick={() => setOpen(false)}
                    className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-cyan-500 dark:text-cyan-400"
                  >
                    {message.link.label}
                    <ArrowUpRight size={12} />
                  </Link>
                ))}
            </div>
          ))}
          {typing && (
            <div
              className="chat-message"
              aria-label="Assistant is preparing an answer"
            >
              <span className="typing-dots">
                <i />
                <i />
                <i />
              </span>
            </div>
          )}
        </div>
        <div className="chat-suggestions">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => send(suggestion)}
              disabled={typing}
            >
              {suggestion}
            </button>
          ))}
        </div>
        <form
          className="chat-form"
          onSubmit={(event) => {
            event.preventDefault();
            send(input);
          }}
        >
          <label htmlFor="chat-input" className="sr-only">
            Your question in Bangla, English or Banglish
          </label>
          <input
            id="chat-input"
            className="field"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            maxLength={500}
            placeholder="Ask a question… আপনি লিখুন"
            autoComplete="off"
          />
          <Button
            type="submit"
            disabled={!input.trim() || typing}
            aria-label="Send message"
          >
            <Send size={16} />
          </Button>
        </form>
        <p className="chat-note">
          Built-in guidance, not a live advisor. Confirm details with our team.
        </p>
      </Modal>
    </>
  );
}
