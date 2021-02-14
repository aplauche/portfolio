import styles from "../../styles/projects/Projects.module.css";
import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/_layout";
import Moment from "react-moment";
import { gridItem, gridParent } from "../../components/_animations";
import { motion } from "framer-motion";

function ProjectsPage({ posts }) {
  return (
    <Layout
      metaTitle={"Projects"}
      metaDesc={
        "A collection of recent UI / UX, web, analytics, and design projects by Anton Plauche."
      }
    >
      <h1>Recent Projects</h1>
      <motion.section
        variants={gridParent}
        initial="hidden"
        animate="show"
        className={styles.post_grid}
      >
        {posts.map((post) => {
          return (
            <Link href={"/projects/" + post.slug}>
              <motion.a
                variants={gridItem}
                key={post.slug}
                className={styles.single_post_teaser}
              >
                <div className={styles.featured_image}>
                  <Image
                    className={styles.inner_image}
                    src={post.featured_image?.formats.medium.url}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>{" "}
                <p>
                  <small className="mini-text">
                    <Moment format="MMM Do YYYY">{post.date}</Moment>
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

export async function getStaticProps(context) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/projects?_sort=date:DESC`
  );
  const posts = await res.json();
  console.log(posts);

  return {
    props: {
      posts,
    },
  };
}

export default ProjectsPage;
