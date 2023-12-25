"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { GiCrossMark } from "react-icons/gi";
import WelcomeMsg from "../../../public/WelcomeMsg.svg"
import terminalBg from "../../../public/terminalBg.jpg"

const WelcomeMessage = () => {
  return (
    <div className='w-auto h-auto border-2 border-white'>
      <Image
        src={WelcomeMsg}
      />
    </div>
  );
};

export default function page() {

  const commandInitial = [
    { commkey: 'first', comm:<WelcomeMessage/>},
    { commkey: 'input', comm:'help'},
    { commkey: 'output', comm:'available commands'},
  ]

  const [commandHistory, setCommandHistory] = useState(commandInitial);

  const [inputValue, setInputValue] = useState('');
  const [outputMsg, setOutputMsg] = useState('');
  const [inputMsg, setInputMsg] = useState('');

  const inputUpdateHistory = () => {
    const newInput = {commkey: 'input', comm: inputMsg}
    setCommandHistory([...commandHistory, newInput]);
  };

  const outputUpdateHistory = () => {
    const newOutput = {commkey: 'output', comm: outputMsg}
    setCommandHistory([...commandHistory, newOutput]);
  };

  useEffect(() => {
    if (inputMsg){
      inputUpdateHistory();
    }
  }, [inputMsg]); 

  useEffect(() => {
    if (outputMsg){
      outputUpdateHistory();
      setOutputMsg('');
      setInputMsg('');
    }
  }, [outputMsg]); 

  const handleFileUpload = (successCallback) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept ='.csv';
    fileInput.click();

    fileInput.addEventListener('change', (event) => {
      const selectedFile = event.target.files[0];
      // console.log('Uploaded file:', selectedFile);

      setTimeout(() => {
        if(selectedFile) {
          if(selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')){
            console.log('Uploaded CSV file: ', selectedFile);
            setOutputMsg(selectedFile.name + " has been uploaded successfully")
            successCallback(selectedFile);
          }
          else {
            console.log("Please select a CSV file.")
            setOutputMsg("Invalid File Format. File upload Failed!")
            // errorCallback("Invalid File Format")
          }
        }
      }, 2000)

    });
  };

  const handleInputChange = (event) => {
    if (event.key === 'Enter') {
      const userInput = inputValue.toLowerCase();
      setInputMsg(userInput)
      setInputValue('');

      if (userInput === 'upload') {
        console.log("File Upload: ",userInput)
        handleFileUpload(
          (file) => {
            console.log("File Uploaded Successfully: ", file);
            // Add API Functionality here
          }
        )

      } else {
        console.log("Command: ",userInput)
        // write the hard coded commands like help and about 
        // call corressponding functions for external API commands
        // call backend for draw chart command.
        // handleCommand(userInput);
      }
    }
  };

  return (
    <div className='w-full h-[100vh] bg-slate-100'>
        <div className='w-full h-[8vh] bg-black flex justify-between items-center px-[30px]'>
          <p className=' text-[24px] text-[#9da5af]'>Antematter Terminal</p>
          <GiCrossMark className='text-[30px] text-white hover:text-red-600 hover:cursor-pointer'/>
        </div>
        <div className='w-full h-[92vh] bg-red-400'>
          <div className='w-full h-[92vh] bg-[#171b23] absolute z-0'>
            {/* <Image src={terminalBg} className='w-full h-full'/> */}
          </div>
          <div className='w-full h-[92vh] relative z-10'>
            {/* <div className='w-full h-[92vh] bg-opacity-30 backdrop-blur-[5px] bg-white absolute z-10'/> */}
            <div className='w-full h-[92vh] relative z-20 border-2 border-red-600'>
              {/* <p className='text-[36px] text-[white] text-center sm:text-left sm:ml-[20px]'>Welcome Back!!</p> */}
              <div className='w-full overflow-x-auto h-auto border-2 border-white sm:pl-[20px]'>
                  {/* <p className='text-[#2c3444]'>This is where the past commands and output be displayed</p> */}
                  {
                  commandHistory.map((cmd, index) => (
                    <div className='w-auto h-auto border-2 border-[red]' key={index}>
                      {cmd.commkey === 'input' ? (
                        <div className=''>
                          <p className='text-[#39ff14]'>{`Input Command: ${cmd.comm}`}</p>
                        </div>

                        )
                      : cmd.commkey === 'output' ? (
                        <p className='text-white'>{`Output Command: ${cmd.comm}`}</p>
                        )
                      : cmd.commkey === 'first' ? (
                        cmd.comm
                      )
                      : (
                        <p className='text-white'>Other Command</p>
                        )
                      }
                    </div>
                  )) 
                  }
              </div>
              <div className='w-full h-[50px] mt-[20px] flex justify-start items-center border-2 border-white sm:pl-[20px]'>
                <IoIosArrowForward className='text-[28px] text-[#e554f8]'/>
                <input
                    type='text'
                    autoFocus 
                    className='outline-none ml-[10px] bg-inherit text-[#9da5af] font-bold'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleInputChange}
                />
                <p className='text-white'>{outputMsg}</p>
              </div>
            </div>
          </div>
        </div>
        
    </div>
  )
}

{/* <p className='text-[36px] text-[white] text-center sm:text-left sm:ml-[20px]'>Welcome Back!!</p>
        <div className='w-full overflow-x-auto h-auto border-2 border-white sm:pl-[20px]'>
            <p className='text-white'>This is where the past commands and output be displayed</p>
            {
             commandHistory.map((cmd, index) => (
              <div className='w-auto h-auto border-2 border-[red]' key={index}>
                {cmd.commkey === 'input' ? (
                  <div className=''>
                    <p className='text-white'>{`Input Command: ${cmd.comm}`}</p>
                  </div>

                  )
                : cmd.commkey === 'output' ? (
                  <p className='text-white'>{`Output Command: ${cmd.comm}`}</p>
                  )
                : cmd.commkey === 'first' ? (
                  cmd.comm
                )
                : (
                  <p className='text-white'>Other Command</p>
                  )
                }
              </div>
             )) 
            }
        </div> */}