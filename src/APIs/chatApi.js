import axios from "axios";

const API_BASE_URL = "http://localhost:8800/api/chat"; // ✅ gateway/communication service URL

// 🟢 Get a chat room by name
export const getChatRoom = async (name) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/message`,
            {
                params: { name },
                withCredentials: true, // goes here
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error getting chat room:", error);
        throw error;
    }
};


// 🟢 Send a message
export const sendMessage = async (message) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/messages`,
            message,
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};

// 🟢 Get messages by room
export const getMessagesByRoom = async (roomId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/messages/${roomId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching messages:", error);
        throw error;
    }
};
