import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 border-b z-10 bg-white">
      <div className="max-w-4xl mx-auto flex justify-between items-center h-12 text-xl px-4">
        <Link href="/">
          <a>tattsun.me</a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
