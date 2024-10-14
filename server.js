import express from "express";

import "dotenv/config";
const app = express();
const PORT = process.env.PORT || 3004;

app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res)=>{
  res.send("API Working")
})



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});



import {createuser, uploadfileserver , singlefile, getfile, deletefile} from  "./Controllers/index.js"



app.post("/create-user", createuser );
app.post("/upload-file/:email", singlefile, uploadfileserver );
app.get("/get-file/:email", getfile );
app.delete("/delete-file/:email/:id", deletefile);






app.listen(PORT, () => {
  console.log(`Server is running successfully on port ${PORT}`);
});
