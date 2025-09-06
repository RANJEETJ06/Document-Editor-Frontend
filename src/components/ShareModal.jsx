import { useState } from "react";
import { shareDocument } from "../APIs/documentApi";

const ShareModal = ({ id, onClose }) => {
  const [viewUsers, setViewUsers] = useState("");
  const [editUsers, setEditUsers] = useState("");

  const handleSubmit = async () => {
    const viewIds = viewUsers
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id.length > 0);
    const editIds = editUsers
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id.length > 0);

    try {
      await shareDocument(id, viewIds, editIds);
      onClose(); // ✅ close modal after sharing
    } catch (error) {
      console.error("Error sharing document:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg w-96 p-6">
        <h2 className="text-lg font-semibold mb-4">Share Document</h2>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">View Users</label>
          <input
            type="text"
            placeholder="Enter user IDs (comma separated)"
            value={viewUsers}
            onChange={(e) => setViewUsers(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Edit Users</label>
          <input
            type="text"
            placeholder="Enter user IDs (comma separated)"
            value={editUsers}
            onChange={(e) => setEditUsers(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
