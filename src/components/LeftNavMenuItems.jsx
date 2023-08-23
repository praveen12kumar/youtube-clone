import React from 'react';



const LeftNavMenuItems = ({text, icon, classname, action }) => {
  

  

  return (
    <div className={
      "text-slate-700 text-sm cursor-pointer h-10 flex items-center px-3 mb-[1px] rounded-lg hover:bg-black/[0.15] " +
      classname
  }
      onClick={action}
    >
      <span className='text-[14px] flex items-center font-medium'>
        <span className='mr-3'>{icon}</span>  
      {text}</span>
    </div>
  )
}

export default LeftNavMenuItems
