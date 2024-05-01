import { Metadata } from "next";

export const metadata: Metadata = {
    title: "siji's shelf",
    description: "my website shelf",
    openGraph: {
        title: "siji's shelf",
        description: "read my writing guys",
        images:
            "https://i.pinimg.com/474x/a4/c0/2f/a4c02f669b8a854d8a7918e6b25bbe85.jpg"
    },
};

export default function LibrarySlugLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children
}
