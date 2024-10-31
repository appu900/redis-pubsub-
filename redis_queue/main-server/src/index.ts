import express from "express";
import { createClient } from "redis";

const app = express();
const port = 3000;
const client = createClient();

async function startServer() {
  try {
    // -- connect to redis
    await client.connect();
    console.log("Connected to Redis");

    // -- middlewares
    app.use(express.json());

    // -- endpoint to submit code
    app.post("/submit", async (req, res) => {
      console.log(req.body);
      const { problemId, userId, code } = req.body;
      await client.lPush("submissions", JSON.stringify({ problemId, userId, code }));
      res.send("event sent sucessfully");
    });

    // -- start server
    app.listen(port, function handle() {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}



startServer();
