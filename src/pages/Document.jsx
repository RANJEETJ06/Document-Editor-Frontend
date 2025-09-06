import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteDocumentById,
  getDocumentById,
  updateDocumentById,
} from "../APIs/documentApi";
import { base64ToText, filenameToText, textToBase64 } from "../functions";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowLeft,
  Bold,
  Delete,
  Italic,
  List,
  ListOrdered,
  MoreHorizontal,
  Share2,
  Strikethrough,
  Underline,
} from "lucide-react";
import ChatBox from "../components/ChatBox";
import Update from "../components/Update";
import { sendDocumentUpdate } from "../APIs/WebSocket";
import ShareModal from "../components/ShareModal";

const Document = ({ userId }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [document, setDocument] = useState(null);
  const [text, setText] = useState("");
  const [userIdState] = useState(userId);
  const [isShareOpen, setIsShareOpen] = useState(false); // <-- state for modal
  const [filename, setFilename] = useState("");
  // Fetch document
  const fetchDocument = async () => {
    try {
      const doc = await getDocumentById(id);
      setDocument(doc);
      setFilename(filenameToText(doc.data.name));

      if (doc?.data?.content) {
        setText(base64ToText(doc.data.content)); // decode once
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  // Delete handler
  const handleDelete = async (id) => {
    try {
      await deleteDocumentById(id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  // Update handler
  const handleUpdate = async (plainText) => {
    try {
      const documentId = id;

      await updateDocumentById(documentId, userIdState, plainText);

      sendDocumentUpdate({
        id: documentId,
        ownerId: userIdState,
        content: textToBase64(plainText),
      });
      setText(plainText);
    } catch (error) {
      console.error("Failed to update document:", error);
    }
  };

  useEffect(() => {
    fetchDocument();
  }, [id]);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className="rounded-xl border bg-white/80 shadow-sm overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-sm hover:bg-secondary"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
            <div>
              <div className="font-semibold leading-none">
                {id?.replaceAll("-", " ") || "Untitled"}
              </div>
              <div className="text-xs text-muted-foreground">3 active</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="hidden sm:inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-sm hover:bg-secondary"
              onClick={() => setIsShareOpen(true)} // <-- open modal
            >
              <Share2 className="h-4 w-4" /> Share
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-primary-foreground shadow "
              onClick={() => handleDelete(id)}
            >
              <Delete className="h-4 w-4" /> delete
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 border-b px-2 py-2">
          <ToolbarButton icon={<Bold className="h-4 w-4" />} label="Bold" />
          <ToolbarButton icon={<Italic className="h-4 w-4" />} label="Italic" />
          <ToolbarButton
            icon={<Underline className="h-4 w-4" />}
            label="Underline"
          />
          <ToolbarButton
            icon={<Strikethrough className="h-4 w-4" />}
            label="Strike"
          />
          <span className="mx-2 h-5 w-px bg-border" />
          <ToolbarButton
            icon={<List className="h-4 w-4" />}
            label="Bulleted List"
          />
          <ToolbarButton
            icon={<ListOrdered className="h-4 w-4" />}
            label="Numbered List"
          />
          <span className="mx-2 h-5 w-px bg-border" />
          <ToolbarButton
            icon={<AlignLeft className="h-4 w-4" />}
            label="Left"
          />
          <ToolbarButton
            icon={<AlignCenter className="h-4 w-4" />}
            label="Center"
          />
          <ToolbarButton
            icon={<AlignRight className="h-4 w-4" />}
            label="Right"
          />
          <button className="ml-auto inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-sm hover:bg-secondary">
            <MoreHorizontal className="h-4 w-4" /> More
          </button>
        </div>

        {/* Content */}
        <div className="prose max-w-none px-6 py-6">
          {document ? (
            <div>
              <h1>{filenameToText(document.data.name) || "Untitled"}</h1>
              <textarea
                className="w-full h-96 p-2 border rounded text-base leading-normal"
                value={text}
                onChange={(e) => {
                  const newText = e.target.value;
                  setText(newText); // update local UI immediately
                  handleUpdate(newText); // send update to backend
                }}
                placeholder="Start typing..."
              />
            </div>
          ) : (
            <p className="text-gray-400">Loading document...</p>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex flex-col gap-3">
        <div className="flex-1 min-h-[300px] overflow-hidden">
          <ChatBox name={filename} />
        </div>
        <div className="h-[300px]">
          <Update />
        </div>
      </div>

      {/* Share Modal */}
      {isShareOpen && (
        <ShareModal id={id} onClose={() => setIsShareOpen(false)} />
      )}
    </div>
  );
};

function ToolbarButton({ icon, label }) {
  return (
    <button
      title={label}
      className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-sm hover:bg-secondary"
    >
      {icon}
      <span className="sr-only">{label}</span>
    </button>
  );
}

export default Document;
