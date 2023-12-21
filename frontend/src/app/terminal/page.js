"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import { FaTerminal } from "react-icons/fa";

export default function page() {

  return (
    <div className='w-full h-[100vh] bg-black pt-[20px]'>
        <p className='text-[36px] text-[white] text-center sm:text-left sm:ml-[20px]'>Welcome Back!!</p>
        <div className='w-full overflow-x-auto h-auto border-2 border-white sm:pl-[20px]'>
            <p className='text-white'>This is where the past commands and output be displayed</p>
        </div>
        <div className='w-full h-[50px] mt-[20px] flex justify-start items-center sm:pl-[20px]'>
            <FaTerminal className='text-[28px] text-white'/>
            <input
                type='text'
                autoFocus 
                className='outline-none ml-[10px] bg-black text-white font-bold'
            />
        </div>
    </div>
  )
}
