import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { ArticleMetadata, loadArticleMetadatum } from "../lib/articles";

export async function getStaticProps() {
  const metadatum = await loadArticleMetadatum();
  return {
    props: {
      metadatum,
    },
  };
}

type HomeProps = {
  metadatum: ArticleMetadata[];
};

const Home: NextPage<HomeProps> = ({ metadatum }) => {
  return (
    <div>
      <Head>
        <title>tattsun.me</title>
      </Head>

      <main className="prose prose-lg">
        {metadatum.map((metadata) => (
          <div key={metadata.slug}>
            <Link href={`/articles/${metadata.slug}`}>
              <a>
                {metadata.date} {metadata.matter.title}
              </a>
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;
