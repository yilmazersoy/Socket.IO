// import { createServer } from "http";
// import { Server } from "socket.io";

// const httpServer = createServer();

// const io = new Server(httpServer, {
//     cors: {
//         origin: "*",
//     },
// });

// io.on("connection", (socket) => {
//     console.log("a user connected", socket.id);
//     socket.on("chat message", (msg) => {
//         console.log("message: " + msg);
//         io.emit("chat message", msg);
//     });
//     socket.on("disconnect", () => {
//         console.log("user disconnected");
//     });
// });

// httpServer.listen(3000, () => {
//     console.log("listening on *:3000");
// });

import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Frontend'in calıstıgı portu vermezsek CORS hatası veriyor.
        methods: ["GET", "POST"],
    },
});

// Soket baglantısı kuruldugunda çalısması gereken fonksiyon.
io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);

    socket.on("chat message", (data) => {
        console.log("Message received: ", data);

        // Mesajı tüm clientlara göndermek için io.emit() fonksiyonunu kullanıyoruz.
        socket.emit("chat message", data);
    });

    // soket baglantısı kesıldıgında çalısması gereken fonksiyon.
    socket.on("disconnect", () => {
        console.log("User disconnected: " + socket.id);
    });
});

// Sunucumuzu 3000 portundan dınleyecegını belırtmelıyız.
server.listen(3000, () => {
    console.log("Server listening on http://localhost:3000");
});
