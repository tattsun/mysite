import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import React from "react";
import { Article, loadArticle, loadArticleMetadatum } from "../../lib/articles";

export const getStaticPaths: GetStaticPaths = async () => {
  const metadatum = await loadArticleMetadatum();
  return {
    paths: metadatum.map((metadata) => ({ params: { slug: metadata.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  function getSlug() {
    if (
      context.params == null ||
      typeof context.params.slug === "object" ||
      context.params.slug == null
    ) {
      return "";
    }
    return context.params.slug;
  }

  const article = await loadArticle(getSlug());

  return {
    props: {
      article,
    },
  };
};

const ArticlePage: NextPage<{ article: Article }> = ({ article }) => {
  return (
    <>
      <NextSeo
        title={article.matter.title}
        openGraph={{
          type: "website",
          url: `https://tattsun.me/articles/${article.slug}`,
          title: article.matter.title,
        }}
      />

      <div className="prose prose-lg max-w-none">
        <h1>{article.matter.title}</h1>
        <div>{article.date}</div>
        <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
      </div>
    </>
  );
};

export default ArticlePage;
