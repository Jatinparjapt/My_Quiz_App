import QuestionModel from "./mongoDb/schme"
import connection from "./mongoDb/connection";
export default async function handler(req, res) {
  try {
    await connection.connect
    if(req.body){
        await QuestionModel.findOneAndDelete({_id:req.body})
        res.status(200).json({ data: "One Question Deleted" });   
    }else{
        res.status(404).json({ error: "Data not found to delete" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal error occurred" });
  }
}
