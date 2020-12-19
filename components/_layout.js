import styles from "../styles/Layout.module.css";
import Header from "./_header";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Head from "next/head";

const Layout = ({ metaTitle, metaDesc, metaImage, children }) => {
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
      <Head>
        <title>
          {metaTitle ? metaTitle + " | Anton Plauche" : "Anton Plauche"}
        </title>
        <meta name="description" content={metaDesc || ""} />
        {/* Open Graph */}
        <meta property="og:image" content={metaImage || ""} key="ogimage" />
        <meta
          property="og:site_name"
          content="Anton Plauche"
          key="ogsitename"
        />
        <meta
          property="og:title"
          content={metaTitle ? metaTitle + " | Anton Plauche" : "Anton Plauche"}
          key="ogtitle"
        />
        <meta property="og:description" content={metaDesc || ""} key="ogdesc" />
      </Head>
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
                    <div className={styles.featured_image}>
                      <Image
                        className={styles.inner_image}
                        src={post.featured_image?.formats.medium.url}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
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
