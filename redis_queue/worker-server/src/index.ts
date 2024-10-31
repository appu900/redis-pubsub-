import { createClient } from "redis";
const client = createClient();

async function handleWorker() {
  await client.connect();
  console.log("Connected to Redis");
  while (1) {
    const response = await client.brPop("submissions", 0);
    response && console.log(response);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // console.log("Processed User Submission")
  }
}

handleWorker();
