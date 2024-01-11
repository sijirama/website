import type { Metadata } from "next";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { inter } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Writings • Oluwasijibomi",
  description: "i sometimes write stuff.",
  openGraph: {
    title: "oluwasijibomi",
    description: "guys it's my blog, i write stuff sometimes.",
    images:
      "https://siji.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Faphrodite.ba7bb8a6.jpg&w=3840&q=75",
  },
};

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
