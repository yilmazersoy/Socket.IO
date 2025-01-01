// import { useEffect, useState } from "react";
// import "./App.css";
// import { io } from "socket.io-client";

// function App() {
//     const BASE_URL = "http://localhost:3000";
//     const [socket] = useState(() => io(BASE_URL));
//     const [isConnected, setIsConnected] = useState(false);

//     useEffect(() => {
//         const handleConnect = () => {
//             setIsConnected(true);
//         };

//         const handleDisconnect = () => {
//             setIsConnected(false);
//         };

//         socket.on("connect", handleConnect);
//         socket.on("disconnect", handleDisconnect);

//         return () => {
//             socket.off("connect", handleConnect);
//             socket.off("disconnect", handleDisconnect);
//             socket.disconnect();
//         };
//     }, [socket]);

//     return (
//         <div>
//             <div>
//                 <h1>Socket State</h1>
//                 <p>{isConnected ? "Connected" : "Disconnected"}</p>
//             </div>
//             <div>
//                 <button onClick={() => socket.connect()}>Connect</button>
//                 <button onClick={() => socket.disconnect()}>Disconnect</button>
//             </div>
//         </div>
//     );
// }

// export default App;

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:3000");

function App() {
    const [messagesList, setMessagesList] = useState([]);
    const [message, setMessage] = useState("");
    useEffect(() => {
        socket.on("chat message", (data) => {
            setMessagesList((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off("chat message");
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("chat message", message);
        }
    };

    return (
        <div className="App">
            <div>
                <h1>Socket Chat</h1>
                <div className="chat-box">
                    {messagesList.map((msg, index) => (
                        <p key={index}>{msg}</p>
                    ))}
                </div>
                <div className="input-box">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message"
                    />
                    <button type="submit" onClick={sendMessage}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
