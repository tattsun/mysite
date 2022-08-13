import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import React from "react";
import { Article, loadArticles } from "../../lib/articles";

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await loadArticles();
  return {
    paths: articles.map((article) => ({ params: { slug: article.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const articles = await loadArticles();
  const article = articles.find(
    (article) => article.slug === context.params?.slug
  );

  if (article == null) {
    throw new Error(`article not found: ${context.params?.slug}`);
  }

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
