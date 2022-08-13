import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkPrism from "remark-prism";
import { unified } from "unified";

export interface Matter {
  title?: string;
  description?: string;
}

export interface ArticleMetadata {
  slug: string;
  date: string;
  matter: Matter;
}

export interface Article extends ArticleMetadata {
  content: string;
}

const basePath = process.env.MYSITE_MARKDOWN_DIR as string;

function getDateFromSlug(slug: string): string {
  const regexp = /\d\d\d\d-\d\d-\d\d/;
  const result = regexp.exec(slug);
  if (result == null || result?.length === 0) {
    return "0000-00-00";
  }
  return result[0];
}

export async function loadArticleMetadatum(): Promise<ArticleMetadata[]> {
  const paths = fs.readdirSync(basePath);

  const metadatum: ArticleMetadata[] = [];

  for (const p of paths) {
    const slug = path.parse(p).name;

    // Load file and parse into slug and raw content
    const fileContent = fs.readFileSync(path.join(basePath, p));
    const { data } = matter(fileContent);

    metadatum.push({
      slug,
      matter: data,
      date: getDateFromSlug(slug),
    });
  }

  return metadatum.sort((a, b) => {
    if (a.slug < b.slug) return 1;
    if (a.slug > b.slug) return -1;
    return 0;
  });
}

export async function loadArticle(slug: string): Promise<Article> {
  const fileContent = fs.readFileSync(path.join(basePath, `${slug}.md`));
  const { data, content } = matter(fileContent);

  // Parse file as Markdown
  const result = await unified()
    .use(remarkParse)
    .use(remarkPrism)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content);

  const article = {
    slug,
    matter: data,
    date: getDateFromSlug(slug),
    content: result.toString(),
  };

  return article;
}
