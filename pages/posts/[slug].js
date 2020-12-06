import Link from "next/link";
import styles from "../../styles/Post.module.css";
import Layout from "../../components/_layout";

const PostsPage = ({ post }) => {
  return (
    <Layout>
      <article className={styles.single_post}>
        <header>
          <p className={styles.post_date}>
            <small>{post.published_at}</small>
          </p>
          <h3 className={styles.post_title}>{post.Title}</h3>
        </header>
        <img
          className={styles.featured_image}
          src={"http://localhost:1337" + post.Featured_Image.formats.large.url}
        />

        <div className={styles.tags}>
          <h5>TAGS:</h5>
          {post.tags.map((tag) => {
            return <span>{tag.Tag_Name}</span>;
          })}
        </div>

        <section className={styles.content}>{post.Content}</section>
      </article>
    </Layout>
  );
};

export async function getStaticProps({ params }) {
  console.log(params);
  const res = await fetch(
    `http://localhost:1337/posts?_where[Slug]=${params.slug}`
  );
  const data = await res.json();
  const post = data[0];

  return {
    props: { post },
  };
}

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:1337/posts`);
  const data = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = data.map((post) => ({
    params: { slug: post.Slug.toString() },
  }));

  // We'll pre-render only these paths at build time.
  return { paths, fallback: false };
}

export default PostsPage;
