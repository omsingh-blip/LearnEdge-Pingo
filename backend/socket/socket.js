import { Server } from "socket.io";

let io;

export const initSocket = (server) => {

  io = new Server(server,{
    cors:{
      origin:[
        "http://localhost:5173",
        "https://pingo-ai.netlify.app"
      ],
      methods:["GET","POST"],
      credentials:true
    }
  });

  io.on("connection",(socket)=>{
    console.log(
      "User connected:",
      socket.id
    );

    socket.on("disconnect",()=>{
      console.log(
        "User disconnected:",
        socket.id
      );
    });
  });

};

export { io };