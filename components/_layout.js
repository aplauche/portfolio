import styles from "../styles/Layout.module.css";
import Header from "./_header";
import Link from "next/link";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    async function getRelated() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/posts?_limit=2`);
      const posts = await res.json();
      setRelatedPosts(posts);
    }

    getRelated();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.content}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.cta}>AP</div>
        <div className={styles.recent}>
          <h2 style={{ fontSize: "2rem", marginTop: 0 }}>Featured:</h2>
          <div className={styles.related_posts_grid}>
            {relatedPosts.map((post) => {
              return (
                <Link href={"/posts/" + post.slug}>
                  <a className={styles.related_post}>
                    <img
                      className={styles.featured_image}
                      src={post.featured_image?.formats.medium.url}
                    />
                    <h3>{post.title}</h3>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
