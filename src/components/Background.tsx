export default function Background() {
  return (
    <div className="bg-layer">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />
      <div className="orb orb-5" />
      <div className="bg-grid" />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div className="bg-shape sh-1" />
        <div className="bg-shape sh-2" />
        <div className="bg-shape sh-3" />
        <div className="bg-shape sh-4" />
        <div className="bg-shape sh-5" />
        <div className="bg-shape sh-6" />
      </div>
    </div>
  );
}
