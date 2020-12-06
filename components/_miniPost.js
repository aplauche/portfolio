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
    <Link href={`/${baseUrl}/${postData.Slug}`}>
      <a style={{ color: color }} className={styles.mini_post}>
        <img
          src={`http://localhost:1337${postData.Featured_Image.url}`}
          alt=""
        />
        <div className={styles.info}>
          <p className={styles.pre_title}>Featured {preTitle}</p>
          <p className={styles.post_title}>{postData.Title}</p>
        </div>
      </a>
    </Link>
  );
}

export default MiniPost;
