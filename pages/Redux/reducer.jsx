import axios from "axios";
import React from "react";
// reducer
import React from 'react'

const reducer = () => {
  return (
    <div>.</div>
  )
}

export default reducer
const initialState = {
  questionType: "",
  category: "",
  description: "",
  question: "",
  option1: {data : "", checked: false },
  option2: { data: "", checked: false },
  option3: { data: "", checked: false },
};
export async function reducer(state = initialState, action) {
  let newData = action.payload;
  // console.log(newData ,"reducer data")
  try {
    if (action.type === "addToDatabase") {
      const sendData = await axios.post("/api/data", {
        questionType: newData.questionType,
        category: newData.category,
        description: newData.description,
        question: newData.question,
        option1: { data: newData.option1.data, checked: newData.option1.checked },
        option2: { data: newData.option2.data, checked: newData.option2.checked },
        option3: { data: newData.option3.data, checked: newData.option3.checked },
      });
  
      return { ...state, question: sendData };
    }
  } catch (error) {
    console.log(error)
  }
 
  return {
    state,
  };
}
const score = 0;
export function scoreReducer(state = score, action) {
  if (action.type == "updateScore") {
    let myScore = action.payload;
    sessionStorage.setItem("score", myScore);
    return {
      ...state,
      score: myScore,
    };
  }
  return {
    state,
  };
}
