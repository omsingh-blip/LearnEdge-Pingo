export default function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        bg-slate-800/70
        backdrop-blur-lg
        border border-slate-700
        rounded-xl
        ${className}
      `}
    >
      {children}
    </div>
  );
}