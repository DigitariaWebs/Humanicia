"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useModal } from "@/components/providers/ModalProvider";

type ChatRole = "bot" | "user";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

const FAQ_ENTRIES: Array<{ keywords: string[]; answer: string }> = [
  {
    keywords: ["service", "services", "offer", "what do you do"],
    answer:
      "We provide friendly companionship and assistance: calls, video chats and in‑person activities. Ask about 'contact', 'hours', or 'pricing'.",
  },
  {
    keywords: ["hour", "hours", "when", "time", "open"],
    answer:
      "Our helpers are available Monday–Friday, 9:00–18:00. For special requests, just leave a message via 'contact'.",
  },
  {
    keywords: ["price", "pricing", "cost", "fee"],
    answer:
      "Pricing depends on the service type. Send us a quick message with what you need and we'll reply shortly.",
  },
  {
    keywords: ["contact", "email", "phone", "reach"],
    answer:
      "You can write via the contact form on the page or send an email to contact@humanicia.example. We'll get back to you fast!",
  },
];

function makeId() {
  return Math.random().toString(36).slice(2);
}

function replyFor(input: string): string {
  const text = input.toLowerCase();
  for (const entry of FAQ_ENTRIES) {
    if (entry.keywords.some((k) => text.includes(k))) {
      return entry.answer;
    }
  }
  return "Thanks! I'm a simple helper. Ask about services, hours, pricing or contact, and I'll guide you.";
}

export default function ChatWidget() {
  const { isModalOpen } = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: makeId(),
      role: "bot",
      content: "Hello! I'm here to help. What can I do for you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [bannerOffset, setBannerOffset] = useState(0);

  useEffect(() => {
    const saved =
      typeof window !== "undefined" ? localStorage.getItem("chat:open") : null;
    if (saved === "1") {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chat:open", isOpen ? "1" : "0");
    }
  }, [isOpen]);

  // Observe the promotional banner and update bottom offset so chat floats above it
  useEffect(() => {
    if (typeof window === "undefined") return;
    const banner = document.getElementById("promotional-banner");

    function update() {
      if (banner) {
        const rect = banner.getBoundingClientRect();
        // When fixed at bottom, height is the visible height
        setBannerOffset(Math.ceil(rect.height));
      } else {
        setBannerOffset(0);
      }
    }

    update();

    const GlobalResizeObserver = (window as Window & typeof globalThis)
      .ResizeObserver;
    const ro = GlobalResizeObserver ? new GlobalResizeObserver(update) : null;
    if (ro && banner) ro.observe(banner);

    // Also watch for DOM changes in case banner is mounted/unmounted
    const mo = new MutationObserver(update);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (ro && banner) ro.disconnect();
      mo.disconnect();
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // Close when clicking anywhere outside the panel or the toggle button
  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      if (!isOpen) return;
      const target = e.target as Node | null;
      if (!target) return;
      if (panelRef.current && panelRef.current.contains(target)) return;
      if (buttonRef.current && buttonRef.current.contains(target)) return;
      setIsOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  const quickReplies = useMemo(
    () => ["Services", "Hours", "Pricing", "Contact"],
    []
  );

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMessage: ChatMessage = {
      id: makeId(),
      role: "user",
      content: trimmed,
    };
    setMessages((m) => [...m, userMessage]);
    setInput("");
    const botMessage: ChatMessage = {
      id: makeId(),
      role: "bot",
      content: replyFor(trimmed),
    };
    // Simulate a tiny delay for UX
    setTimeout(() => setMessages((m) => [...m, botMessage]), 300);
  }

  if (isModalOpen) {
    return null;
  }

  return (
    <>
      {/* Floating toggle button */}
      <button
        ref={buttonRef}
        aria-label={isOpen ? "Close helper" : "Open helper"}
        onClick={() => setIsOpen((v) => !v)}
        style={{ bottom: `${4 + bannerOffset}px` }}
        className="fixed right-4 z-50 rounded-full bg-[var(--color-brand)] text-white shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 h-12 w-12 grid place-items-center"
      >
        {/* Simple chat icon */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 12c0 4.418-4.03 8-9 8-1.036 0-2.03-.15-2.95-.43L3 20l1.09-3.27C3.4 15.43 3 13.76 3 12 3 7.582 7.03 4 12 4s9 3.582 9 8Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          style={{ bottom: `${20 + bannerOffset}px` }}
          className="fixed right-4 z-50 w-[340px] max-w-[88vw] rounded-2xl bg-white shadow-xl border border-[var(--color-border)]"
        >
          <div className="flex items-center justify-between px-4 py-3 rounded-t-2xl bg-[var(--color-brand)] text-white">
            <div className="font-semibold">Humanicia helper</div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Minimize"
              className="rounded-md p-1 hover:bg-white/15"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12h12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div
            ref={scrollRef}
            className="max-h-[360px] h-[360px] overflow-y-auto p-3 space-y-2 bg-[#fffaf4]"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === "user" ? "flex justify-end" : "flex justify-start"
                }
              >
                <div
                  className={
                    m.role === "user"
                      ? "rounded-2xl rounded-br-sm bg-[var(--color-cta)] text-white px-3 py-2 max-w-[80%]"
                      : "rounded-2xl rounded-bl-sm bg-white border border-[var(--color-border)] px-3 py-2 max-w-[80%]"
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          <div className="px-3 pt-2 pb-3 space-y-2 bg-white rounded-b-2xl">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="text-xs px-2 py-1 rounded-full border border-[var(--color-border)] bg-white hover:bg-gray-50"
                >
                  {q}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 rounded-xl border border-[var(--color-border)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] bg-white"
              />
              <button
                type="submit"
                className="rounded-xl bg-[var(--color-brand)] text-white px-3 py-2 hover:bg-green-700"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}


