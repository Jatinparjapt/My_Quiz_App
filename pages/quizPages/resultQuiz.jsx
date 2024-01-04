import  React from 'react';
import Link from 'next/link';
import { Typography } from "@mui/material";
import ProgressBar from '../components/progress';
import Head from 'next/head';
export default function ResultQuiz() {
  const score = sessionStorage.getItem("score")
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
         <h1 className='rounded-md text-4xl ml-3 text-gray-800' >Result: {score}</h1>
      </Typography>
      <br />
      <Link className='rounded-full border-solid border-2  hover:bg-black text-md pl-12 pr-12' href = ".." > Back To Home</Link>
      </div>
    </div>
    </>
  );
}