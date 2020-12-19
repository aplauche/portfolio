import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/_header";
import MiniPost from "../components/_miniPost";
import { quarterSecondStagger, barReveal } from "../components/_animations";
import { motion } from "framer-motion";

export async function getStaticProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/home-page`);
  const data = await res.json();
  console.log(data);

  return {
    props: {
      data,
    },
  };
}

const Home = ({ data }) => {
  const titlesContainer = {
    show: {
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const titles = {
    hidden: { opacity: 0, x: 50 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const featuredContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const featuredItem = {
    hidden: { y: 200, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  const background_image = `url('${data.background_image.url}')`;
  return (
    <>
      <Head>
        <title>Anton Plauche</title>
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="description"
          content={
            "A portfolio of Projects and Articles by Anton Plauche. Built with Strapi and Next.js"
          }
        />
        {/* Open Graph */}
        <meta property="og:image" content={""} key="ogimage" />
        <meta
          property="og:site_name"
          content="Anton Plauche"
          key="ogsitename"
        />
        <meta property="og:title" content={"Anton Plauche"} key="ogtitle" />
        <meta
          property="og:description"
          content={
            "A portfolio of Projects and Articles by Anton Plauche. Built with Strapi and Next.js"
          }
          key="ogdesc"
        />
      </Head>

      <Header />
      <div
        style={{
          backgroundImage: background_image,
        }}
        className={styles.container}
      >
        <Image
          className={styles.bg_image}
          src={data.background_image.url}
          layout="fill"
          objectFit="cover"
        />
        <main className={styles.main}>
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
              <h1>{data.main_heading}</h1>
            </div>
            <div className="bar_reveal_container">
              <motion.div
                className="bar_reveal"
                variants={barReveal}
              ></motion.div>
              <h2>{data.subheading}</h2>
            </div>
          </motion.div>

          <motion.section
            variants={featuredContainer}
            initial="hidden"
            animate="show"
            className={styles.featured}
          >
            <motion.div
              variants={featuredItem}
              className={styles.featured_post}
            >
              <MiniPost postData={data.featured_post} type="post" />
            </motion.div>
            <motion.div
              variants={featuredItem}
              className={styles.featured_project}
            >
              <MiniPost postData={data.featured_project} type="project" />
            </motion.div>
          </motion.section>
        </main>
      </div>
    </>
  );
};

export default Home;
