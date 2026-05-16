import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import ReactMarkdown from "react-markdown";

import {
  Prism as SyntaxHighlighter,
} from "react-syntax-highlighter";

import {
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";

export default function NotesViewer() {

  const { domain } =
    useParams();

  const navigate =
    useNavigate();

  const [content, setContent] =
    useState("");

  // ================= FETCH NOTES =================
  useEffect(() => {

    fetch(`/notes/${domain}.md`)
      .then((res) => res.text())
      .then((text) => {

        // Prevent Vite fallback HTML
        if (
          text.includes("<!doctype")
        ) {

          setContent(
            "# Notes Coming Soon 🚀"
          );

        } else {

          setContent(text);

        }
      });

  }, [domain]);

  return (
    <div
      className="
        min-h-screen
        bg-slate-900
        text-white
        px-6 py-10
      "
    >

      {/* Back */}
      <button
        onClick={() =>
          navigate(`/modules/${domain}`)
        }

        className="
          mb-8 px-5 py-2 rounded-xl

          bg-slate-800/80
          border border-slate-700

          hover:border-cyan-400

          transition-all duration-300
        "
      >

        ← Back

      </button>

      {/* Notes Card */}
      <div
        className="
          max-w-5xl
          mx-auto

          bg-slate-800/60
          backdrop-blur-xl

          border border-cyan-500/20

          rounded-3xl

          p-8

          shadow-[0_0_40px_rgba(34,211,238,0.12)]
        "
      >

        <div
          className="
            prose
            prose-invert
            max-w-none

            prose-headings:text-cyan-300
            prose-strong:text-white
            prose-code:text-pink-300

            prose-p:text-gray-300
            prose-li:text-gray-300
          "
        >

          <ReactMarkdown

            components={{

              code({
                inline,
                className,
                children,
                ...props
              }) {

                const match =
                  /language-(\w+)/.exec(
                    className || ""
                  );

                return !inline &&
                  match ? (

                  <SyntaxHighlighter
                    style={oneDark}

                    language={match[1]}

                    PreTag="div"

                    customStyle={{
                      borderRadius:
                        "16px",

                      padding:
                        "20px",

                      background:
                        "#0f172a",

                      border:
                        "1px solid rgba(34,211,238,0.2)",

                      boxShadow:
                        "0 0 25px rgba(34,211,238,0.08)",
                    }}

                    {...props}
                  >

                    {String(children)
                      .replace(/\n$/, "")}

                  </SyntaxHighlighter>

                ) : (

                  <code
                    className={className}
                    {...props}
                  >

                    {children}

                  </code>
                );
              },

            }}

          >

            {content}

          </ReactMarkdown>

        </div>

      </div>

    </div>
  );
}