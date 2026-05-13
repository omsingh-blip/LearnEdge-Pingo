export default function Leaderboard({ leaders }) {
  return (
    <div className="mt-10">

      <h2 className="text-xl font-bold mb-4">
        🏆 Leaderboard
      </h2>

      <div className="bg-slate-800/70 backdrop-blur-lg p-4 rounded-xl border border-slate-700">

        {leaders.map((user, i) => (
          <div
            key={i}
            className={`flex justify-between p-3 rounded mb-2 transition
            ${
              i === 0
                ? "bg-yellow-500/20 border border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.6)]"
                : "hover:bg-slate-700"
            }`}
          >

            <span>{user.name}</span>

            <span className="text-yellow-400">
              {user.score} pts
            </span>

          </div>
        ))}

      </div>
    </div>
  );
}