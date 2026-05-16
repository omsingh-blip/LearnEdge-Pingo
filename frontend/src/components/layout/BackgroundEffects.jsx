import { useMemo } from "react";

export default function BackgroundEffects() {

  const stars = useMemo(
    () =>
      [...Array(70)].map(() => ({
        size: 1 + Math.random() * 2,
        left: Math.random() * 100,
        top: Math.random() * 100,
        opacity: 0.5 + Math.random() * 0.5
      })),
    []
  );

  const clusters = useMemo(
    () =>
      [...Array(10)].map(() => ({
        width: 80 + Math.random() * 120,
        height: 80 + Math.random() * 120,
        left: Math.random() * 100,
        top: Math.random() * 100,
        color:
          Math.random() > .5
          ? "rgba(59,130,246,.35)"
          : "rgba(168,85,247,.3)"
      })),
    []
  );

  return (

    <>

      <div
        className="
        absolute
        inset-0
        z-0
        pointer-events-none
      "
      >

        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>


        {/* Static stars */}

        {

          stars.map((star,index)=>(

            <div

              key={index}

              className="
              absolute
              rounded-full
              bg-white
            "

              style={{

                width:
                `${star.size}px`,

                height:
                `${star.size}px`,

                left:
                `${star.left}%`,

                top:
                `${star.top}%`,

                opacity:
                star.opacity

              }}

            />

          ))

        }


        {/* Bright static clusters */}

        {

          clusters.map((cluster,index)=>(

            <div

              key={index}

              className="
              absolute
              rounded-full
            "

              style={{

                width:
                `${cluster.width}px`,

                height:
                `${cluster.height}px`,

                left:
                `${cluster.left}%`,

                top:
                `${cluster.top}%`,

                opacity:.12,

                filter:
                "blur(40px)",

                background:
                `radial-gradient(circle,${cluster.color},transparent)`

              }}

            />

          ))

        }

      </div>


      {/* Overlay */}

      <div
        className="
        absolute
        inset-0

        bg-gradient-to-b

        from-transparent
        via-slate-900/20
        to-slate-900

        z-0
      "
      />

    </>

  );

}