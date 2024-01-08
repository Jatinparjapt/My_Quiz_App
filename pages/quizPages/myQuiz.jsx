
import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import {Button} from '@mui/material';
import { styled ,Input} from '@mui/material';
import Table from '@mui/material/Table';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TableBody from '@mui/material/TableBody';
import DeleteIcon from '@mui/icons-material/Delete';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Head from 'next/head';
import EditIcon from '@mui/icons-material/Edit'; 
import ProgressBar from '../../components/progress';
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
export default function MyQuiz({questions}) {
  const {data} = questions
  const [idToUpdateQuestion , setIdToUpdateQuestion] = useState('')
  const [updateQuestion, setUpdateQuestion] = useState("")
  const [radioButtonValue, setRadioButtonValue] = useState(true)
  const [secondButton , setSecondButton] = useState(true)
  const [isChecked , setChecked] = useState(true)
  const questionUpdate = (e)=>{
setUpdateQuestion(e.target.value)
   const data =  JSON.stringify(updateQuestion)
localStorage.setItem("newQuestion",data)
    } 
const handleChange = ()=>{
    setChecked((prevChecked) => !prevChecked)  
}

const selectQuestionDelete =  async (isId)=>{
  let deleteConfirm = confirm("Are you sure to delete this question?");
  console.log(isId)
    if(deleteConfirm){
      const data = await axios.delete("https://myquiz01app-6d1b99b4c8a3.herokuapp.com/api/deleteQuestion",{ data: { id: isId }})
      // console.log(data.data , "data.data") 
      if(data.status === 200){
        alert("Question Deleted")
      }else{
        alert("Some error occured")
      }}
    }



 const updateSelectedQuestion =  (id)=>{
    setIdToUpdateQuestion(id)
    setRadioButtonValue(false)
    setSecondButton(false) 
}

 const changeHideSetting = async (e)=>{
  setRadioButtonValue(true)
   setSecondButton(true)
   const updateQuestionInDatabase =  await axios.put(`https://myquiz01app-6d1b99b4c8a3.herokuapp.com/api/updateQuestion`,  {
    id:idToUpdateQuestion,
    question :localStorage.getItem("newQuestion") 
   })
  //  console.log(updateQuestionInDatabase.status , updateQuestionInDatabase, "getdata")
   if(updateQuestionInDatabase.status == 200){
    alert("Update Question ")
   }else{
    alert("Not Update Question Perfectly")
   }
 }
 if(!data){
  return (
<div className="mt-16" >
  <h1>loading ......</h1>
  </div>
  )
  
 }else{


  return (
    <>
    <div className="mt-16" >
  <ProgressBar/>
  </div>
    <div  className='mt-20 m-5' >
    <div
          id="hideDiv"
          className={` mt-32 flex justify-center  ${
            radioButtonValue ? "hidden" : ""
          } `}
        >
          <div className="w-2/5 h-2/6  absolute inset-y-1/3 inset-x-1/3   ">
            <form className=" rounded-xl w-[96%]   ">
              <FormControl className="m-3  " variant="standard">
                <FormLabel
                  className="text-2xl text-zinc-100"
                  id="demo-error-radios"
                >
                 <Input
              placeholder=" Enter Question"
              name="updateQuestion"
             value={updateQuestion}
             onChange={questionUpdate}
              className=" m-2 w-[96%] p-4 rounded-md border border-solid border-black "
            />
            <Button className='rounded-full border-solid font-semibold  text-blue-700 border-blue-700 border-2 hover:bg-black  text-md pl-12 pt-2 pb-3 pr-12' onClick={changeHideSetting} >Save Update</Button>
                </FormLabel>
              </FormControl>
            </form>
          </div>
        </div>
        <div className={` ${secondButton ? "" : "hidden"}`} >
      <div className={`flex justify-end mr-16 mb-5`  }>
        <Link className="rounded-full border-solid  text-blue-700 border-blue-700 border-2 hover:bg-black  text-md pl-12 pt-2 pb-3 pr-12" href={"/quizPages/createQuiz"} >Create Quiz </Link>
      </div>
    <TableContainer component={Paper}>
      <Table className='w-full' aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >Quiz No</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell >Status</StyledTableCell>
            <StyledTableCell >Created On</StyledTableCell>
            <StyledTableCell >Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          { data.map((items , index)=>(
            <StyledTableRow key={items._id} >
              <StyledTableCell component="th" scope="row">{index+1}
              </StyledTableCell>
              <StyledTableCell >{items.category}</StyledTableCell>
              <StyledTableCell > <FormControlLabel onChange={handleChange} label={isChecked? "active" : "inactive"} control={<Switch defaultChecked />} /></StyledTableCell>
              <StyledTableCell >{items.createdAt}</StyledTableCell>
              <StyledTableCell >
              <Grid item xs={8}>
        <DeleteIcon  onClick={()=>{selectQuestionDelete(items._id)}} />
        {/* onClick={()=>{updateQuestion(question)}} for update question using question */}
        <EditIcon  onClick={()=>{updateSelectedQuestion(items._id)}}  />
      </Grid>
      </StyledTableCell>
            </StyledTableRow>
          
          ))}

        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
    </>
  );
} }
export async function getServerSideProps(){
  try {
    const getQuestionFromDatabase = await axios.get("https://myquiz01app-6d1b99b4c8a3.herokuapp.com/api/getQuestions")
    const questions =  getQuestionFromDatabase.data
   
    return{
      props:{questions}
    }
  } catch (error) {
    return {
      props:error
    }
  }
}
