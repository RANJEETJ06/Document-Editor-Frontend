import { MessageSquare } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { getChatRoom, getMessagesByRoom } from "../APIs/chatApi";
import {
  connectChatWebSocket,
  sendChatMessage,
  disconnectChatWebSocket,
} from "../APIs/WebSocket2";
import { fetchUser } from "../APIs/userApi";

const ChatBox = ({ name }) => {
  const [messages, setMessages] = useState([{ content: "No Messages" }]);
  const [chatRoom, setChatRoom] = useState(null);
  const [user, setUser] = useState(null);
  const bottomRef = useRef(null);

  // Fetch current user once
  useEffect(() => {
    fetchUser().then((data) => setUser(data.data));
  }, []);

  // Fetch chat room & old messages
  const fetchChatRoom = async (roomName) => {
    try {
      const roomResponse = await getChatRoom(roomName);
      const room = roomResponse.data || roomResponse;
      setChatRoom(room);

      const msgsResponse = await getMessagesByRoom(room.chatRoomId);
      const msgs = Array.isArray(msgsResponse.data)
        ? msgsResponse.data
        : msgsResponse;
      setMessages(msgs || []);
    } catch (error) {
      console.error("❌ Error fetching chat room/messages:", error);
    }
  };

  // Handle incoming WebSocket messages
  const handleIncomingMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  // Connect WebSocket when chatRoom & user are ready
  useEffect(() => {
    if (!chatRoom || !user) return;

    connectChatWebSocket(chatRoom.chatRoomId, handleIncomingMessage);

    // Send "add user" event to receive old messages
    sendChatMessage({
      chatRoomId: chatRoom.chatRoomId,
      senderId: user.id,
      senderName: user.name,
      type: "JOIN",
    });

    return () => disconnectChatWebSocket();
  }, [chatRoom, user]);

  // Fetch room when name changes
  useEffect(() => {
    if (name) fetchChatRoom(name);
  }, [name]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send chat message
  const handleSend = (e) => {
    e.preventDefault();
    if (!user || !chatRoom) return;

    const input = e.currentTarget.elements.namedItem("message");
    const value = input.value.trim();
    if (!value) return;

    const newMsg = {
      chatRoomId: chatRoom.chatRoomId,
      content: value,
      senderId: user.id,
      senderName: user.name,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "CHAT",
    };

    sendChatMessage(newMsg); // Only send via WebSocket
    input.value = "";
  };

  return (
    <aside className="rounded-xl border bg-white/80 shadow-sm flex flex-col h-96">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="font-semibold"> Chat</div>
        <MessageSquare className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <style>{`.flex-1::-webkit-scrollbar { display: none; }`}</style>
        {messages.map((m, idx) => (
          <div key={idx} className="rounded-lg bg-secondary p-3">
            <div className="text-sm font-medium">
              {m.senderName}{" "}
              <span className="ml-2 text-xs text-muted-foreground">
                {m.time}
              </span>
            </div>
            <div className="text-sm text-foreground/90">{m.content}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        className="border-t p-3 flex items-center gap-2"
        onSubmit={handleSend}
      >
        <input
          name="message"
          placeholder="Type a message..."
          className="flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <button className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">
          Send
        </button>
      </form>
    </aside>
  );
};

export default ChatBox;
