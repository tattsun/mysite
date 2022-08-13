import React from "react";
import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 mt-5">
        {props.children}
      </main>
      <Footer />
    </div>
  );
}
