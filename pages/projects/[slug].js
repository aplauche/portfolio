import Image from "next/image";
import styles from "../../styles/projects/Project.module.css";
import Layout from "../../components/_layout";
import DynamicContent from "../../components/_dynamicContent";
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";

const ProjectsPage = ({ post }) => {
  const [pwForm, setpwForm] = useState("");
  const [auth, setAuth] = useState(false);

  const handleTyping = (e) => {
    setpwForm(e.target.value);
  };

  const handleAuth = (e) => {
    e.preventDefault();
    if (pwForm == process.env.NEXT_PUBLIC_PW) {
      setAuth(true);
    } else {
      setpwForm("");
    }
  };

  if (auth || !post.protected) {
    return (
      <>
        <Layout
          metaTitle={post.title}
          metaDesc={post.intro}
          metaImage={post.featured_image?.formats?.medium.url}
        >
          <article className={styles.single_post}>
            <header>
              <h1 className={styles.post_title}>{post.title}</h1>
            </header>
            <h3 className={styles.intro}>{post.intro}</h3>
            <div className={styles.tags}>
              <h5>Type of work:</h5>
              {post.tags?.map((tag) => {
                if (post.tags[0] == tag) {
                  return <span>{tag.Tag_Name}</span>;
                } else {
                  return <span> | {tag.Tag_Name}</span>;
                }
              })}
            </div>

            <div className={styles.featured_image}>
              <Image
                className={styles.inner_image}
                src={post.featured_image?.formats.medium.url}
                alt={post.title}
                layout="fill"
                objectFit="contain"
              />
            </div>

            <section className={styles.content}>
              <DynamicContent data={post.dynamic_content} />
            </section>
          </article>
        </Layout>
      </>
    );
  }

  return (
    <>
      <div className={styles.auth}>
        <Link href="/projects">
          <a>Back to Projects</a>
        </Link>
        <h2>Confidential Material</h2>
        <p>Please enter the password to view this project.</p>
        <form method="post" onSubmit={(e) => handleAuth(e)}>
          <input
            type="password"
            value={pwForm}
            onChange={(e) => handleTyping(e)}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export async function getStaticProps({ params }) {
  console.log(params);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/projects?_where[slug]=${params.slug}`
  );
  const data = await res.json();
  const post = data[0];

  return {
    props: { post },
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/projects`);
  const data = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = data.map((post) => ({
    params: { slug: post.slug.toString() },
  }));

  // We'll pre-render only these paths at build time.
  return { paths, fallback: false };
}

export default ProjectsPage;
