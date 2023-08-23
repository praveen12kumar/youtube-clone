import React, {useEffect, useState, useContext} from 'react';
import { useParams } from 'react-router-dom';

import {fetchDataFromApi} from "../utils/api";
import LeftNav from "../components/LeftNav";
import SearchResultVideoCard from '../components/SearchResultVideoCard';
import { DataContext } from '../context/dataContext';


const SearchResult = () => {
    const [result, setResult] = useState();
    const {loading, setLoading} = useContext(DataContext);
    const {searchQuery} = useParams();


    const fetchDataFromSearchQuery = () =>{
        setLoading(true);
        fetchDataFromApi(`search/?q=${searchQuery}`).then((res) =>{
            console.log(res);
            setResult(res.contents);
            setLoading(false);
        })
    }



    useEffect(()=>{
        document.getElementById('root').classList.remove('custom-h');
        fetchDataFromSearchQuery()
    },[searchQuery])



  return (
    <div className='flex flex-row h-[calc(100%-56px)]'>
      <LeftNav/>
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto ">
        <div className="grid grid-cols-1 gap-2 p-5">
          {!loading && result?.map((item)=>{
              
                if(item?.type !== 'video') return false;
                return(
                <SearchResultVideoCard key={item?.video?.videoId}
                  video = {item?.video}
                />
                )
            })
          }
        </div>
      </div>
      
    </div>
  )
}

export default SearchResult
