import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/_layout";
import Header from "../components/_header";
import MiniPost from "../components/_miniPost";

export async function getStaticProps(context) {
  const res = await fetch("http://localhost:1337/home-page");
  const data = await res.json();
  console.log(data);

  return {
    props: {
      data,
    },
  };
}

const Home = ({ data }) => {
  const background_image = `url('http://localhost:1337${data.background_image.url}')`;
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div
        style={{
          backgroundImage: background_image,
        }}
        className={styles.container}
      >
        <main className={styles.main}>
          <h1>{data.main_heading}</h1>
          <h2>{data.subheading}</h2>

          <section className={styles.featured}>
            <div className={styles.featured_post}>
              <MiniPost postData={data.featured_post} type="post" />
            </div>
            <div className={styles.featured_project}></div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
