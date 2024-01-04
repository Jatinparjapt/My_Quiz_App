import QuestionModel from "./mongoDb/schme"
import connection from "./mongoDb/connection";
export default async function handler(req, res) {
  try {
    await connection.connect()
    const users = await QuestionModel.find()
      res.status(200).json({ data: users });   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal error occurred" });
  }
}
