import { createClient } from "redis";
const client = createClient();

async function handleWorker() {
  await client.connect();
  console.log("Connected to Redis");
  while (1) {
    const response = await client.rPop("submissions");
    response && console.log(response);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // console.log("Processed User Submission")
  }
}

handleWorker();
