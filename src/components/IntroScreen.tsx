import LogoSpinner from './LogoSpinner';

interface Props {
  visible: boolean;
  onLaunch: () => void;
}

export default function IntroScreen({ visible, onLaunch }: Props) {
  return (
    <div className={`screen${visible ? '' : ' screen-out'}`} style={{ zIndex: 2 }}>
      <div className="intro-card">
        <LogoSpinner />

        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 36, lineHeight: 1.1, color: '#fff', letterSpacing: '-0.5px', marginBottom: 8 }}>
          ACity<br />
          <span style={{ background: 'linear-gradient(90deg, #C8102E, #7B4FD4, #0AAFAF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Assistant
          </span>
        </div>

        <div style={{ fontSize: 13.5, color: 'var(--t2)', marginBottom: 26, lineHeight: 1.6 }}>
          Your AI-powered academic helper for<br />Academic City University College, Ghana
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 30 }}>
          <Badge color="red">RAG-Powered</Badge>
          <Badge color="teal">Ghana Budget 2025</Badge>
          <Badge color="violet">Election Data</Badge>
          <Badge color="gold">CS4241 Project</Badge>
        </div>

        <button className="launch-btn" onClick={onLaunch}>
          Launch Assistant
        </button>

        <div style={{ marginTop: 22, fontSize: 11, color: 'rgba(255,255,255,.2)' }}>
          Academic City University · Accra, Ghana · CS4241 Project
        </div>
      </div>
    </div>
  );
}

function Badge({ children, color }: { children: React.ReactNode; color: 'red' | 'teal' | 'violet' | 'gold' }) {
  const styles: Record<string, React.CSSProperties> = {
    red:    { background: 'rgba(200,16,46,.15)',   borderColor: 'rgba(200,16,46,.4)',   color: '#FF8A96' },
    teal:   { background: 'rgba(10,175,175,.15)',  borderColor: 'rgba(10,175,175,.4)',  color: '#4DDEDE' },
    violet: { background: 'rgba(123,79,212,.15)',  borderColor: 'rgba(123,79,212,.4)',  color: '#C4A4FF' },
    gold:   { background: 'rgba(232,160,32,.15)',  borderColor: 'rgba(232,160,32,.4)',  color: '#FFD070' },
  };
  return (
    <span style={{ fontSize: 11, fontWeight: 500, padding: '5px 13px', borderRadius: 20, border: '1px solid', ...styles[color] }}>
      {children}
    </span>
  );
}
