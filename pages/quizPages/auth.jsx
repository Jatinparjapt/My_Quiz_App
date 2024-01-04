// import { useState } from "react";
// import { TextField,FormControlLabel ,InputAdornment} from "@mui/material";
// import {IconButton,DeleteIcon} from "@mui/material"
// export default function secondCreate() {
//     const optionArrayValue = [0,1,2]
//     const [details, setDetails] = useState({
//     questionType: "mcq",
//     category: "gernel",
//     description: "disc",
//     question: "what",
//     optionsMcq: [
//       { option: "", checked: false },
//       { option: "", checked: false },
//       { option: "", checked: false },
//     ],
//   });
//   const selectOption = (index)=>{ 
//     if(index == 1 ){
//       setDetails((preitems)=>({
//         ...preitems,
//       optionsMcq: [
//       { ...preitems.optionsMcq[0], checked: true },
//       { ...preitems.optionsMcq[1], checked: false },
//       { ...preitems.optionsMcq[2], checked: false },
//     ],
//       }))
//     }
//     else if (index == 2 ){
//       setDetails((preitems)=>({
//         ...preitems,
//       optionsMcq: [
//       { ...preitems.optionsMcq[0], checked: false},
//       { ...preitems.optionsMcq[1], checked: true },
//       { ...preitems.optionsMcq[2], checked: false },
//     ],
//       }))
//     }
//     else {
//       setDetails((preitems)=>({
//         ...preitems,
//       optionsMcq: [
//       { ...preitems.optionsMcq[0], checked: false},
//       { ...preitems.optionsMcq[1], checked: false },
//       { ...preitems.optionsMcq[2], checked: true },
//     ],
//       }))
//     }
//   }
//   const getDetailsByOnChangeEvent = (event) => {
//     const { value} = event.target
//     setDetails((previous) => ({
//       ...previous,
//       optionsMcq: previous.optionsMcq.map((item, i) => {
//         if (i === index) {
//           return { ...item, option: value };
//         } else {
//           return item;
//         }
//       }),
//     }));
//   };
//   return(
//     <>
//    { optionArrayValue.map((items ,index)=>(
//   <FormControlLabel key={index}
//   className="text-xl"
//   value={`option${index+1}`}
//   label={
//     <>
//       <TextField
//         // options : [{option1:''},{option2:""},{option3:""}]
//         value={details.optionsMcq[index].option[index+1]}
//         onChange={getDetailsByOnChangeEvent}
//         placeholder={`option${index}`}
//         name={`option`}
//       />
//     </>
//   }
// />
//    ))}
  
//     </>
//   )
// }
