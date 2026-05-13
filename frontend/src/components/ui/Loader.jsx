export default function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">

      <div className="flex flex-col items-center gap-4">

        <div
          className="w-12 h-12 border-4 border-cyan-400
          border-t-transparent rounded-full animate-spin"
        ></div>

        <p className="text-gray-400 text-sm animate-pulse">
          Loading LearnEdge...
        </p>

      </div>

    </div>
  );
}