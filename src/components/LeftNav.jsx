import React, {useContext} from 'react'
import LeftNavMenuItems from './LeftNavMenuItems';
import {categories} from "../utils/constants";
import { DataContext } from '../context/dataContext';
const LeftNav = () => {
  
const {mobileMenu, selectCategory, setSelectCategory} = useContext(DataContext);

  const clickHandler = (name, type)=>{
    switch(type){
      case "category":
        return setSelectCategory(name);
      
      case "home":
          return setSelectCategory(name);
      case "menu":
        return false;

      default:
        break;
    }
  }



  return (
    <section className={`md:block h-[calc(100vh-56px)] w-[240px] absolute  md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all bg-white lg:sticky left-0 top-[56px]
      ${mobileMenu ? "translate-x-0" : ""}
    `}>
      <div className="flex flex-col px-5">
        {
          categories?.map((category, index)=>(
            <React.Fragment key={index}>
            <LeftNavMenuItems
              text = {category.type === "home" ? "Home" : category.name}
              icon={category.icon} 
              action={()=>{
                clickHandler(category.name, category.type)
              }}
              classname={`${selectCategory === category.name ? "bg-red" : ""}`}
              />
            {
              category.divider && (
                <hr className='my-5 border-black/[0.3]' />
              )
            }
            </React.Fragment>
          ))
        }
      </div>
      <hr className='my-10 border-black/[0.3]' />
      <div className="absolute bottom-10 text-[12px] px-5">
        Clone by: Praveen Kumar
      </div>
    </section>
  )
}

export default LeftNav
