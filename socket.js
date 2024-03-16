const { Server } = require('socket.io');
const { Redis } = require("ioredis");

// const PORT = process.env.REACT_APP_REDIS_PORT

const pub = new Redis({
});
const sub = new Redis({
});
class SocketServices {
    constructor() {
      console.log("Init Socket Server");
      this._io = new Server({
        cors: {
          allowedHeaders: ["*"],
          origin: ["http://65.2.11.146:3000"],
        },
      });
  
      sub.subscribe("MESSAGE");
    }
  
    initListener() {
      console.log("Init Socket listeners");
      const io = this.io;
      io.on("connect", (socket) => {
        console.log("New Socket connected", socket.id);
        socket.on("event:message", async ({ message }) => {
          console.log("New Message is sent", message);
          //pub this msg to redis
          await pub.publish("MESSAGE", JSON.stringify({ message }));
        });
      });
      sub.on("message", async (channel, message) => {
        if (channel === "MESSAGE") {
          console.log("Message from Redis:", message);
  
          io.emit("message", message);
        }
      });
    }
  
    get io() {
      return this._io;
    }
  }
  
  module.exports = SocketServices;
