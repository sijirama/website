import { NextApiRequest, NextApiResponse } from 'next';
import { getPostMetaData } from '@/lib/getPostMetaData';

export default (_req: NextApiRequest, res: NextApiResponse) => {
  const posts = getPostMetaData();
  const latestPost = posts[0];
  console.log("the pages are: ",latestPost)
  res.status(200).json(latestPost);
};
