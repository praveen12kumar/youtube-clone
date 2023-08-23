import React, {useContext, useState} from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {ytLogo} from "../assets/index";
import {ytLogoMobile} from "../assets/index";

import {SlMenu} from "react-icons/sl";
import {IoIosSearch} from "react-icons/io";
import {RiVideoAddLine} from "react-icons/ri";
import {FiBell} from "react-icons/fi";
import {AiOutlineClose} from "react-icons/ai";
import {BsMicFill} from "react-icons/bs";

import { DataContext } from '../context/dataContext';
import Loader from '../shared/Loader';

const Header = () => {
  const navigate = useNavigate();

  const {loading, mobileMenu, setMobileMenu} = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState("");

  const searchQueryHandler = (event)=>{
    if((event?.key === "Enter" || event === 'searchButton') && searchQuery?.length > 0 ){
      navigate(`/searchResults/${searchQuery}`);
    }
  }


  const mobileMenuToggle = ()=>{
    setMobileMenu(!mobileMenu);
  }

  const {pathname} = useLocation();
  
  const pageName = pathname?.split("/")?.filter(Boolean)?.[0];




  return (
    <header className='h-14 sticky top-0 z-10 flex items-center justify-between px-2 md:px-4 bg-white dark:bg-black'>
      {loading && <Loader/>}
      <div className="flex h-6 items-center ">
                {pageName !== "video" && (
                    <div
                        className="flex md:mr-2 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.2]"
                        onClick={mobileMenuToggle}
                    >
                        {mobileMenu ? (
                            <AiOutlineClose className="text-black text-xl md:hidden" />
                        ) : (
                            <SlMenu className="text-black text-xl md:hidden" />
                        )}
                    </div>
                )}
                <Link to="/" className="flex h-10 items-center">
                    <img
                        className="h-full hidden md:block"
                        src={ytLogo}
                        alt="Youtube"
                    />
                    <img
                        className="h-full md:hidden"
                        src={ytLogoMobile}
                        alt="Youtube"
                        
                    />
                </Link>
          </div>
          <div className="group flex items-center h-full">
                <div className="flex h-8 md:h-8 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500
                  md:group-focus-within:ml-5 md:group-focus-within:pl-0
                ">
                          <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
                            <IoIosSearch className='text-[#303030] text-xl'/>
                          </div>
                          <input type="text"
                          className='bg-transparent outline-none text-[#303030] px-5 md:pl-5 w-44 md:group-focus-within:pl-0 md:w-80 sm:w-60'
                          onChange={(e)=> setSearchQuery(e.target.value)}
                          onKeyUp={searchQueryHandler}
                          placeholder='Search'
                          value={searchQuery}
                          />
                </div>
                <button className='w-[40px] md:w-[60px] h-8 md:h-8 flex items-center justify-center rounded-r-3xl border border-l-0 border-[#303030] bg-black/[0.3]
                  ' onClick={()=>searchQueryHandler("searchButton")}
                >
                            <IoIosSearch className='text-xl'/>
                </button>
                <div className="hidden md:ml-6 w-8 h-8 rounded-full bg-black/[0.2] md:flex items-center justify-center hover:bg-black/[0.3] hover:text-slate-600">
                          <BsMicFill />
                </div>          
          </div>
          <div className="flex items-center md:mr-10">
                <div className="hidden md:flex">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-[#303030]/[0.3]">
                    <RiVideoAddLine className="text-xl cursor-pointer" />
                  </div>
                  <div className="ml-2 flex items-center justify-center h-8 w-8 rounded-full hover:bg-[#303030]/[0.3]">
                    <FiBell className="text-xl cursor-pointer" />
                  </div>
                </div>
                <div className="flex h-8 w-8 overflow-hidden rounded-full md:ml-4">
                    <img src="https://xsgames.co/randomusers/assets/avatars/female/67.jpg" />
                </div>
          </div>
    </header>
  )
}

export default Header
