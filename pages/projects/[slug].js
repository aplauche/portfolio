import Link from "next/link";
import styles from "../../styles/projects/Project.module.css";
import Layout from "../../components/_layout";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";

const ProjectsPage = ({ post }) => {
  return (
    <Layout>
      <article className={styles.single_post}>
        <header>
          <h1 className={styles.post_title}>{post.title}</h1>
        </header>
        <h3 className={styles.intro}>{post.intro}</h3>
        <div className={styles.tags}>
          <h5>Type of work:</h5>
          {post.tags?.map((tag) => {
            return <span>{tag.Tag_Name}</span>;
          })}
        </div>
        <img
          className={styles.featured_image}
          src={"http://localhost:1337" + post.featured_image.formats.large.url}
        />

        <section className={styles.content}>
          <ReactMarkdown source={post.content} />
        </section>
      </article>
    </Layout>
  );
};

export async function getStaticProps({ params }) {
  console.log(params);
  const res = await fetch(
    `http://localhost:1337/projects?_where[slug]=${params.slug}`
  );
  const data = await res.json();
  const post = data[0];

  return {
    props: { post },
  };
}

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:1337/projects`);
  const data = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = data.map((post) => ({
    params: { slug: post.slug.toString() },
  }));

  // We'll pre-render only these paths at build time.
  return { paths, fallback: false };
}

export default ProjectsPage;
