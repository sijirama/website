import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio • Oluwasijibomi",
  description: "i sometimes write stuff.",
  openGraph: {
    title: "oluwasijibomi",
    description: "guys it's my blog, i write stuff sometimes.",
    images:
      "https://i.pinimg.com/474x/f7/6e/c1/f76ec12821e613ef03bc78efb8bf3ef5.jpg",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={`py-4 md:py-8 `}>{children}</main>;
}
