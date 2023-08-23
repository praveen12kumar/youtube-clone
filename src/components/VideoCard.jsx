import React from "react";
import { useNavigate } from "react-router-dom";

import VideoLength from "../shared/VideoLength";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { abbreviateNumber } from "js-abbreviation-number";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col mb-8"
      onClick={() => navigate(`/video/${video?.videoId}`)}
    >
      <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden">
        <img
          src={video?.thumbnails?.[0].url}
          alt="thumbnail"
          className="h-full w-full object-cover"
        />
        {video?.lengthSeconds && <VideoLength time={video?.lengthSeconds} />}
      </div>
      <div className="flex mt-3">
        <div className="flex items-start">
          <div className="flex h-8 w-8 rounded-full overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={video?.author?.avatar[0]?.url}
              alt="channelpic"
            />
          </div>
          <div className="flex flex-col ml-3 overflow-hidden">
            <span className="text-sm font-bold line-clamp-2">
              {video?.title}
            </span>
            <span className="text-[12px] text-[#565555] font-semibold mt-2 flex items-center hover:text-black">
              {video?.author?.title}{" "}
              {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                <BsFillCheckCircleFill className="text-[12px] ml-1 mt-0.5" />
              )}
            </span>
            <div className="flex text-[12px] font-semibold truncate overflow-hidden">
              <span className="">{`${abbreviateNumber(
                video?.stats?.views,
                2
              )} views`}</span>
              <span className="flex text-[12px] leading-none font-medium mx-1 mt-[4px]">
                {video?.publishedTimeText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
