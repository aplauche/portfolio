import Link from "next/link";
import styles from "../../styles/posts/Post.module.css";
import Layout from "../../components/_layout";
import Moment from "react-moment";
import { motion } from "framer-motion";
import {
  barReveal,
  quarterSecondStagger,
  fadeIn,
} from "../../components/_animations";

const PostsPage = ({ post }) => {
  return (
    <Layout>
      <article className={styles.single_post}>
        <header>
          <motion.div
            variants={quarterSecondStagger}
            initial="hidden"
            animate="show"
          >
            <div className="bar_reveal_container">
              <motion.div
                className="bar_reveal"
                variants={barReveal}
              ></motion.div>
              <p className={styles.post_date}>
                <small>
                  <Moment format="MMM Do YYYY">{post.published_at}</Moment>
                </small>
              </p>
            </div>
            <div className="bar_reveal_container">
              <motion.div
                className="bar_reveal"
                variants={barReveal}
              ></motion.div>
              <h3 className={styles.post_title}>{post.title}</h3>
            </div>
          </motion.div>
        </header>
        <motion.img
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className={styles.featured_image}
          src={"http://localhost:1337" + post.featured_image.formats.large.url}
        />

        <div className={styles.tags}>
          <h5>TAGS:</h5>
          {post.tags.map((tag) => {
            return <span>{tag.Tag_Name}</span>;
          })}
        </div>

        <section className={styles.content}>{post.content}</section>
      </article>
    </Layout>
  );
};

export async function getStaticProps({ params }) {
  console.log(params);
  const res = await fetch(
    `http://localhost:1337/posts?_where[slug]=${params.slug}`
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
    params: { slug: post.slug.toString() },
  }));

  // We'll pre-render only these paths at build time.
  return { paths, fallback: false };
}

export default PostsPage;
