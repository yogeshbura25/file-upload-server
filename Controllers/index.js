// import multer from "multer";
import { PrismaClient } from "@prisma/client";
// import Joi from "joi";
const prisma = new PrismaClient();

// import path from "path";

// import fs from "fs";


// const fileSchema = Joi.object({
//   mimetype: Joi.string()
//     .valid(
//       "image/jpeg",
//       "image/jpg",
//       "image/png",
//        "application/pdf",
//       "image/svg+xml",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//     )
//     .required()
//     .messages({
//       "any.only":
//         "Invalid file format. Only JPEG, PNG, PDF, SVG, and DOCX files are allowed.",
//     }),
//   size: Joi.number()
//     .max(5 * 1024 * 1024)
//     .required()
//     .messages({
//       "number.max": "File size exceeds the limit of 5MB.",
//     }),
// });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "FileContainer/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     const extension = path.extname(file.originalname).toLowerCase();
//     cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
//   },
// });

// const uploadFile = multer({
//   storage: storage,
// });

// export const singlefile = uploadFile.single("file");

export const createuser = async (req, res) => {
  const { email, name } = req.body;


    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = await prisma.user.create({
      data: { name, email },
    });

    res.status(201).json({
      data: newUser,
      message: "User created successfully",
    });
 
};

// export const uploadfileserver = async (req, res) => {
//   const { email } = req.params;


//     if (!req.file) {
//       return res.status(400).send({ error: "No file uploaded" });
//     }

//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return res.status(404).send({ error: "User not found" });
//     }

//     const { error } = fileSchema.validate({
//       mimetype: req.file.mimetype,
//       size: req.file.size || 0, 
//     });

//     if (error) {
//       return res.status(400).send({ error: error.details[0].message });
//     }


//     const filePath = req.file.path;
//     const fileSizeInMB = (req.file.size / (1024 * 1024)).toFixed(2);
//     const fileUpload = await prisma.userFile.create({
//       data: {
//         fileName: req.file.originalname,
//         filePath: filePath,
//         userId: user.id,
//       },
//     });

//     res.status(201).send({
//       message: "File uploaded successfully",
//       fileSizeInMB: fileSizeInMB,
//       user,
//       fileUpload,
//     });
  
// };

// export const getfile = async (req, res) => {
//   const { email } = req.params;

//   if (!email) {
//     return res.status(400).send({ error: "Email is required" });
//   }

//   try {
//     const userRecord = await prisma.user.findUnique({
//       where: { email },
//       include: { userfile: true },
//     });

//     if (!userRecord) {
//       return res.status(404).send({ error: "User not found" });
//     }
//     //   const fileSizeInMB = (req.file.size / (1024 * 1024)).toFixed(2);

//     res.status(200).send({
//       user: userRecord,
//       // files: userRecord.files,
//     });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// };

// export const deletefile = async (req, res) => {
//   const { email, id } = req.params;

//   try {
//     const user = await prisma.user.findUnique({
//       where: { email },
//       include: {
//         userfile: true,
//       },
//     });

//     if (!user) {
//       return res.status(404).send({ error: "User not found" });
//     }

//     const fileToDelete = user.userfile.find((file) => file.id === parseInt(id));

//     if (!fileToDelete) {
//       return res.status(404).send({ error: "File not found for the user" });
//     }

//     const filePath = fileToDelete.filePath;

//     const fullPath = path.resolve(filePath);
//     fs.unlink(fullPath, async (err) => {
//       if (err) {
//         return res.status(500).send({ error: "Error deleting the file" });
//       }

//       await prisma.userFile.delete({
//         where: { id: fileToDelete.id },
//       });

//       res.status(200).send({
//         message: "File deleted successfully",
//       });
//     });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// };
