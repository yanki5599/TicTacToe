export default class SocketController {
    io: any;
    constructor(io: any) {
        this.io = io;
    }

    setupSocket() {
      this.io.on("connection", (socket:any) => {
          console.log("user connected");
          
          socket.on("disconnect", () => {
              console.log("user disconnected");
          });

          socket.on("makeMove", (data:any) => {
              console.log(data);
          });
      })
    }

}