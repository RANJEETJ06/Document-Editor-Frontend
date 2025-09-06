import React, { useEffect, useRef, useState } from "react";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { FileSpreadsheet, FileText, Users } from "lucide-react";
import { getAllDocuments, uploadDocument } from "../APIs/documentApi"; // make sure this is the correct path
import {
  fetchData,
  filenameToText,
  timeAgo,
  typeCheckDocuments,
} from "../functions";
import { formatBytes } from "./../functions";

const Home = ({ setUser }) => {
  const [file, setFile] = useState(null); // file selected for upload
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);

  const fetchDocs = async () => {
    await fetchData(setUser);
    try {
      const response = await getAllDocuments(); // returns { status, data }
      setDocuments(response.data || []); // store only the array
      setFilteredDocuments(response.data || []);
    } catch (err) {
      console.error(err);
      setDocuments([]);
      setFilteredDocuments([]);
    }
  };
  useEffect(() => {
    fetchDocs();
  }, [setUser]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSelectFile = () => {
    fileInputRef.current.click(); // triggers hidden file input
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload!");
      return;
    }
    setUploading(true);
    try {
      await uploadDocument({ name: file.name, file });

      const fetchedDocuments = await getAllDocuments();
      setDocuments(fetchedDocuments.data || []);
      setFilteredDocuments(fetchedDocuments.data || []);

      alert("File uploaded successfully!");
      setFile(null); // clear file input
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleSearchChange = (query) => {
    const lowerQuery = query.toLowerCase();
    const filtered = documents.filter((doc) =>
      doc.name.toLowerCase().includes(lowerQuery)
    );
    setFilteredDocuments(filtered);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Document Hub
          </h1>
          <p className="text-muted-foreground">
            Collaborate on documents in real‑time with your team
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Hidden file input */}
          <input
            type="file"
            id="file-upload"
            ref={fileInputRef}
            style={{ display: "none" }} // keep hidden
            onChange={handleFileChange}
          />

          {/* Label triggers file input */}

          <button
            onClick={handleSelectFile}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-white font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
          >
            {file ? file.name : "Select File"}
          </button>

          {/* Upload button */}
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="inline-flex items-center gap-2 rounded-xl bg-secondary px-5 py-3 text-white font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Document"}
          </button>
        </div>
      </section>

      {/* Search */}
      <div>
        <SearchBar
          onChange={handleSearchChange}
          placeholder="Search documents"
        />
      </div>

      {/* Quick Links */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          to="/doc/new"
          className="group rounded-xl border bg-white/70 p-5 shadow-sm hover:shadow-md transition"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-background">
            <FileText className="h-5 w-5" />
          </div>
          <h3 className="mt-4 font-semibold">Create New</h3>
          <p className="text-sm text-muted-foreground">
            Start a blank document
          </p>
        </Link>
        <div className="rounded-xl border bg-white/70 p-5 shadow-sm hover:shadow-md transition">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-background">
            <Users className="h-5 w-5" />
          </div>
          <h3 className="mt-4 font-semibold">Shared with Me</h3>
          <p className="text-sm text-muted-foreground">
            {documents.length} documents
          </p>
        </div>
      </section>

      {/* User Files */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Your files</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((d) => (
              <Link
                key={d.id}
                to={`/doc/${d.id}`}
                className="group rounded-xl border bg-white/80 p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-background">
                      <FileSpreadsheet className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold leading-none">
                        {filenameToText(d.name) || "Untitled"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {typeCheckDocuments(d)} • {formatBytes(d.content)}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {timeAgo(d.updatedAt)}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-muted-foreground">No documents found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
