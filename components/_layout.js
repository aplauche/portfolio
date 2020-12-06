import styles from "../styles/Layout.module.css";
import Header from "./_header";
import Link from "next/link";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    async function getRelated() {
      const res = await fetch(`http://localhost:1337/posts?_limit=2`);
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
          <h2>Recent:</h2>
          <div className={styles.related_posts_grid}>
            {relatedPosts.map((post) => {
              return (
                <Link href={"/posts/" + post.Slug}>
                  <a className={styles.related_post}>
                    <img
                      className={styles.featured_image}
                      src={
                        "http://localhost:1337" +
                        post.Featured_Image.formats.medium.url
                      }
                    />
                    <h3>{post.Title}</h3>
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
