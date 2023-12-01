import React from "react";
import { IoSearch } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

const UserHeader = () => {
  
  return (
    <>
      <div className="w-full h-[72px] px-[12.5%] flex justify-center">
          <div className="bg-white w-[1120px] h-full flex justify-between items-center">
            <div className="flex items-center gap-20">
              <div className="flex gap-16 items-center">
                <div className="mr-5 text-3xl font-serif">JobLelo</div>
                <div>Jobs</div>
                <div>Companies</div>
                <div>Services</div>
              </div>
              <div className="rounded-full flex items-center justify-center h-[40px] pr-2 border-gray-200 border shadow-sm"
              >
                <input
                  className="h-full rounded-3xl focus:outline-none pl-4"
                  type="search"
                  placeholder="Search jobs here"
                  
                />
                <button className="text-white text-[20px] bg-blue-600 rounded-full p-1">
                  <IoSearch />
                </button>
              </div>
            </div>
            <div className="text-4xl ">
                <FaUserCircle />
            </div>
          </div>
        </div>
    </>
  );
}

export default UserHeader;
