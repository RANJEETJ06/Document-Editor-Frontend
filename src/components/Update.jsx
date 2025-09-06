import React, { useEffect, useState, useRef } from "react";
import { Bell } from "lucide-react";
import { connectWebSocket, disconnectWebSocket } from "../APIs/WebSocket";
import { fetchUser } from "../APIs/userApi";

const UpdateBox = () => {
  const [updates, setUpdates] = useState([{
    id: 1,
    text: "No updates yet",
    time: new Date().toLocaleTimeString(),
  }]);
  const bottomRef = useRef(null);

  useEffect(() => {
    // Connect and listen
    connectWebSocket(async (update) => {
      const user = await fetchUser();
      const updateText = `Document "${update.name}" updated by user ${user.data.name}`;
      const updateTime = new Date().toLocaleTimeString();

      setUpdates((prev) => [
        ...prev,
        { id: Date.now(), text: updateText, time: updateTime },
      ]);
    });

    return () => {
      disconnectWebSocket();
    };
  }, []);

  // Auto-scroll down
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [updates]);

  return (
    <aside className="rounded-lg border bg-white/80 shadow-sm flex flex-col h-56">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-3 py-2">
        <div className="text-sm font-semibold">Updates</div>
        <Bell className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Updates (scrollable, hidden scrollbar) */}
      <div
        className="flex-1 overflow-y-auto px-3 py-3 space-y-2 text-sm"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>
          {`
            .flex-1::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {updates.map((u) => (
          <div
            key={u.id}
            className="rounded-md bg-secondary/60 p-2 text-xs text-foreground/90"
          >
            <div>{u.text}</div>
            <div className="text-[10px] text-muted-foreground mt-1">
              {u.time}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </aside>
  );
};

export default UpdateBox;
