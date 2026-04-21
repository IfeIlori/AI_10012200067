import { KBChunk } from '../data/knowledgeBase';
import { esc } from '../utils/generation';

interface Props {
  chunks: KBChunk[];
}

export default function DocsPanel({ chunks }: Props) {
  if (!chunks.length) {
    return (
      <div style={{ flex: 1, overflow: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }} className="panel-scroll">
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 3 }}>Retrieved Context Chunks</div>
        <div style={{ fontSize: 12, color: 'var(--t2)', marginBottom: 10 }}>Top chunks matched to your last query, ranked by similarity score.</div>
        <div style={{ fontSize: 13, color: 'var(--t3)', textAlign: 'center', padding: '40px 0' }}>Send a message to see retrieved chunks here.</div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflow: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }} className="panel-scroll">
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 3 }}>Retrieved Context Chunks</div>
      <div style={{ fontSize: 12, color: 'var(--t2)', marginBottom: 10 }}>Top chunks matched to your last query, ranked by similarity score.</div>
      {chunks.map((c, i) => (
        <div key={c.id} style={{ background: 'var(--glass)', border: '1px solid var(--gborder)', borderRadius: 14, padding: '14px 16px', backdropFilter: 'blur(10px)' }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 5 }}>
            #{i + 1} · {c.cat}
          </div>
          <div style={{ fontSize: 10, color: 'var(--t3)', marginBottom: 6 }}>
            {c.src}{c.page ? ` · page ${c.page}` : ''}
          </div>
          <div style={{ fontSize: 12, color: 'var(--t2)', lineHeight: 1.6 }}>
            {esc(c.text)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <span style={{ fontSize: 10, color: 'var(--t3)' }}>Similarity</span>
            <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,.07)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 2, background: 'linear-gradient(90deg, #7B4FD4, #0AAFAF)', width: `${Math.round((c.score ?? 0) * 100)}%` }} />
            </div>
            <span style={{ fontSize: 10, color: 'var(--t3)' }}>{Math.round((c.score ?? 0) * 100)}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}
