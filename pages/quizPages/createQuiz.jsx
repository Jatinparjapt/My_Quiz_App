import React, { useState } from "react";
import { useRouter } from "next/router";
import { Input ,TextField,Radio ,IconButton,RadioGroup ,FormLabel,FormControlLabel ,Button ,InputAdornment,FormControl} from "@mui/material";
import ProgressBar from '../../components/progress';
import DeleteIcon from "@mui/icons-material/Delete";
import Head from "next/head";
import { dataStore } from "../index";
export default function CreateQuiz() {
  const router = useRouter()
  const [radioButtonValue, setRadioButtonValue] = useState("");
  const [details, setDetails] = useState({
    questionType: "",
    category: "",
    description: "",
    question: "",
    option1: {value : "", checked: false },
    option2: { value: "", checked: false },
    option3: { value: "", checked: false },
    
  });

  
  const addQuestion = (event) => {
    console.log("onClickEventFired.....");
    event.preventDefault();
    dataStore.dispatch({
      type: "addToDatabase",
      payload: details,
    });
    setDetails((prevDetails) => ({
      ...prevDetails,
        questionType: "",
        category: "",
        description: "",
        question: "",
        option1: {data : "", checked: false },
        option2: { data: "", checked: false },
        option3: { data: "", checked: false },
    }));
    router.push("/quizPages/createQuiz");
    alert("Question Saved ")
  };
  const getDetailsByOnChangeEvent = (event , optionKey) => {
    const { name, value } = event.target;
    setDetails((previous) => ({
      ...previous,
      [name]: value,
      [optionKey]: { ...previous[optionKey], [name]: value },
    }));
  };
  const hideComponent = (event) => {
    setDetails((preValue) => ({
      ...preValue,
      questionType: event.target.value,
    }));

    setRadioButtonValue(event.target.value);
  }

  const selectOption = (event)=>{
    const {value} = event.target
    if(value == "option1" ){
      setDetails((preitems)=>({
        ...preitems,
       option1: {...preitems.option1 , checked :true},
       option2: {...preitems.option2 , checked :false},
       option3: {...preitems.option3 , checked :false}

      }))
    }
    else if (value == "option2"){
      setDetails((preitems)=>({
        ...preitems,
        option1: {...preitems.option1 , checked :false},
       option2: {...preitems.option2 , checked :true},
       option3: {...preitems.option3 , checked :false}
      }))
    }
    else {
      setDetails((preitems)=>({
        ...preitems,
        option1: {...preitems.option1 , checked :false},
       option2: {...preitems.option2 , checked :false},
       option3: {...preitems.option3 , checked :true}
      }))
    }
  }
  // const deleteValue = (index) => {
  //   const newOptionsMcq = [...details.optionsMcq];
  //   newOptionsMcq[index][`option${index + 1}`] = ""; // Assuming your options are named option1, option2, etc.
  //   setDetails({
  //     ...details,
  //     optionsMcq: newOptionsMcq,
  //   });
  // };

  return (
    <>
      <div className="mt-16" >
  <ProgressBar  />
  </div>
  <Head>
        <title>Create Quiz Page</title>
      </Head>
      <div
        id="mainDiv"
        className="mt-32 relative   "
        onChange={getDetailsByOnChangeEvent}
      >
        <div
          id="hideDiv"
          className={` mt-32 flex justify-center  ${
            radioButtonValue ? "hidden" : ""
          } `}
        >
          <div className="w-2/4 h-2/4 bg-[#204468] absolute inset-y-1/3 inset-x-1/3   ">
            <form className=" rounded-xl w-[80%] bg-[#204468]  ">
              <FormControl className="m-3  " variant="standard">
                <FormLabel
                  className="text-2xl text-zinc-100"
                  id="demo-error-radios"
                >
                  Select Question Type
                </FormLabel>
                <RadioGroup  name="quiz">
                  <FormControlLabel
                    className="text-xl text-zinc-100"
                    onClick={hideComponent}
                    value="MCQ(Single Answer)"
                    control={<Radio />}
                    label="MCQ(Single Answer)"
                  />
                  <FormControlLabel
                    className="text-xl"
                    disabled={true}
                    value="MCQ(Multiple Answer)"
                    control={<Radio />}
                    label="MCQ(Multiple Answer)"
                  />
                </RadioGroup>
              </FormControl>
            </form>
          </div>
        </div>

        <div className={`${radioButtonValue ? "" : "hidden"}`}>
          <div className="ml-4">
            <h1 className="text-[4rem]">Create New Quiz</h1>
          </div>

          <div className="m-4  ">
            <label className="mr-18 text-xl ml-3 text-gray-800" htmlFor="">
              Category
            </label>
            <Input
              placeholder=" Enter Category"
              name="category"
              value={details.category}
              onChange={getDetailsByOnChangeEvent}
              className=" m-2 w-[96%] p-4 rounded-md border border-solid border-black "
            />

            <label className="text-gray-800 text-xl ml-3 " htmlFor="">
              Description
            </label>
            <form noValidate autoComplete="off">
              <FormControl className="m-2 w-[96%]">
                <Input
                  name="description"
                  value={details.description}
                  onChange={getDetailsByOnChangeEvent}
                  className=" p-4 rounded-md border border-solid border-black"
                  placeholder="Please enter text"
                />
              </FormControl>
            </form>
          </div>
          <div className="ml-3">
            <label className="mr-18 ml-4 text-xl text-gray-800  " htmlFor="">
              Question
            </label>
            <Input
              name="question"
              value={details.question}
              onChange={getDetailsByOnChangeEvent}
              placeholder=" Enter Question"
              className=" m-2 w-[94%] p-4 rounded-md border border-solid border-black "
            />
            <div className="w-[94%] relative rounded-md m-2 grid grid-cols-2 bg-slate-400 ">
              <FormControl className="m-3 " variant="standard">
                <FormLabel
                  className="text-2xl text-zinc-100"
                  id="demo-error-radios"
                >
                 
                </FormLabel>
                <RadioGroup >
                  <FormControlLabel
                  onChange={selectOption}
                    className="text-xl  text-zinc-100"
                    value="option1"
                    control={<Radio />}
                    label={
                      <>
                        <TextField
                          placeholder="option1"
                          name="data"
                          value={details.option1.data}
                          onChange={(event) => getDetailsByOnChangeEvent(event, "option1")}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment onClick={()=>(deleteValue(0))}  position="end">
                                <IconButton  edge="end">
                                  <DeleteIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </>
                    }
                  />
                  <FormControlLabel
                  onChange={selectOption}
                    className=" text-xl"
                    value= "option2"
                    control={<Radio />}
                    label={
                      <>
                        <TextField
                          value={details.option2.data}
                          onChange={(event) => getDetailsByOnChangeEvent(event, "option2")}
                          placeholder="option2"
                          name="data"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment onClick={()=>(deleteValue(1))}  position="end">
                                <IconButton  edge="end">
                                  <DeleteIcon  />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </>
                    }
                  />
                  <FormControlLabel
                    className="text-xl"
                    onChange={selectOption}
                    value="option3"
                    control={<Radio />}
                    label={
                      <>
                        <TextField
                          // options : [{option1:''},{option2:""},{option3:""}]
                          value={details.option3.data}
                          onChange={(event) => getDetailsByOnChangeEvent(event, "option3")}
                          placeholder="option3"
                          name="data"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment  position="end">
                                <IconButton onClick={()=>(deleteValue(2))}   edge="end">
                                  <DeleteIcon  />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="mb-5 mt-5">
              <div className="flex justify-center">
                <Button
                  onClick={addQuestion}
                  className="rounded-full hover:bg-black border-solid border-2 pl-12 pr-12 "
                >
                  Add More
                </Button>
              </div>
              <div className="flex justify-end mr-16 ">
                <Button className="rounded-full border-solid border-2  hover:bg-black text-md pl-12 pr-12 ">
                  Save{" "}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
