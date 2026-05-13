export default function XPCard({ xp, level }) {
  return (
    <div
      className="bg-slate-800/70 backdrop-blur-lg px-4 py-3 rounded-xl
      border border-slate-700
      shadow-[0_0_25px_rgba(234,179,8,0.3)]
      w-full max-w-xs"
    >

      <p className="text-xs text-gray-400">
        Level {level}
      </p>

      <p className="text-lg font-bold text-yellow-400">
        ⭐ {xp} XP
      </p>

      <div className="w-full bg-gray-700 h-2 rounded mt-2">

        <div
          className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded
          shadow-[0_0_10px_rgba(234,179,8,0.7)]"
          style={{ width: `${xp % 100}%` }}
        ></div>

      </div>

    </div>
  );
}