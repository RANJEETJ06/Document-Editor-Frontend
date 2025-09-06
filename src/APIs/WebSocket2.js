// src/APIs/WebSocket2.js
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let chatClient = null;

/**
 * Connect to chat WebSocket and subscribe to a room
 * @param {string} roomId - Chat room ID
 * @param {function} onChatMessage - Callback on receiving message
 */
export const connectChatWebSocket = (roomId, onChatMessage) => {
    chatClient = new Client({
        webSocketFactory: () => new SockJS("http://localhost:8800/chat"),
        reconnectDelay: 5000,

        onConnect: () => {

            // Subscribe to messages in this room
            chatClient.subscribe(`/topic/room.${roomId}`, (message) => {
                if (onChatMessage) {
                    try {
                        const msg = JSON.parse(message.body);
                        onChatMessage(msg);
                    } catch (err) {
                        console.error("❌ Error parsing WebSocket message:", err, message.body);
                    }
                }
            });
        },

        onStompError: (frame) => {
            console.error("❌ WebSocket error:", frame.headers["message"]);
            console.error("Details:", frame.body);
        },
    });

    chatClient.activate();
};

/**
 * Send message to backend
 * @param {object} chatMessage
 */
export const sendChatMessage = (chatMessage) => {
    if (chatClient && chatClient.connected) {
        chatClient.publish({
            destination: "/app/chat.sendMessage",
            body: JSON.stringify(chatMessage),
        });
    } else {
        console.warn("⚠️ WebSocket not connected, cannot send message");
    }
};

/**
 * Disconnect WebSocket
 */
export const disconnectChatWebSocket = () => {
    if (chatClient) {
        chatClient.deactivate();
        console.log("❌ Disconnected from WebSocket");
    }
};
