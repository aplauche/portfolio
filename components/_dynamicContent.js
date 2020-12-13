import Link from "next/link";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

function DynamicContent({ data }) {
  return (
    <div>
      {console.log(data)}
      {data.map((section) => {
        switch (section.__component) {
          case "content.markdown":
            return <ReactMarkdown key={section.id} source={section.markdown} />;
            break;
          case "content.autoplay-video":
            console.log(section);
            return (
              <video
                key={section.id}
                className="website-autoscroll-video"
                src={section.video?.url}
                autoPlay={true}
                playsInline={true}
                muted={true}
                loop={true}
              ></video>
            );
            break;
        }
      })}
    </div>
  );
}

export default DynamicContent;
