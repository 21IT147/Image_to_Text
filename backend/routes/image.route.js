import express from "express";
import imageUpload from "../controller/imageUpload.controller.js";
import multer from "multer";
import extractTextFromImage from "../controller/extracttext.controller.js";
import getUserImages from "../controller/images.controller.js";

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post("/upload", upload.single("image"), imageUpload);

router.post("/extract-text",extractTextFromImage);

router.post("/all",getUserImages);

export default router;
