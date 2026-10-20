import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import LibraryPostContent from "@/components/LibraryPostContent";
import { getAllNotePaths, getNote, type NotePost } from "@/lib/library";

export default function LibraryNotePage() {
  const params = useParams();
  const slug = params["*"]?.split("/").filter(Boolean).map(decodeURIComponent) ?? [];
  const [post, setPost] = useState<NotePost | null>(null);
  const [allNotes, setAllNotes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getNote(slug), getAllNotePaths()]).then(([nextPost, notes]) => {
      setPost(nextPost);
      setAllNotes(notes);
    }).finally(() => setLoading(false));
  }, [params["*"]]);

  if (loading) return <div className="min-h-svh grid place-items-center text-sm text-zinc-400">loading note…</div>;
  if (!post) return <Navigate to="/library" replace />;
  return <LibraryPostContent post={post} allNotes={allNotes} />;
}
