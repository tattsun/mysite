import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";
import { loadArticles } from "../../lib/articles";

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await loadArticles();
  return {
    paths: articles.map((article) => ({ params: { name: article.name } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      name: context.params?.name,
    },
  };
};

const ArticlePage: NextPage = (props: { name: string }) => {
  return <div>Hello, world: {props.name}</div>;
};

export default ArticlePage;
