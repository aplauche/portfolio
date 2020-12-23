import styles from "../styles/Home.module.css";
import ReactMarkdown from "react-markdown";
import Layout from "../components/_layout";

export async function getStaticProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/about`);
  const data = await res.json();
  console.log(data);

  return {
    props: {
      data,
    },
  };
}

function About({ data }) {
  return (
    <Layout
      metaTitle={"About Me"}
      metaDesc={
        "Anton Plauche is a web developer and designer from Austin, Texas."
      }
    >
      <article className={styles.single_post}>
        <section className={styles.content}>
          <ReactMarkdown source={data.content} />
        </section>
      </article>
    </Layout>
  );
}

export default About;
