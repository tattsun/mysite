import fs from "fs";
import path from "path";

export interface Article {
  // date: Date;
  name: string;
  // content: string;
}

export async function loadArticles(): Promise<Article[]> {
  const paths = await fs.promises.readdir("./test");

  return paths.map((p) => {
    const name = path.parse(p).name;

    return {
      name,
    };
  });
}
