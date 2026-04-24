import { useState, useRef, useCallback, useEffect } from "react";
import { ArrowLeft, X } from "lucide-react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import DocsPanel from "./DocsPanel";
import HistoryPanel, { HistoryEntry } from "./HistoryPanel";
import PipelineLogPanel from "./PipelineLogPanel";
import { KBChunk } from "../data/knowledgeBase";
import { retrieve } from "../utils/retrieval";
import {
  generateAnswer,
  esc,
  buildPromptLog,
  PromptLog,
} from "../utils/generation";

interface Message {
  id: number;
  html: string;
  who: "ai" | "user";
}

type Panel = "chat" | "docs" | "hist" | "pipeline";

interface Props {
  visible: boolean;
  onBack: () => void;
}

const WELCOME_HTML = `Hello! I'm <strong>ACity Assistant</strong>, your RAG-powered academic helper for <strong>Academic City University</strong>, Ghana.
<br><br>I answer questions directly from two real documents:
<ul style="margin: 8px 0 0 16px; line-height: 1.9">
  <li style="font-size:13px"><strong>Ghana_Election_Result.csv</strong> : presidential &amp; parliamentary results 1992–2020</li>
  <li style="font-size:13px"><strong>2025-Budget-Statement.pdf</strong> : Ghana's full national budget (MOFEP)</li>
</ul>
<br>Try asking:
<ul style="margin: 0 0 0 16px; line-height: 1.9">
  <li style="font-size:13px">Who won the 2020 presidential election?</li>
  <li style="font-size:13px">How much was allocated to education in 2025?</li>
  <li style="font-size:13px">What is Ghana's current debt-to-GDP ratio?</li>
  <li style="font-size:13px">What happened in the 2020 parliamentary election?</li>
</ul>
<div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:9px">
  <span style="font-size:10px;font-weight:500;padding:3px 9px;border-radius:12px;border:1px solid;background:rgba(200,16,46,.12);border-color:rgba(200,16,46,.3);color:#FF8A96">Ghana_Election_Result.csv</span>
  <span style="font-size:10px;font-weight:500;padding:3px 9px;border-radius:12px;border:1px solid;background:rgba(10,175,175,.12);border-color:rgba(10,175,175,.3);color:#4DDEDE">2025-Budget-Statement.pdf</span>
  <span style="font-size:10px;font-weight:500;padding:3px 9px;border-radius:12px;border:1px solid;background:rgba(123,79,212,.12);border-color:rgba(123,79,212,.3);color:#C4A4FF">25 document chunks</span>
</div>`;

export default function ChatScreen({ visible, onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, html: WELCOME_HTML, who: "ai" },
  ]);
  const [typing, setTyping] = useState(false);
  const [status, setStatus] = useState("Online · Ready");
  const [panel, setPanel] = useState<Panel>("chat");
  const [chunks, setChunks] = useState<KBChunk[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [logs, setLogs] = useState<PromptLog[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [busy, setBusy] = useState(false);
  const msgCounter = useRef(1);
  const msgsEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = useCallback(async () => {
    const q = inputVal.trim();
    if (!q || busy) return;

    setBusy(true);
    setInputVal("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    const userMsg: Message = {
      id: msgCounter.current++,
      html: esc(q),
      who: "user",
    };
    setMessages((prev) => [...prev, userMsg]);
    setStatus("Retrieving context...");
    setTyping(true);

    await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));

    const retrieved = retrieve(q, 3);
    setChunks(retrieved);

    const log = buildPromptLog(q, retrieved);
    setLogs((prev) => [...prev, log]);

    const now = new Date();
    setHistory((prev) => [
      ...prev,
      {
        q,
        time: now.toLocaleTimeString(),
        n: retrieved.length,
        top: retrieved.length ? Math.round((retrieved[0].score ?? 0) * 100) : 0,
      },
    ]);

    setStatus("Generating answer...");
    await new Promise((r) => setTimeout(r, 300));

    setTyping(false);

    const answer = generateAnswer(q, retrieved);
    const top = retrieved[0];
    const scoreVal = top ? Math.round((top.score ?? 0) * 100) : 0;

    const chipHtml = retrieved.length
      ? `
      <div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:9px">
        <span style="font-size:10px;font-weight:500;padding:3px 9px;border-radius:12px;border:1px solid;background:rgba(200,16,46,.12);border-color:rgba(200,16,46,.3);color:#FF8A96">${top.src}${top.page ? " · p." + top.page : ""}</span>
        <span style="font-size:10px;font-weight:500;padding:3px 9px;border-radius:12px;border:1px solid;background:rgba(10,175,175,.12);border-color:rgba(10,175,175,.3);color:#4DDEDE">Score · ${(top.score ?? 0).toFixed(2)}</span>
        <span style="font-size:10px;font-weight:500;padding:3px 9px;border-radius:12px;border:1px solid;background:rgba(123,79,212,.12);border-color:rgba(123,79,212,.3);color:#C4A4FF">${retrieved.length} chunk${retrieved.length > 1 ? "s" : ""}</span>
      </div>
      <div style="display:flex;align-items:center;gap:7px;margin-top:6px">
        <span style="font-size:10px;color:var(--t3)">Relevance</span>
        <div style="flex:1;height:3px;background:rgba(255,255,255,.07);border-radius:2px;overflow:hidden">
          <div style="height:100%;border-radius:2px;background:linear-gradient(90deg,#0AAFAF,#2DD4A0);width:${scoreVal}%"></div>
        </div>
        <span style="font-size:10px;color:var(--t3)">${scoreVal}%</span>
      </div>`
      : "";

    const aiMsg: Message = {
      id: msgCounter.current++,
      html: answer + chipHtml,
      who: "ai",
    };
    setMessages((prev) => [...prev, aiMsg]);
    setStatus("Online · Ready");
    setBusy(false);
  }, [inputVal, busy]);

  const handleClear = () => {
    setMessages([{ id: msgCounter.current++, html: WELCOME_HTML, who: "ai" }]);
    setHistory([]);
    setChunks([]);
    setLogs([]);
    setPanel("chat");
  };

  const handleHistorySelect = (q: string) => {
    setInputVal(q);
    setPanel("chat");
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputVal(e.target.value);
    const ta = e.target;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
  };

  return (
    <div
      className={`screen${visible ? "" : " screen-out"}`}
      style={{
        alignItems: "stretch",
        justifyContent: "flex-start",
        zIndex: 1,
        background: "rgba(8,13,30,.5)",
      }}
    >
      {/* TOP BAR */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "0 20px",
          height: 60,
          background: "rgba(26,36,86,.78)",
          borderBottom: "1px solid rgba(255,255,255,.08)",
          backdropFilter: "blur(24px)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 11,
            background: "linear-gradient(135deg, #C8102E, #8B1C3A)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 13,
            color: "#fff",
            boxShadow: "0 2px 10px rgba(200,16,46,.45)",
            flexShrink: 0,
          }}
        >
          AC
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            ACity Assistant
          </div>
          <div
            style={{
              fontSize: 11,
              color: "var(--t2)",
              display: "flex",
              alignItems: "center",
              gap: 5,
              marginTop: 1,
            }}
          >
            <div className="status-dot" />
            <span>{status}</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              fontFamily: "'Syne', sans-serif",
              padding: "4px 9px",
              borderRadius: 6,
              background: "linear-gradient(90deg, #C8102E, #7B4FD4)",
              color: "#fff",
              letterSpacing: ".4px",
            }}
          >
            RAG · Local
          </div>
          <button className="top-btn" onClick={onBack} title="Back">
            <ArrowLeft size={14} />
          </button>
          <button className="top-btn" onClick={handleClear} title="Clear">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* NAV TABS */}
      <div
        style={{
          display: "flex",
          background: "rgba(8,13,30,.65)",
          borderBottom: "1px solid rgba(255,255,255,.06)",
          backdropFilter: "blur(12px)",
          padding: "0 20px",
          flexShrink: 0,
        }}
      >
        {(["chat", "docs", "hist"] as Panel[]).map((p) => (
          <button
            key={p}
            className={`ntab${panel === p ? " active" : ""}`}
            onClick={() => setPanel(p)}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            {p === "chat"
              ? "Chat"
              : p === "docs"
                ? "Retrieved Chunks"
                : "History"}
          </button>
        ))}
        {logs.length > 0 && (
          <button
            className={`ntab${panel === "pipeline" ? " active" : ""}`}
            onClick={() => setPanel("pipeline")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              marginLeft: "auto",
            }}
          >
            Pipeline Log
          </button>
        )}
      </div>

      {/* PANELS */}
      {panel === "chat" && (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <div
            className="msgs-scroll"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px 20px 8px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {messages.map((m) => (
              <MessageBubble key={m.id} html={m.html} who={m.who} />
            ))}
            {typing && <TypingIndicator />}
            <div ref={msgsEndRef} />
          </div>
        </div>
      )}

      {panel === "docs" && <DocsPanel chunks={chunks} />}
      {panel === "hist" && (
        <HistoryPanel history={history} onSelect={handleHistorySelect} />
      )}
      {panel === "pipeline" && <PipelineLogPanel logs={logs} />}

      {/* INPUT */}
      <div
        style={{
          padding: "12px 16px",
          background: "rgba(8,13,30,.78)",
          borderTop: "1px solid rgba(255,255,255,.07)",
          backdropFilter: "blur(24px)",
          display: "flex",
          alignItems: "flex-end",
          gap: 10,
          flexShrink: 0,
        }}
      >
        <div style={{ flex: 1 }}>
          <textarea
            ref={textareaRef}
            className="chat-input"
            rows={1}
            placeholder="Ask about ACity, Ghana Budget 2025, election results..."
            value={inputVal}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
          className="send-btn"
          onClick={handleSend}
          disabled={busy || !inputVal.trim()}
        >
          <svg
            viewBox="0 0 24 24"
            style={{ width: 15, height: 15, fill: "#fff" }}
          >
            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
          </svg>
        </button>
      </div>

      {/* FOOTER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "7px 20px",
          background: "rgba(26,36,86,.72)",
          borderTop: "1px solid rgba(255,255,255,.06)",
          backdropFilter: "blur(10px)",
          flexShrink: 0,
        }}
      >
        <div style={{ fontSize: 10, color: "rgba(255,255,255,.28)" }}>
          Academic City University · Accra, Ghana
        </div>

        <div style={{ fontSize: 10, color: "rgba(255,255,255,.28)" }}>
          © 2026 Esther Ilori-Folarin. All Rights Reserved.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 10,
            color: "rgba(255,255,255,.35)",
          }}
        >

          <div
            style={{
              background: "linear-gradient(90deg, #C8102E, #7B4FD4)",
              borderRadius: 4,
              padding: "2px 7px",
              fontSize: 9,
              fontWeight: 700,
              fontFamily: "'Syne', sans-serif",
              color: "#fff",
              letterSpacing: ".5px",
            }}
          >
            RAG
          </div>
          Local Knowledge Base · CS4241 Exam Project
        </div>
      </div>
    </div>
  );
}
