import express from 'express';
import cors from 'cors'; // Import the cors package
import multer from 'multer'; // Import multer for handling file uploads
import fs from 'fs'; // To read the uploaded files (for example, JSON files)
import path from 'path'; // Import path for resolving file paths
import dotenv from 'dotenv'; // Import dotenv for environment variables
import { v4 as uuidv4 } from 'uuid'; // Ensure to import uuid at the top of the file

const app = express();

dotenv.config(); // Load environment variables from .env file
const PORT = 5000;
let items = [];



let price = 0;
let name = '';
let discount = 0;
let date = '';
let receipt = '';

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Set the upload directory
  },
  filename: function (req, file, cb) {
    const uniqueId = Date.now(); // Use a simple unique ID based on the current timestamp
    const fileName = `bill-${uniqueId}.json`; // Create a unique file name
    cb(null, fileName); // Pass the unique file name to multer
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/json') {
      return cb(new Error('Only JSON files are allowed'), false);
    }
    cb(null, true);
  }
});

// CORS configuration
app.use(cors({
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173', 'http://10.233.61.83:5173'], // Allow both origins
}));

// POST route for file uploads
app.post('/api/uploads', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = path.join('./uploads', req.file.filename);

  try {
    // Read the JSON file using fs
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const jsonItems = JSON.parse(fileContent); // Parse the JSON content into JS object "jsonItems"

    // Process the JSON file and extract items
    const array = jsonItems.body;

    array.forEach((item, index) => {
      if (item.hasOwnProperty('sellLine')) {
        price = item.sellLine.total / 100;
        name = item.sellLine.name;
        if (array[index + 1]?.hasOwnProperty('discountLine')) {
          discount = array[index + 1].discountLine.value / 100;
          price = price - discount;
        }
        items.push({
          name: name,
          price: price.toFixed(2),
        });
      }

      if (item.hasOwnProperty('fiscalFooter')) {
        date = item.fiscalFooter.date;
        const formattedDate = new Date(date).toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }).replace(',', ''); // Format date as dd-mm-yyyy time

        const [day, time] = formattedDate.split(' ');
        date = {
          day: day,
          time: time,
        };

        receipt = {
          date: date,
          items: items,
        };
      }
    });

    res.json(receipt); // Send the processed receipt data as JSON
  } catch (error) {
    console.error('Error loading file:', error);
    res.status(500).send('Error loading file');
  }
});

// GET Route to fetch receipt data
app.get('/', (req, res) => {
  res.json({
    day: date,
    items: items,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Express app listening at http://localhost:${PORT}`);
});
