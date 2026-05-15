import BackgroundEffects from "./BackgroundEffects";

import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
}) {

  return (
    <div
      className="
        h-screen
        bg-slate-900
        text-white
        relative
        overflow-hidden
      "
    >

      <BackgroundEffects />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main
        className="
          relative z-10
          h-full
          overflow-y-auto

          pt-28
          px-4 md:px-8
          pb-10
        "
      >
        {children}
      </main>

    </div>
  );
}