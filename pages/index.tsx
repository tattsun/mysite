import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Article, loadArticles } from "../lib/articles";

export async function getStaticProps() {
  const articles = await loadArticles();
  return {
    props: {
      articles,
    },
  };
}

type HomeProps = {
  articles: Article[];
};

const Home: NextPage<HomeProps> = ({ articles }) => {
  return (
    <div>
      <Head>
        <title>tattsun.me</title>
      </Head>

      {articles.map((article) => (
        <div key={article.slug}>
          <Link href={`/articles/${article.slug}`}>
            <a>
              {article.date} {article.matter.title}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
