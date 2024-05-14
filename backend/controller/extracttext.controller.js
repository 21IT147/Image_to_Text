import Image from '../models/image.model.js';
import { createWorker } from 'tesseract.js';

const extractTextFromImage = async (req, res, next) => {
  const imageId = req.body.imageId;

  // Assuming imageId is provided from the frontend
  if (!imageId) {
    return res.status(400).json({ message: "Image ID not provided" });
  }

  try {
    // Find the image by ID
    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Perform text extraction using Tesseract.js
    const worker = await createWorker();

    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    const { data: { text, render } } = await worker.recognize(image.url);
    await worker.terminate();

    // Create the text file
    const imageName = image.originalname.split('.')[0];
    const textFilePath = path.join('public', 'temp', `${imageName}.txt`);
    const textToWrite = render?.text || text;
    fs.writeFileSync(textFilePath, textToWrite);

    // Update the image object with the extracted text
    image.extractedText = text;
    await image.save();

    res.status(200).json({ message: "Text extracted and saved successfully", extractedText: text, filePath: textFilePath });
  } catch (error) {
    console.error("Error extracting text:", error);
    res.status(500).json({ message: "Failed to extract text from image" });
  }
};

export default extractTextFromImage;