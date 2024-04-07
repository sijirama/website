import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "digital garden",
    openGraph: {
        title: "oluwasijibomi",
        description: "guys it's my blog, i write stuff sometimes.",
        images:
            "https://siji.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Faphrodite.ba7bb8a6.jpg&w=3840&q=75",
    },
};

export default function LibraryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <main className="">{children}</main>;
}
