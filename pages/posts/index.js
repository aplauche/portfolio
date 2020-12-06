import styles from "../../styles/Posts.module.css";
import Link from "next/link";
import Layout from "../../components/_layout";

function PostsPage({ posts }) {
  return (
    <Layout>
      <h1>Recent Posts</h1>
      <section className={styles.post_grid}>
        {posts.map((post) => {
          return (
            <Link href={"/posts/" + post.Slug}>
              <a key={post.Slug} className={styles.single_post_teaser}>
                <img
                  src={
                    "http://localhost:1337" +
                    post.Featured_Image.formats.large.url
                  }
                />
                <p>
                  <small>{post.published_at}</small>
                </p>
                <h3>{post.Title}</h3>
              </a>
            </Link>
          );
        })}
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch("http://localhost:1337/posts");
  const posts = await res.json();
  console.log(posts);

  return {
    props: {
      posts,
    },
  };
}

export default PostsPage;
