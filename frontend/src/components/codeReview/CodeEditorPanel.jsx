import Editor from "@monaco-editor/react";

export default function CodeEditorPanel({
  code,
  setCode,
  language,
  setLanguage,
}) {

  return (
    <div
      className="bg-black/80 backdrop-blur-lg rounded-xl p-3 flex flex-col
      border border-slate-700
      shadow-[0_0_25px_rgba(34,197,94,0.2)]"
    >

      <h2 className="text-green-400 mb-2">
        💻 Code Editor
      </h2>

      {/* Language */}
      <select
        value={language}
        onChange={(e) =>
          setLanguage(e.target.value)
        }
        className="mb-2 px-3 py-2 text-sm rounded-md
        bg-gray-800 text-white border border-gray-600
        focus:outline-none focus:ring-2 focus:ring-blue-500
        w-40"
      >

        <option value="javascript">
          JavaScript
        </option>

        <option value="python">
          Python
        </option>

        <option value="cpp">
          C++
        </option>

        <option value="java">
          Java
        </option>

      </select>

      {/* Monaco */}
      <div className="flex-1 overflow-hidden rounded">

        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={(value) =>
            setCode(value || "")
          }
        />

      </div>

    </div>
  );
}