import React, { useEffect, useState } from "react";
import "./RecommendedVideos.css";
import VideoCard from "./VideoCard";
import { listVideos } from "../../actions/video";
import moment from "moment";

const RecommendedVideos = () => {
  const [gotData, setGotData] = useState([]);

  useEffect(() => {
    listVideos()
      .then((res) => {
        setGotData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="recommendedVideos">
      <h2>Recommended</h2>
      <div className="recommendedVideos__videos">
        {gotData &&
          gotData.map((v, i) => {
            return (
              <VideoCard
                key={i}
                image="http://shlokatech.in/blogImages/node-js-authentication.jpg"
                title={v.title}
                channel={v.writer}
                videoId={`${v.videoId}`}
                views={`${v.views} views`}
                timestamp={moment(v.createdAt).fromNow()}
                channelImage="https://yt3.ggpht.com/ytc/AAUvwnjsRdGwYPgicDHjSi7EeQcHgUwkpT88HDCs4Jy_=s48-c-k-c0x00ffffff-no-rj"
              />
            );
          })}
      </div>
    </div>
  );
};

export default RecommendedVideos;
