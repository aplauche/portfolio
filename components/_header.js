import styles from "../styles/Header.module.css";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.logo}>AP</a>
      </Link>
      <div className={styles.nav}>
        <Link href="/about">
          <a>About</a>
        </Link>
        {/* <Link href="/posts">
          <a>Posts</a>
        </Link> */}
        <Link href="/projects">
          <a>Projects</a>
        </Link>
      </div>
      <button
        className={`${navOpen ? "open" : ""} burger`}
        onClick={() => {
          setNavOpen(!navOpen);
        }}
      >
        <div></div>
        <div></div>
        <div></div>
      </button>
      {navOpen && (
        <div className={styles.mobile_nav}>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
          {/* <Link href="/posts">
            <a>Posts</a>
          </Link> */}
          <Link href="/projects">
            <a>Projects</a>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
