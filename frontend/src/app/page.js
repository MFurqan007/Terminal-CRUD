"use client"
import React, { useState }  from 'react'
import Image from 'next/image'
import BG from "../../public/background.png"
import { IoMenuOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";


import SidebarCard from '@/components/SidebarCard';

export default function Home() {
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };


  return (
    <>
    <div className='w-full h-full absolute z-0'>
      <Image src={BG} className='w-full h-full'/>
    </div>
    <div className='sm:hidden w-full h-[100vh] relative z-10 border-2 border-red-700'>
      <div className='w-[80px] h-[80px] flex justify-center items-center'>
        {
          openMenu?
          <RxCross1 className='text-[36px] hover:text-[#FFBCD9] hover:cursor-pointer' onClick={handleMenu}/>
          :
          <IoMenuOutline className='text-[40px] hover:text-[#FFBCD9] hover:cursor-pointer' onClick={handleMenu}/>
        }
      </div>
      {openMenu && (
        <>
          <div className='w-full h-[70vh] flex justify-center items-center'>
            <div className='w-[80%] h-[65vh] bg-opacity-20 backdrop-blur-[5px] bg-white absolute z-10 rounded-2xl'/>
            <div className='w-[80%] h-[65vh] relative z-20 flex flex-col justify-start items-center'>

              <SidebarCard/>

              {/* <div className='w-[150px] h-[150px] border-2 border-[#E39FF6] rounded-xl p-[15px] mt-[15px]'>
                <div className='w-full h-[90px] bg-black rounded-3xl flex justify-center items-center'>
                  <FaTerminal className='text-[50px] text-white'/>
                </div>
                <div className='w-full h-[25px] mt-[5px] flex justify-center items-center'>
                  <p className='text-black text-[20px] font-[600]'>Terminal</p>
                </div>
              </div> */}
            </div>
          </div>
        </>
      )}
    </div>
    <div className='hidden sm:block sm:w-full sm:h-[100vh] sm:relative sm:z-10'>
      <div className='w-[160px] max-w-[250px] h-[100vh] bg-opacity-30 backdrop-blur-[5px] bg-white absolute z-10 rounded-tr-xl rounded-br-xl'/>
      <div className='w-[160px] max-w-[250px] h-[100vh] relative z-20 flex flex-col justify-start items-center '>
        <SidebarCard/>
      </div>
    </div>

    {/* <div className='w-[500px] h-[500px] relative z-10 bg-black'>

    </div> */}
    </>
    
  )
}
