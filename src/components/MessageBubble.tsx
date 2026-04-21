interface Props {
  html: string;
  who: 'ai' | 'user';
}

export default function MessageBubble({ html, who }: Props) {
  const isUser = who === 'user';
  return (
    <div className="msg-row" style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexDirection: isUser ? 'row-reverse' : 'row' }}>
      <div style={{
        width: 34, height: 34, borderRadius: 10, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 800,
        ...(isUser
          ? { background: 'rgba(123,79,212,.5)', border: '1px solid rgba(123,79,212,.4)', color: '#C4A4FF' }
          : { background: 'linear-gradient(135deg, #C8102E, #8B1C3A)', color: '#fff', boxShadow: '0 2px 8px rgba(200,16,46,.35)' }
        )
      }}>
        {isUser ? 'ME' : 'AC'}
      </div>

      <div style={{
        maxWidth: '78%', padding: '12px 16px', borderRadius: 16,
        fontSize: 13.5, lineHeight: 1.65,
        ...(isUser
          ? { background: 'linear-gradient(135deg, rgba(200,16,46,.55), rgba(123,79,212,.45))', border: '1px solid rgba(200,16,46,.3)', color: '#fff', borderBottomRightRadius: 4 }
          : { background: 'rgba(255,255,255,.065)', border: '1px solid rgba(255,255,255,.1)', color: 'var(--t1)', borderBottomLeftRadius: 4, backdropFilter: 'blur(12px)' }
        )
      }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
