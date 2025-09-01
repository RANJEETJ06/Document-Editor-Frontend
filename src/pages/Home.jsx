import React from "react";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { File, FileSpreadsheet, FileText, Users } from "lucide-react";
import { docs } from "../testingFiles";

const Home = () => {
  return (
    <div className="space-y-6">
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
          <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-white font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
            Upload Document
          </button>
        </div>
      </section>
      <div>
        <SearchBar placeholder="Search documents" />
      </div>
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
          <p className="text-sm text-muted-foreground">5 documents</p>
        </div>
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Your files</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {docs.map((d) => (
            <Link
              key={d.id}
              to={`/doc/${d.id}`}
              className="group rounded-xl border bg-white/80 p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-background">
                    {d.type === "PDF" ? (
                      <FileText className="h-5 w-5" />
                    ) : d.type === "DOCX" ? (
                      <File className="h-5 w-5" />
                    ) : (
                      <FileSpreadsheet className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold leading-none">{d.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {d.type} • {d.size}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">{d.updated}</div>
              </div>
              <div className="mt-3 flex -space-x-2">
                {d.sharedWith.map((i) => (
                  <div
                    key={i}
                    className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-primary/10 text-[10px] font-bold text-primary"
                  >
                    {i}
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
