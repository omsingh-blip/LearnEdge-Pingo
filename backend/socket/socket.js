import { Server } from "socket.io";

let io;

export const initSocket = (server) => {

const allowedOrigins=[

"http://localhost:5173",

"https://pingo-ai.netlify.app",

"https://pingo-ai-ruddy.vercel.app",

process.env.FRONTEND_URL

];

io = new Server(server,{

cors:{

origin:(origin,callback)=>{

// allow server-side / no-origin requests

if(
!origin ||
allowedOrigins.includes(
origin
)
){

callback(
null,
true
);

}

else{

callback(
new Error(
"Not allowed by CORS"
)
);

}

},

methods:[

"GET",
"POST"

],

credentials:true

}

});

io.on(
"connection",
(socket)=>{

console.log(
"User connected:",
socket.id
);

socket.on(
"disconnect",
()=>{

console.log(
"User disconnected:",
socket.id
);

}
);

}
);

};

export { io };