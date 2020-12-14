import Link from "next/link";
import styles from "../../styles/projects/Project.module.css";
import Layout from "../../components/_layout";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import DynamicContent from "../../components/_dynamicContent";

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
            if (post.tags[0] == tag) {
              return <span>{tag.Tag_Name}</span>;
            } else {
              return <span> | {tag.Tag_Name}</span>;
            }
          })}
        </div>
        <img
          className={styles.featured_image}
          src={post.featured_image?.formats.medium.url}
        />

        <section className={styles.content}>
          <DynamicContent data={post.dynamic_content} />
        </section>
      </article>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
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

export default ProjectsPage;
