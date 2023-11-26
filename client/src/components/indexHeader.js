import React, { useEffect, useState } from 'react';
import useScroll from '../hooks/scroll';


const IndexHeader = ({onSignUpClick}) => {
  const scrolled = useScroll();

  return (
    <header className={`bg-white h-20 w-full flex justify-between items-center ${scrolled ? 'shadow-md' : ''}`} style={{paddingInline:"12.5%"}}>
        <div className=' '>JobLelo</div>
        <div className='flex gap-6'>
            <div>Contact</div>
            <div>Benefits</div>
            <div>About Us</div>
        </div>
        <div className='flex gap-6 items-center'>
          <button onClick={onSignUpClick} className="bg-gray-400 py-2 px-4 text-white rounded-md ">Login</button>
          <button  className='bg-blue-600 py-2 px-4 text-white rounded-md'>Sign Up</button>
        </div>
    </header>
  );
};
export default IndexHeader;





    

