import matter from "gray-matter";

export interface PostMetaData {
    title: string;
    date: string;
    description: string;
    thumbnail: string;
    readTime: string;
}

export function getPostMetaData(fileContents: string): PostMetaData {
    const matterResult = matter(fileContents);
    return {
        title: matterResult.data.title,
        date: matterResult.data.date,
        description: matterResult.data.description,
        thumbnail: matterResult.data.thumbnail,
        readTime: matterResult.data.readTime,
    };
}


export function getPostContent(content: string) {
  const matterResult = matter(content);
  return matterResult;
}
