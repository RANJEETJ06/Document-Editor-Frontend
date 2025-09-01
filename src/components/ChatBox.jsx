import { MessageSquare } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: "Jane Smith",
      text: "Hey everyone! I've started reviewing the introduction section.",
      time: "10:32 AM",
    },
    {
      id: 2,
      author: "Bob Wilson",
      text: "Looks great! I'm working on the methodology part. Should we schedule a quick call to discuss the timeline?",
      time: "10:35 AM",
    },
  ]);

  const bottomRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <aside className="rounded-xl border bg-white/80 shadow-sm flex flex-col h-96">
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="font-semibold">Chat</div>
        <MessageSquare className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Messages (scrollable + scrollbar hidden) */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
      >
        {/* Hide scrollbar (Chrome, Safari, Edge) */}
        <style>
          {`
            .flex-1::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {messages.map((m) => (
          <div key={m.id} className="rounded-lg bg-secondary p-3">
            <div className="text-sm font-medium">
              {m.author}{" "}
              <span className="ml-2 text-xs text-muted-foreground">
                {m.time}
              </span>
            </div>
            <div className="text-sm text-foreground/90">{m.text}</div>
          </div>
        ))}
        {/* scroll anchor */}
        <div ref={bottomRef} />
      </div>

      {/* Input pinned at bottom */}
      <form
        className="border-t p-3 flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.currentTarget.elements.namedItem("message");
          const value = input.value.trim();
          if (!value) return;
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              author: "You",
              text: value,
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ]);
          input.value = "";
        }}
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
