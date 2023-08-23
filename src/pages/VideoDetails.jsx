import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { AiOutlineLike } from 'react-icons/ai';
import {FiThumbsDown} from "react-icons/fi";
import { abbreviateNumber } from 'js-abbreviation-number'


import { fetchDataFromApi } from '../utils/api';
import SuggestionVideoCard from '../components/SuggestionVideoCard';
import { DataContext } from '../context/dataContext'


const VideoDetails = () => {
  const {id} = useParams();
  const [video, setVideo] = useState();
  const [relatedVideo, setRelatedVideo] = useState();
  const {setLoading} = useContext(DataContext);


  const fetchVideoDetails = () =>{
    setLoading(true);
    fetchDataFromApi(`video/details/?id=${id}`).then((res)=>{
    //console.log("video details",res);
    setVideo(res)
    setLoading(false);
  })
  }

  const fetchRelatedVideos = () =>{
    setLoading(true);
    fetchDataFromApi(`video/related-contents/?id=${id}`).then((res)=>{
    //console.log("video Related ",res);
    setRelatedVideo(res)
    setLoading(false);
  })
  }

  useEffect(()=>{
    document.getElementById("root").classList.add("custom-h");
    fetchVideoDetails();
    fetchRelatedVideos();
  },[id])

  return (
    <div className='flex flex-row justify-center h-[calc(100%-56px)] border-1 border-red-600 px-6'>
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
            <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
              <div className="h-[200px] md:[h-500px] lg:h-[550px] xl:h-[600px]">
                <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                controls
                width="100%"
                height="100%"
                style={{borderRadius:"20px"}}
                playing={true}
                />
              </div>
              <div className="flex items-center font-bold text-sm md:text-lg line-clamp-2 mt-3">
                <h2>{video?.title}</h2>
              </div>

              <div className="flex flex-col justify-between items-center md:flex-row mt-1">
                <div className="flex items-center w-full justify-start">
                    <div className="flex h-8 w-8 rounded-full overflow-hidden">
                      <img
                       className='h-full w-full object-cover'
                       src={video?.author?.avatar[0]?.url} alt="channelpic" />
                    </div>
                    <div className="flex flex-col ml-3">
                      <div className="flex items-start">
                        <p className='text-md font-bold'>{ video?.author?.title}</p>
                        {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                          <BsFillCheckCircleFill className='text-[12px] ml-1 mt-2'/>
                        )}  
                      </div>
                      <div className="">
                      <p className='text-[12px] text-slate-700'>{video?.author?.stats?. subscribersText}</p>
                      </div>
                    </div>
                </div>
                <div className="flex mt-4 md:mt-0">
                    <div className="flex items-center bg-slate-300 justify-center h-9 px-6 rounded-3xl">
                      <AiOutlineLike className='text-xl'/>
                      <span className="">
                        {`${abbreviateNumber(video?.stats?.likes, 2)}`}
                      </span>
                     
                        <span className='ml-2 pl-2 border-l-2 border-slate-500 '>
                          <FiThumbsDown className='text-lg'/>
                        </span>
                      
                    </div>
                    <div className="flex items-center justify-center h-11 px-6 rounded-3xl ml-4">
                      <span className="flex mb-2 text-sm font-medium">
                        {`${abbreviateNumber(video?.stats?.views, 2)} Views`}
                      </span>
                    </div>
                </div>

              </div>


            </div>
            <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
                {
                  relatedVideo?.contents?.map((item, index)=>{
                    if(item?.type !== 'video') return false;
                    return(
                      <SuggestionVideoCard key={index}
                        video={item?.video} />
                    )
                  })
                }
            </div>
      </div>
      
    </div>
  )
}

export default VideoDetails
