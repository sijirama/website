import fs from "fs";
import matter from "gray-matter";

export interface PostMetaData {
  title: string;
  date: string;
  description: string;
  slug: string;
  thumbnail: string;
  readTime: string;
}

const format = ".mdx";

export function getPostMetaData(): PostMetaData[] {
  const folder = "src/posts/";
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(format));

  const posts = markdownPosts
    .map((filename) => {
      const fileContents = fs.readFileSync(`src/posts/${filename}`, "utf8");
      const matterResult = matter(fileContents);
      return {
        title: matterResult.data.title,
        date: matterResult.data.date,
        description: matterResult.data.description,
        slug: filename.replace(format, ""),
        thumbnail: matterResult.data.thumbnail,
        readTime: matterResult.data.readTime,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  // sort posts, but not yet

  return posts;
}

export const LatestPost = getPostMetaData()[0]

export function getPostContent(slug: string) {
  const folder = "src/posts/";
  const file = `${folder}/${slug}${format}`;
  const content = fs.readFileSync(file, "utf-8");
  const matterResult = matter(content);
  return matterResult;
}
