"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { GiCrossMark } from "react-icons/gi";
import WelcomeMsg from "../../../public/WelcomeMsg.svg"
import terminalBg from "../../../public/terminalBg.jpg"

import Graph from "../../components/LineChart"
import axios from 'axios';

const WelcomeMessage = () => {
  return (
    <div className='w-auto h-auto'>
      <IoIosArrowForward className='text-[20px] text-[#4687e7]'/>
      <div className='w-full h-full flex justify-center items-center'>
        <Image
          src={WelcomeMsg}
        />
      </div>
      <p className='text-[18px] text-[#4687e7]'><strong>help</strong> -to see all available commands</p>
    </div>
  );
};

export default function page() {

  const commandInitial = [
    { commkey: 'first', comm:<WelcomeMessage/>},
    // { commkey: 'input', comm:'help'},
    // { commkey: 'outputgraph', comm:'graph'},
    // { commkey: 'outputtext', comm:'test'},
  ]

  const [commandHistory, setCommandHistory] = useState(commandInitial);

  const [inputValue, setInputValue] = useState('');
  const [outputMsg, setOutputMsg] = useState('');
  const [inputMsg, setInputMsg] = useState('');
  const [gData, setGData] = useState();

  const inputUpdateHistory = () => {
    const newInput = {commkey: 'input', comm: inputMsg}
    console.log("test2: ", newInput)
    setCommandHistory([...commandHistory, newInput]);
  };

  const outputUpdateHistory = () => {
    const newOutput = {commkey: 'outputtext', comm: outputMsg}
    setCommandHistory([...commandHistory, newOutput]);
  };

  useEffect(() => {
    if (inputMsg){
      console.log("Test: ", inputMsg);
      inputUpdateHistory();
      console.log("Test3: ", commandHistory);
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

  const handleHelp = () => {
    setTimeout(() => {
      setOutputMsg('h')
    }, 500);
  }

  const handleAbout = () => {
    setTimeout(() => {
      setOutputMsg('a')
    }, 500);
  }

  const fetchPrice = async (pair) => {
    try {
      const response = await axios.get(`https://api.binance.com/api/v3/avgPrice?symbol=${pair}`);
      console.log(response)
      
      setOutputMsg(`The current price of ${pair} is $${response.data.price}.`)
      // setData(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const uploadFile = async(file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded:', response.data);
      return response.data;
    } catch (error){
      console.error("Error uploading file:", error);
    }
  }

  const recieveData = async (dataArray, fileName) => {
    try {
      const response = await axios.post(`http://127.0.0.1:5000/load_csv/${fileName}`, dataArray, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Handle the response from the backend
      console.log('Response:', response);
      console.log('Response from backend:', response.data);
      setGData(response.data);
      
      // Return response or perform other actions
      return response.data;
    } catch (error) {
      console.error('Error sending data to backend:', error);
      throw error; // Rethrow the error or handle it according to your app's logic
    }
  };

  function capitalizeWords(arr) {
    return arr.map(word => {
      const firstLetter = word.charAt(0).toUpperCase();
      const rest = word.slice(1).toLowerCase();
  
      return firstLetter + rest;
    });
  }

  const handleDraw = (inputArr) => {
    const fileName = inputArr[1].split('_');
    let colF = capitalizeWords(fileName);
    const fileNameC = colF.join(' ');
    console.log(fileNameC);
    setTimeout(() => { 
      setOutputMsg(`Drawing chart based on ${fileNameC}...`)
    }, 500);
    // API call
    const columnArr = inputArr[2].split(',');
    console.log(columnArr);
    let cols = capitalizeWords(columnArr);
    console.log(cols);
    recieveData(cols, fileNameC)
    setTimeout(() => { 
      const newOutput = {commkey: 'outputgraph', comm: 'graph'}
      setCommandHistory([...commandHistory, newOutput]);
      setOutputMsg('Chart Drawn Successfully')
    }, 1000);


  }

  const handleInputChange = (event) => {
    if (event.key === 'Enter') {
      const userInput = inputValue.toLowerCase();
      setInputMsg(userInput)
      // console.log(userInput)
      setInputValue('');

      if (userInput === 'upload') {
        console.log("File Upload: ",userInput)
        handleFileUpload(
          (file) => {
            console.log("File Uploaded Successfully: ", file);
            // Add API Functionality here
            uploadFile(file);
          }
        )

      } 
      if (userInput === 'help'){
        handleHelp();
      }
      if (userInput === 'about'){
        handleAbout();
      }
      if (userInput.startsWith('fetch-price')){
        const inputArray = userInput.split(' ');
        inputArray[1] = inputArray[1].toUpperCase();
        console.log(inputArray);
        console.log("Fetch Pair: ", userInput)
        fetchPrice(inputArray[1]);
      }

      if (userInput.startsWith('draw')){
        const inputArray = userInput.split(' ');
        handleDraw(inputArray);
        console.log(inputArray);
      }
      
    //   else{
    //     console.log("Command: ",userInput)
    //     // write the hard coded commands like help and about 
    //     // call corressponding functions for external API commands
    //     // call backend for draw chart command.
    //     // handleCommand(userInput);
    //     if (userInput === 'help') {
    //       setOutputMsg('h')
    //     }
    //   }
    }
  };

  return (
    <div className='w-full h-[100vh] bg-slate-100'>
        <div className='w-full h-[8vh] bg-black flex justify-between items-center px-[30px]'>
          <p className=' text-[24px] text-[#9da5af]'>Antematter Terminal</p>
          <GiCrossMark className='text-[30px] text-white hover:text-red-600 hover:cursor-pointer'/>
        </div>
        <div className='w-full h-[92vh] bg-red-400'>
            {/* <Image src={terminalBg} className='w-full h-full'/> */}
          {/* <div className='w-full h-[92vh] bg-[#171b23] absolute z-0'>
          </div> */}
          <div className='w-full h-[92vh] bg-[#171b23] overflow-auto'>
            {/* <div className='w-full h-[92vh] bg-opacity-30 backdrop-blur-[5px] bg-white absolute z-10'/> */}
            <div className='w-full h-auto relative z-20'>
              {/* <p className='text-[36px] text-[white] text-center sm:text-left sm:ml-[20px]'>Welcome Back!!</p> */}
              <div className='w-full overflow-y-auto h-auto sm:pl-[20px]'>
                  {/* <p className='text-[#2c3444]'>This is where the past commands and output be displayed</p> */}
                  {
                  commandHistory.map((cmd, index) => (
                    <div className='w-auto h-auto' key={index}>
                      {
                      cmd.commkey === 'input' ? (
                        <div className='w-full h-full flex justify-start items-center mt-[20px]'>
                          <IoIosArrowForward className='text-[20px] text-[#39ff14]'/>
                          <p className='text-[#39ff14] ml-[15px]'>{`${cmd.comm}`}</p>
                        </div>

                        )
                      : cmd.commkey === 'outputtext' ? (
                        cmd.comm === 'h' ? (
                          <>
                          <p className='text-[#4687e7] ml-[35px] mt-[2px]'>Available commands:</p>
                          <p className='text-[#4687e7] ml-[35px] mt-[2px]'>- help: Show available commands</p>
                          <p className='text-[#4687e7] ml-[35px] mt-[2px]'>- about: Display information about this CLI</p>
                          <p className='text-[#4687e7] ml-[35px] mt-[2px]'>- fetch-price [coin]: Fetch the current price of a specified cryptocurrency</p>
                          <p className='text-[#4687e7] ml-[35px] mt-[2px]'>- upload: Opens the file explorer to allow uploading csv files only.</p>
                          <p className='text-[#4687e7] ml-[35px] mt-[2px]'>- draw [file] [columns]: Draws the chart of the specified columns of the file present in the draw-chart directory.</p>
                          </>
                          
                        )
                        : cmd.comm === 'a'? (
                          <>
                          <p className='text-[#4687e7] ml-[35px] mt-[2px]'>CLI Version 1.0</p>
                          <p className='text-[#4687e7] ml-[35px] mt-[2px]'>This is a front-end CLI created as a part of the Full Stack Hiring test. It simulates various command-line functionalities.</p>
                          </>
                        )
                        :(
                          <p className='text-[#4687e7] ml-[35px] mt-[2px]'>{`${cmd.comm}`}</p>
                        )

                        )
                      : cmd.commkey === 'outputgraph' ? (
                        <div className='w-full h-[400px]'>
                          {/* {gData} */}
                          <Graph d={gData}/>
                        </div>

                        // <p>{`${cmd.comm}`}</p>
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
              <div className='w-full h-[50px] mt-[20px] flex justify-start items-center sm:pl-[20px]'>
                <IoIosArrowForward className='text-[28px] text-[#e554f8]'/>
                <input
                    type='text'
                    autoFocus 
                    className='outline-none ml-[10px] bg-inherit text-[#9da5af] font-bold'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleInputChange}
                />
                {/* <p className='text-white'>{outputMsg}</p> */}
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