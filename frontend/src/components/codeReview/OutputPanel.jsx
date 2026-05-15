export default function OutputPanel({
  output,
}) {

  return (
    <div
      className="mt-4 bg-slate-800/70 backdrop-blur-lg
      p-3 rounded-xl border border-slate-700"
    >

      <h2 className="text-blue-400">
        ⚡ Output
      </h2>

      <pre className="text-red-300 whitespace-pre-wrap">

        {output ||
          "Run your code to see output..."}

      </pre>

    </div>
  );
}