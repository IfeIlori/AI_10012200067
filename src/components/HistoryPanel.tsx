import { esc } from '../utils/generation';

export interface HistoryEntry {
  q: string;
  time: string;
  n: number;
  top: number;
}

interface Props {
  history: HistoryEntry[];
  onSelect: (q: string) => void;
}

export default function HistoryPanel({ history, onSelect }: Props) {
  return (
    <div style={{ flex: 1, overflow: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }} className="panel-scroll">
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 3 }}>Query History</div>
      <div style={{ fontSize: 12, color: 'var(--t2)', marginBottom: 10 }}>All queries this session.</div>
      {history.length === 0 ? (
        <div style={{ fontSize: 13, color: 'var(--t3)', textAlign: 'center', padding: '40px 0' }}>No history yet.</div>
      ) : (
        [...history].reverse().map((entry, i) => (
          <div key={i} className="hist-item" onClick={() => onSelect(entry.q)}>
            <div style={{ fontSize: 13, color: '#fff', marginBottom: 3 }}>{esc(entry.q)}</div>
            <div style={{ fontSize: 10, color: 'var(--t3)' }}>
              {entry.time} · {entry.n} chunk{entry.n !== 1 ? 's' : ''} retrieved · Top score: {entry.top}%
            </div>
          </div>
        ))
      )}
    </div>
  );
}
