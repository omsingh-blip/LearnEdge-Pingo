import BackgroundEffects from "./BackgroundEffects";

export default function MainLayout({
  children,
}) {
  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">

      <BackgroundEffects />

      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
}