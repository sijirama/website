import Link from "next/link";

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center p-24  bg-white text-black -tracking-widest">
        <h1>Under Construction</h1>
        <p className="mt-3 text-sm">Return to{" "}
        <Link className="underline underline-offset-2 -tracking-wider" href={"/"}>Homepage</Link>
        </p>
        </main>
    )
}
