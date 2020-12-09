import styles from "../../styles/posts/Posts.module.css";
import Link from "next/link";
import Layout from "../../components/_layout";
import {
  gridItem,
  gridParent,
  barReveal,
  quarterSecondStagger,
} from "../../components/_animations";
import Moment from "react-moment";
import { motion } from "framer-motion";

function PostsPage({ posts }) {
  return (
    <Layout>
      <div className="bar_reveal_container">
        <motion.div
          className="bar_reveal"
          variants={barReveal}
          initial="hidden"
          animate="show"
        ></motion.div>
        <h1 className="page_title">Recent Posts</h1>
      </div>

      <motion.section
        variants={gridParent}
        initial="hidden"
        animate="show"
        className={styles.post_grid}
      >
        {posts.map((post) => {
          return (
            <Link href={"/posts/" + post.slug}>
              <motion.a
                variants={gridItem}
                key={post.slug}
                className={styles.single_post_teaser}
              >
                <img
                  src={
                    "http://localhost:1337" +
                    post.featured_image.formats.large.url
                  }
                />
                <p>
                  <small className="mini-text">
                    <Moment format="MMM Do YYYY">{post.published_at}</Moment>
                  </small>
                </p>
                <h3>{post.title}</h3>
              </motion.a>
            </Link>
          );
        })}
      </motion.section>
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
