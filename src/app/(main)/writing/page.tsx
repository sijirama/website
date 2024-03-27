import React from "react";
import PostCard from "../../../components/blog/PostCard";
import { getPostMetaData } from "@/lib/getPostMetaData";
import { manrope } from "@/lib/fonts";

export default function Page() {
    const postMetadata = getPostMetaData();

    return (
        <main className="w-full min-h-screen flex flex-col items-center pt-4 bg-black text-zinc-200 -tracking-wider">
            <div className="w-[95%] md:w-2/3 lg:w-2/3 h-full mx-auto flex flex-col items-center justify-center">
                <div className="w-full p-2">
                    <h1
                        className={`${manrope.className} text-3xl font-bold -tracking-widest`}
                    >
                        writings #
                    </h1>
                    <p className="font-light text-sm my-2">
                        i sometimes write and i want to make it a habit to write more, on
                        everything, books i read, movies i watch, music i listen to, code i
                        write.
                    </p>
                </div>
                {postMetadata.map((post, _index) => (
                    <PostCard post={post} key={post.slug} />
                ))}
            </div>
        </main>
    );
}
