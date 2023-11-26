import React, { useEffect, useState } from 'react';
import PrimaryBtn from './buttons/primaryBtn';
import SecondaryBtn from './buttons/secondaryBtn';
import useScroll from '../hooks/scroll';


const IndexHeader = () => {
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
            <SecondaryBtn>Login</SecondaryBtn>
            <PrimaryBtn>Sign Up</PrimaryBtn>
        </div>
    </header>
  );
};
export default IndexHeader;





    

