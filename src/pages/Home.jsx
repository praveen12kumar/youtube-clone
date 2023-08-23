import React,{useContext, useEffect} from 'react'
import LeftNav from "../components/LeftNav";
import VideoCard from "../components/VideoCard";
import { DataContext } from '../context/dataContext';




const Home = () => {
  const {loading, searchResult} = useContext(DataContext);
  
  
  useEffect(()=>{
    document?.getElementById('root')?.classList?.remove("custom-h");
  },[]);

  return (
    <main className='flex flex-row '>
      <LeftNav/>
      <div className="grow w-[calc(100vw-240px)] h-full overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-3">
        {!loading && searchResult &&
                        searchResult?.map((item) => {
                            if (item.type !== "video") return false;
                            return (
                                <VideoCard
                                    key={item?.video}
                                    video={item?.video}
                                />
                            );
                        })}
        </div>
      </div>
    </main>
  )
}

export default Home
