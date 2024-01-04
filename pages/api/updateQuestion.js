import QuestionModel from "./schme";
import connection from "./connection";
export default async function handler(req, res) {
  try {
    await connection.connect;
    if (req.method == "PUT") {
      if (!req.body.data.question && !req.body.data.id) {
        res.status(404).json({ error: "Data not found to update" });
      } else {
        console.log(req.body.data.question,req.body.data.id, "database");
        const data = await QuestionModel.findOneAndUpdate(
          { _id: req.body.data.id },
          { question: req.body.data.question }
        );
        res.status(201).json({ data: "One Question update" });
      }
    } else {
      res.status(404).json({ error: "Data not found to update" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal error occurred" });
  }
}
