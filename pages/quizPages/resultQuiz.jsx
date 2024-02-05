import  React from 'react';
import Link from 'next/link';
import { Typography } from "@mui/material";
import ProgressBar from '../../components/progress';
import Head from 'next/head';
export default function ResultQuiz() {
  const plyerName = typeof window !== 'undefined' ? sessionStorage.getItem("score") : null;
  const score = plyerName ? JSON.parse(plyerName) : null;
  return (
    <>
    <Head>
        <title>Result Page</title>
      </Head>
    <div className="mt-16" >
    <ProgressBar  />
    </div>
    <div className='mt-20 flex justify-center ' >
      <div>
      <Typography variant="subtitle1" component="div">
         <h1 className='rounded-md text-4xl ml-3 text-gray-800' >Hey ! Hacker Thats Your Result : {score}</h1>
      </Typography>
      <br />
      <div className='flex justify-center ' >

     
      <Link className='rounded-full border-solid border-2  hover:text-sky-100 hover:bg-black text-2xl pl-20 pr-20 pt-5 pb-5' href = ".." > Back To Home</Link>
      </div>
      </div>
    </div>
    </>
  );
}