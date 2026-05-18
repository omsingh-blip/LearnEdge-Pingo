import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import prepPlannerRoutes from "./routes/prepPlannerRoutes.js";
import compilerRoutes from "./routes/compilerRoutes.js";

import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();


// ================= SECURITY =================

app.use(helmet());


// ================= MIDDLEWARE =================

app.use(express.json());

const allowedOrigins = [

  "http://localhost:5173",

  "https://pingo-ai.netlify.app",

  "https://pingo-ai-ruddy.vercel.app",

  process.env.FRONTEND_URL

];

app.use(

  cors({

    origin:(origin,callback)=>{

      // allow Postman/server-side requests
      if(
        !origin ||
        allowedOrigins.includes(origin)
      ){

        callback(null,true);

      } else {

        callback(
          new Error(
            "Not allowed by CORS"
          )
        );

      }

    },

    methods:[
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS"
    ],

    credentials:true

  })

);


// ================= RATE LIMIT =================

const limiter = rateLimit({

  windowMs:
  15 * 60 * 1000,

  max:100,

  message:{
    success:false,
    msg:
    "Too many requests, please try again later."
  }

});

app.use(limiter);


// ================= LOGGER =================

if(
  process.env.NODE_ENV ===
  "development"
){

  app.use(
    morgan("dev")
  );

}


// ================= ROUTES =================

app.use(
"/api/auth",
authRoutes
);

app.use(
"/api/leaderboard",
leaderboardRoutes
);

app.use(
"/api/reviews",
reviewRoutes
);

app.use(
"/api/quiz",
quizRoutes
);

app.use(
"/api/prep-planner",
prepPlannerRoutes
);

app.use(
"/api/compiler",
compilerRoutes
);


// ================= HEALTH =================

app.get("/",(req,res)=>{

res.send(
"Backend is running 🚀"
);

});


// ================= ERROR =================

app.use(
errorMiddleware
);

export default app;