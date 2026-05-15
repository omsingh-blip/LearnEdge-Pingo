export default function BackgroundEffects() {
  return (
    <>
      {/* Stars */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="stars"></div>
        <div className="stars opacity-40"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      {/* Shooting Stars */}
      <div className="shooting-stars absolute inset-0 z-0 pointer-events-none">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Cursor Glow */}
      <div
        id="cursor-glow"
        className="pointer-events-none fixed w-40 h-40 rounded-full blur-3xl opacity-20 bg-blue-400 z-0"
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900 z-0"></div>
    </>
  );
}