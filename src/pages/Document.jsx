import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowLeft,
  Bold,
  Italic,
  List,
  ListOrdered,
  MoreHorizontal,
  Save,
  Share2,
  Strikethrough,
  Underline,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import Update from "../components/Update";

const Document = () => {
  const { id } = useParams();
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className="rounded-xl border bg-white/80 shadow-sm overflow-y-auto">
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
            <button className="hidden sm:inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-sm hover:bg-secondary">
              <Share2 className="h-4 w-4" /> Share
            </button>
            <button className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow">
              <Save className="h-4 w-4" /> Save
            </button>
          </div>
        </div>

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

        <div className="prose max-w-none px-6 py-6">
          <h1>Welcome to Collaborative Editing</h1>
          <p className="lead">
            This document is being edited in real‑time. You can see other users'
            changes as they happen.
          </p>
          <h3>Features</h3>
          <ul>
            <li>Real‑time collaborative editing</li>
            <li>Live chat with collaborators</li>
            <li>User presence indicators</li>
            <li>Version history and auto‑save</li>
            <li>Document sharing and permissions</li>
          </ul>
          <p>Click anywhere to start editing!</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex-1 min-h-[300px] overflow-hidden">
          <ChatBox />
        </div>
        <div className="h-[300px]">
          <Update />
        </div>
      </div>
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
