import React, { useState ,useEffect } from 'react';
import { Button ,Input,FormControl,FormControlLabel,RadioGroup,Radio } from '@mui/material';
import { useRouter } from 'next/router';
import { dataStore } from '..';
import ProgressBar from '../components/progress';
import axios from 'axios';
import Head from 'next/head';
export default function PlayQuiz({questions}) {
  const router = useRouter()
  const {data } = questions 
  const [radioButtonValue, setRadioButtonValue] = useState(false);
  const [score,setScore] = useState(0)
  const [name ,setName] = useState('')
  const [isDisabled ,setIsDisabled] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [checked ,setChecked] = useState({
    option1 :{check : false},
    option2 :{check : false},
    option3 :{check : false}
  })
  // console.log(data[currentIndex])
  useEffect(() => {
    // Dispatch the score after the state has been updated
    dataStore.dispatch({
      type: "updateScore",
      payload: score,
    });
    
  }, [score, currentIndex]);
const playerName = (event)=>{
  const {value} = event.target
  setName(value)
  }
const startQuizButton = (event)=>{
  event.preventDefault()
  const inputname = JSON.stringify(name)
    localStorage.setItem("name", inputname)
    setRadioButtonValue(true)
}
  const updateScore = (event)=>{
   const scoreValue = event.target.value
  setIsDisabled(false)
   if(scoreValue == "option1"){
    setChecked((prevChecked) => ({
      ...prevChecked,
      option1: { ...prevChecked.option1, check: true },
      option2: { ...prevChecked.option2, check: false },
      option3: { ...prevChecked.option3, check: false },
    }));
   }else if(scoreValue == "option2"){
    setChecked((prevChecked) => ({
      ...prevChecked,
      option1: { ...prevChecked.option1, check: false },
      option2: { ...prevChecked.option2, check: true },
      option3: { ...prevChecked.option3, check: false },
    }));
   }
   else {
    setChecked((prevChecked) => ({
      ...prevChecked,
      option1: { ...prevChecked.option1, check: false },
      option2: { ...prevChecked.option2, check: false },
      option3: { ...prevChecked.option3, check: true },
    }));
   }
   
  }
  
  const submitSocre = (event)=>{
    event.preventDefault(); 
    if(score < 100){
    if(checked.option1.check && data[currentIndex].option1.checked == true ){
      setScore((prevScore) => prevScore + 10)
    }else if(checked.option2.check && data[currentIndex].option2.checked == true ){
      setScore((prevScore) => prevScore + 10)
    }else if(checked.option3.check && data[currentIndex].option3.checked == true  ){
      setScore((prevScore) => prevScore + 10)
    }else{
      setScore(score+0)
    }
  }else{
    setScore(score+0)
  }

    if(currentIndex == data.length-1){
      alert("Data Submitted")
        router.push("http://localhost:3000/quizPages/resultQuiz")
    }else{
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % data.length;
        return newIndex === 0 ? prevIndex : newIndex;
      });
    }
    
  }
 if(!data){
  return (
<div className="mt-16" >
  <h1>loading ......</h1>
  </div>
  )
  
 }else {
  return (
    <>
    <Head>
        <title>Play Quiz Page</title>
      </Head>
      <div className="mt-16" >
  <ProgressBar />
  </div>
  <div className="mainDiv">

  <div
          id="hideDiv"
          className={` mt-32 flex justify-center  ${
            radioButtonValue ? "hidden" : ""
          } `}
        >
          <div className="w-2/4 h-2/4 absolute inset-y-1/3 inset-x-2/5   ">
            <form className=" rounded-xl w-[80%]  ">
            <Input
              placeholder=" Enter Category"
              name="name"
              value={name}
              onChange={playerName}
              className=" m-2 w-[96%] p-4 rounded-md border border-solid border-black "
            />
            <div className="flex justify-center mr-16 ">
  <Button onClick={startQuizButton} className="rounded-full border-solid border-2 hover:bg-black text-md pl-12 pr-12">
    Submit
  </Button>
</div>
              
            </form>
          </div>
        </div>
    <div  className= {`  mt-24 m-20 border border-sky-400 relative  ${
            radioButtonValue ? "" : "hidden"
          } `} >
      <div className='mt-0 flex justify-center' >
        <h1 className='text-2xl  font-bold' >
        {data[currentIndex].category}
        </h1>
      </div>
        <div className='bg-sky-100 mt-20 ml-5 ' >
            <p>{data[currentIndex].question}</p>
        </div>
        <div className='m-8'>
    <FormControl  >
        <RadioGroup
       defaultValue={null}
        name="radio-buttons-group">
 <FormControlLabel defaultChecked ={false} value={`option1`} name={`option1`} onChange={updateScore} control={<Radio />} label={data[currentIndex].option1.data} />
 <FormControlLabel defaultChecked ={false} value={`option2`} name={`option2`} onChange={updateScore} control={<Radio />} label={data[currentIndex].option2.data} />
 <FormControlLabel defaultChecked ={false} value={`option3`} name={`option3`} onChange={updateScore} control={<Radio />} label={data[currentIndex].option3.data} />
      </RadioGroup>
    </FormControl>
    </div>
    <div>
      <div>
        <h4>Question {currentIndex +1}</h4>
      </div>
     
    <div className="flex justify-end mr-16 ">
    {currentIndex  === data.length-1  ? (
  <Button onClick={submitSocre} className="rounded-full border-solid border-2 hover:bg-black text-md pl-12 pr-12">
    Submit
  </Button>
) : <Button onClick={submitSocre} id='nextQuestionButton' disabled={isDisabled}  className= {` rounded-full border-solid border-2  hover:bg-black text-md pl-12 pr-12`} >Next Question </Button> }</div>
    </div>
    </div> 
    </div>
    </>
  )}
}


export async function getServerSideProps(){
  try {
    const getQuestionFromDatabase = await axios.get("/api/getQuestions")
    const questions = await getQuestionFromDatabase.data
    return{
      props:{questions}
    }
  } catch (error) {
    return {
      props:error
    }
  }
   
}