import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/MiniPost.module.css";

function MiniPost({ postData, type }) {
  const [color, setColor] = useState("");
  const [baseUrl, setbaseUrl] = useState("");
  const [preTitle, setpreTitle] = useState("");

  useEffect(() => {
    if (type == "post") {
      setColor("white");
      setbaseUrl("posts");
      setpreTitle("Post");
    } else if (type == "project") {
      setColor("black");
      setbaseUrl("projects");
      setpreTitle("Project");
    }
  }, []);

  return (
    <Link href={`/${baseUrl}/${postData.slug}`}>
      <a style={{ color: color }} className={styles.mini_post}>
        <img
          src={postData.featured_image?.formats.thumbnail.url}
          alt={postData.title}
        />
        <div className={styles.info}>
          <p style={{ color: color }} className={styles.pre_title}>
            Featured {preTitle}
          </p>
          <h3 style={{ color: color }} className={styles.post_title}>
            {postData.title}
          </h3>
        </div>
      </a>
    </Link>
  );
}

export default MiniPost;
