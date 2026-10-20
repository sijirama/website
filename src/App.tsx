import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "@/pages/HomePage";
import ProjectsPage from "@/pages/ProjectsPage";
import LibraryPage from "@/pages/LibraryPage";
import LibraryNotePage from "@/pages/LibraryNotePage";

function PortfolioRedirect() {
  window.location.replace("https://flowcv.com/resume/qjwdae4u1j");
  return <p className="p-8 text-sm text-zinc-500">Redirecting…</p>;
}

export default function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/projects" element={<ProjectsPage />} />
    <Route path="/portfolio" element={<PortfolioRedirect />} />
    <Route path="/library" element={<LibraryPage />} />
    <Route path="/library/*" element={<LibraryNotePage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></BrowserRouter>;
}
