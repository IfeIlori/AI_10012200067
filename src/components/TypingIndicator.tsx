export default function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
      <div style={{
        width: 34, height: 34, borderRadius: 10, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #C8102E, #8B1C3A)',
        color: '#fff', fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 800,
        boxShadow: '0 2px 8px rgba(200,16,46,.35)'
      }}>
        AC
      </div>
      <div style={{
        background: 'rgba(255,255,255,.065)', border: '1px solid rgba(255,255,255,.1)',
        borderRadius: 16, borderBottomLeftRadius: 4, padding: '13px 18px',
        display: 'flex', gap: 5, alignItems: 'center', backdropFilter: 'blur(12px)'
      }}>
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </div>
  );
}
