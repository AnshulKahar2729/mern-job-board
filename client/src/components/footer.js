import React from 'react';
import { RiFacebookCircleLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiOutlineYoutube } from "react-icons/ai";

function Footer() {
  return (
    <div className='grid' style={{paddingInline:"12.5%"}}>
        <div className=' flex justify-between border-b-2 py-7' >
            <div className='grid justify-between'>
                <div className='text-3xl font-bold'>Joblelo</div>
                <div className='font-semibold grid gap-1'>
                    <p>Connect with us</p>
                    <div className='flex gap-3'>
                        <div className="text-gray-400 text-2xl"><AiOutlineYoutube /></div>
                        <div className="text-gray-400 text-2xl"><AiFillTwitterCircle /></div>
                        <div className="text-gray-400 text-2xl"><FaInstagram /></div>
                        <div className="text-gray-400 text-2xl"><RiFacebookCircleLine /></div>
                    </div>
                </div>
            </div>
            <div className='grid gap-2'>
                <p>About us</p>
                <p>Careers</p>
                <p>Employer home</p>
                <p>Sitemap</p>
            </div>
            <div className='grid gap-2'>
                <p>Help center</p>
                <p>Notices</p>
                <p>Grievances</p>
                <p>Report issue</p>
            </div>
            <div className='grid gap-2'>
                <p>Privacy Policy</p>
                <p>Terms and conditions</p>
                <p>Fraud alert</p>
                <p>Trust & safety</p>
            </div>
            <div className='p-2'>
                <div className='p-3 border-gray-300 border rounded-2xl'>
                    <p className='text-2xl'>Apply on the go</p>
                    <p className='text-gray-400'>Get real time job updates on our app</p>
                </div>
            </div>
        </div>
                
        <div className='flex justify-between text-gray-400 my-6'>
            <div className='flex gap-6 '>
                <p className='text-2xl '>dev<b className='text-gray-500'>dynamos</b></p>
                <div className='grid '>
                    <p>All trademarks are the property of their respective owners</p>
                    <p>All rights reserved © 2023 Info Edge (India) Ltd.</p>
                </div>

            </div>
            <div>
                <p>Our businesses</p>
            </div>
        </div>
    </div>
  )
}

export default Footer;