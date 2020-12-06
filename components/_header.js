import styles from "../styles/Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.logo}>AP</a>
      </Link>
      <div className={styles.nav}>
        <Link href="/posts">
          <a>Posts</a>
        </Link>
        <Link href="/projects">
          <a>Projects</a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
