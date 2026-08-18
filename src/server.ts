import { app } from "./app.js";

app.listen({ port: 3333 }, () => {
  return console.log('Http Server is Running')
})