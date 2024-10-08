import { Router } from "express";

import {createuser, uploadfileserver , singlefile, getfile, deletefile} from  "../Controllers/index.js"

const router = Router();

router.post("/create-user", createuser );
router.post("/upload-file/:email", singlefile, uploadfileserver );
router.get("/get-file/:email", getfile );
router.delete("/delete-file/:email/:id", deletefile);




export default router;