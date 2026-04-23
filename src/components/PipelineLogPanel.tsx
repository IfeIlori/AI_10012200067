import { PromptLog } from "../utils/generation";

interface Props {
  logs: PromptLog[];
}

export default function PipelineLogPanel({ logs }: Props) {
  if (!logs.length) {
    return (
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
        className="panel-scroll"
      >
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            color: "#fff",
            marginBottom: 3,
          }}
        >
          Pipeline Logs
        </div>
        <div style={{ fontSize: 12, color: "var(--t2)", marginBottom: 10 }}>
          Detailed logs of RAG pipeline execution and processing steps.
        </div>
        <div
          style={{
            fontSize: 13,
            color: "var(--t3)",
            textAlign: "center",
            padding: "40px 0",
          }}
        >
          Send a message to see pipeline logs here.
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        flex: 1,
        overflow: "auto",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
      className="panel-scroll"
    >
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 14,
          fontWeight: 700,
          color: "#fff",
          marginBottom: 3,
        }}
      >
        Pipeline Logs
      </div>
      <div style={{ fontSize: 12, color: "var(--t2)", marginBottom: 10 }}>
        Detailed logs of RAG pipeline execution and processing steps.
      </div>
      {[...logs].reverse().map((log, idx) => (
        <div
          key={idx}
          style={{
            background: "var(--glass)",
            border: "1px solid var(--gborder)",
            borderRadius: 14,
            padding: "16px",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 8,
            }}
          >
            Query {logs.length - idx}
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: "var(--t3)", marginBottom: 4 }}>
              Query
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#fff",
                background: "rgba(255,255,255,.03)",
                borderRadius: 8,
                padding: "8px 10px",
                wordBreak: "break-word",
              }}
            >
              {log.query}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 12,
            }}
          >
            <LogStatItem
              label="Chunks Retrieved"
              value={String(log.chunksRetrieved)}
            />
            <LogStatItem
              label="Top Score"
              value={`${Math.round(log.topScore * 100)}%`}
            />
            <LogStatItem
              label="Context Length"
              value={`${log.contextLength} chars`}
            />
            <LogStatItem
              label="Processing Time"
              value={`${log.processingTime}ms`}
            />
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,.08)",
              paddingTop: 10,
            }}
          >
            <div style={{ fontSize: 10, color: "var(--t3)", marginBottom: 6 }}>
              Prompt Template
            </div>
            <div
              style={{
                maxHeight: 200,
                overflowY: "auto",
                overflowX: "hidden",
                background: "rgba(255,255,255,.03)",
                borderRadius: 8,
                padding: 8,
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255,255,255,.3) rgba(255,255,255,.05)",
              }}
              className="panel-scroll"
            >
              <pre
                style={{
                  fontSize: 8,
                  color: "var(--t2)",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  margin: 0,
                  fontFamily: "'Courier New', monospace",
                  lineHeight: 1.4,
                }}
              >
                {log.promptTemplate}
              </pre>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function LogStatItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 9, color: "var(--t3)", marginBottom: 3 }}>
        {label}
      </div>
      <div style={{ fontSize: 12, color: "#fff", fontWeight: 600 }}>
        {value}
      </div>
    </div>
  );
}
