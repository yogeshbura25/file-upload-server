import { Router } from "express";

import {createuser, uploadfileserver , singlefile, getfile, deletefile} from  "../Controllers/index.js"

const router = Router();

router.post("/create-user", createuser );
router.post("/upload-file/:email", singlefile, uploadfileserver );
router.get("/get-file/:email", getfile );
router.delete("/delete-file/:email/:id", deletefile);



// router.get('/', (req, res) => {
//     const name = "Yogesh";
//     res.status(200).send(`User ${name} created successfully!`);
// });


export default router;