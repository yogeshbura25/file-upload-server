import multer from "multer";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import path from "path";

import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "FileContainer/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
    // const originalFileName = file.originalname.toLowerCase(); // Use the original file name
    // cb(null, originalFileName);
  },
});

const uploadFile = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    const allowedFileTypes = /jpeg|jpg|png|pdf|svg|docx/;
    const fileExtension = allowedFileTypes.test(
      file.originalname.toLowerCase()
    );
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (fileExtension && mimetype) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid File Type. Only JPEG, PNG, PDF, SVG, and DOCX files are allowed."
        )
      );
    }
  },
});

export const singlefile = uploadFile.single("file");

export const uploadfileserver = async (req, res) => {
  const { email } = req.params;

  try {
    if (!req.file) {
      return res.status(400).send({ error: "No file uploaded" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const filePath = req.file.path;

    const fileUpload = await prisma.userFile.create({
      data: {
        fileName: req.file.originalname,
        filePath: filePath,
        userId: user.id,
      },
    });

    res.status(201).send({
      message: "File uploaded successfully",
      user,
      fileUpload,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const createuser = async (req, res) => {
  const { email, name } = req.body;

  try {
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
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const getfile = async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).send({ error: "Email is required" });
  }

  try {
    const userRecord = await prisma.user.findUnique({
      where: { email },
      include: { userfile: true },
    });

    if (!userRecord) {
      return res.status(404).send({ error: "User not found" });
    }
    //   const fileSizeInMB = (req.file.size / (1024 * 1024)).toFixed(2);

    res.status(200).send({
      user: userRecord,
      // files: userRecord.files,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const deletefile = async (req, res) => {
  const { email, id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        userfile: true,
      },
    });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const fileToDelete = user.userfile.find((file) => file.id === parseInt(id));

    if (!fileToDelete) {
      return res.status(404).send({ error: "File not found for the user" });
    }

    const filePath = fileToDelete.filePath;

    const fullPath = path.resolve(filePath);
    fs.unlink(fullPath, async (err) => {
      if (err) {
        return res.status(500).send({ error: "Error deleting the file" });
      }

      await prisma.userFile.delete({
        where: { id: fileToDelete.id },
      });

      res.status(200).send({
        message: "File deleted successfully",
      });
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
