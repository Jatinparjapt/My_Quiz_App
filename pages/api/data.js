import connection from "./connection"
import questionModel from "./schme"
export default async function dataHandler (req ,res ){
    try {
        if(req.method == "POST"){
       await connection.connect()
        const {questionType ,category ,description, question,option1,option2,option3} = req.body
        // console.log(questionType ,category ,description, question,option1,option2,option3, 'serverside')
        if(!questionType|| !category|| !description ||!question || !option1 || !option2 || !option3 ){
            res.status(404).json({ error: 'Please enter all required data' })
        }else{
          
            const newData = new questionModel({
                questionType,
                category,
                description,
                question,
                option1:{data: option1.data,checked : option1.checked},
                option2 :{data: option2.data,checked : option2.checked},
                option3 :{data: option3.data,checked : option3.checked},
                
            })
            await newData.save();
            res.status(201).json({"created" : "Data created successfully"})
            console.log(newData)
        }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json("Failed to create data")
    }

}
 