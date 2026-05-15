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

        hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]

        transition-all duration-300

        ${className}
      `}
    >
      {children}
    </div>
  );
}