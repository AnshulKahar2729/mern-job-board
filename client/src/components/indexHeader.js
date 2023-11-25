import React, { useEffect, useState } from 'react';
import PrimaryBtn from './buttons/primaryBtn';
import SecondaryBtn from './buttons/secondaryBtn';


const IndexHeader = () => {
  const primaryBtnText = "Log In";
  const secondaryBtnText = "Sign Up";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`bg-white h-20 w-full flex justify-between items-center ${scrolled ? 'shadow-md shadow' : ''}`} style={{paddingInline:"12.5%"}}>
        <div className=' '>JobLelo</div>
        <div className='flex gap-6'>
            <div>Contact</div>
            <div>Benefits</div>
            <div>About Us</div>
        </div>
        <div className='flex gap-6 items-center'>
            <PrimaryBtn primaryBtnText={primaryBtnText}/>
            <SecondaryBtn secondaryBtnText={secondaryBtnText}/>
        </div>
    </header>
  );
};
export default IndexHeader;





    

