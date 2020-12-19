import Link from "next/link";
import styles from "../../styles/posts/Post.module.css";
import Layout from "../../components/_layout";
import DynamicContent from "../../components/_dynamicContent";
import Moment from "react-moment";
import { motion } from "framer-motion";
import {
  barReveal,
  quarterSecondStagger,
  fadeIn,
} from "../../components/_animations";
import ReactMarkdown from "react-markdown";

const PostsPage = ({ post }) => {
  return (
    <Layout
      metaTitle={post.seo_title}
      metaDesc={post.seo_desc}
      metaImage={post.featured_image?.formats.medium.url}
    >
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
                <small className="mini-text">
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
          src={post.featured_image?.formats.medium.url}
        />

        <div className={styles.tags}>
          <h5 className="mini-text">TAGS:</h5>
          {post.tags.map((tag) => {
            return <span>{tag.Tag_Name} </span>;
          })}
        </div>

        <section className={styles.content}>
          <DynamicContent data={post.dynamic_content} />
        </section>

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
    `${process.env.NEXT_PUBLIC_API}/posts?_where[slug]=${params.slug}`
  );
  const data = await res.json();
  const post = data[0];

  return {
    props: { post },
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/posts`);
  const data = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = data.map((post) => ({
    params: { slug: post.slug.toString() },
  }));

  // We'll pre-render only these paths at build time.
  return { paths, fallback: false };
}

export default PostsPage;
