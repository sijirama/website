import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { inter } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "oluwasijibomi",
  description: "i sometimes write stuff.",
  openGraph: {
    title: "oluwasijibomi",
    description: "guys it's my blog, i write stuff sometimes.",
    images:
      "https://opengraph.b-cdn.net/production/documents/1e1ccf42-4d7f-4915-97ee-d6d788602025.png?token=ZnDicu8y44ePX_Roep6yaQmgrAjPADHQQPRh6L69004&height=514&width=1200&expires=33239952242",
  },
};
