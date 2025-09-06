// src/APIs/WebSocket.api.js
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

export const connectWebSocket = (onMessageReceived) => {
    stompClient = new Client({
        // Use SockJS for compatibility with Spring Boot's STOMP endpoint
        webSocketFactory: () => new SockJS("http://localhost:8800/ws"),
        reconnectDelay: 5000,
        debug: (str) => console.log("[STOMP]", str),

        onConnect: () => {
            console.log("✅ Connected to WebSocket");
            stompClient.subscribe("/topic/documentUpdates", (message) => {
                if (onMessageReceived) {
                    try {
                        onMessageReceived(JSON.parse(message.body));
                    } catch (err) {
                        console.error("❌ Error parsing message:", err, message.body);
                    }
                }
            });
        },

        onStompError: (frame) => {
            console.error("❌ Broker error:", frame.headers["message"]);
            console.error("Details:", frame.body);
        },
    });

    stompClient.activate();
};

export const sendDocumentUpdate = (updateData) => {
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: "/app/updateDocument",
            body: JSON.stringify(updateData),
        });
    } else {
        console.warn("⚠️ Cannot send update, WebSocket not connected");
    }
};

export const disconnectWebSocket = () => {
    if (stompClient) {
        stompClient.deactivate();
        console.log("❌ Disconnected from WebSocket");
    }
};
