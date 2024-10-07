import express from "express";

import routes from "./routes/index.js";
import "dotenv/config";
const app = express();
const PORT = process.env.PORT || 3004;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
  res.send("API Working")
})

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running successfully on port ${PORT}`);
});
