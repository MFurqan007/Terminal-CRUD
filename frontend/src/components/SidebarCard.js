"use client"

import React from 'react'
import { FaTerminal } from "react-icons/fa";

export default function SidebarCard() {
  return (
    <div className='w-[150px] h-[150px] hover:cursor-pointer hover:border-2 hover:border-[#E39FF6] rounded-xl p-[15px] mt-[15px]'>
        <div className='w-full h-[90px] bg-black rounded-3xl flex justify-center items-center'>
            <FaTerminal className='text-[50px] text-white'/>
        </div>
        <div className='w-full h-[25px] mt-[5px] flex justify-center items-center'>
            <p className='text-black text-[20px] font-[600]'>Terminal</p>
        </div>
    </div>
  )
}
