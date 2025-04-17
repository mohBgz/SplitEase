import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { hashFile } from './utils.js';

dotenv.config();

const app = express();
const PORT = 5000;

// Variables to store receipt data
let items = [];
let price = 0;
let name = '';
let discount = 0;
let date = '';
let receipt = '';

// Multer memory storage to hold the file's buffer in memory
const storage = multer.memoryStorage();

// Initialize multer with the storage and file filter settings
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/json') {
      return cb(new Error('Only JSON files are allowed'), false);
    }
    cb(null, true);
  },
});

// CORS configuration
app.use(
  cors({
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
  })
);

// POST route for file uploads
app.post('/api/uploads', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ data: null, error: true, status: 'No file uploaded.' });
    }

    // Generate file hash and save the file
    const fileHash = hashFile(req.file.buffer);
    const fileName = `${fileHash}.json`;
    const filePath = path.join('./uploads', fileName);
    fs.writeFileSync(filePath, req.file.buffer); // Override the file if it exists

    // Read and parse the JSON file
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const jsonItems = JSON.parse(fileContent);
    const array = jsonItems.body;

    // Process the JSON data
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

        const formattedDate = new Date(date)
          .toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
          .replace(',', '');

        const [day, time] = formattedDate.split(' ');
        date = { day: day, time: time };

        receipt = {
          date: date,
          items: items,
        };
      }
    });

    res.json({ data: receipt, error: false, status: 'Bill uploaded successfully' });
  } catch (error) {
    console.error('[UPLOAD ERROR]', error);
    res.status(500).send('Error loading file');
  }
});

// GET Route to fetch receipt data
app.get('/', (req, res) => {
  res.send('Backend is up and running!');
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Express app listening at http://0.0.0.0:${PORT}`);
});
