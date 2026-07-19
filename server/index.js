import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import projectsRouter from './routes/projects.js';
import * as store from './store.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5001;

// Make sure the uploads folder exists before multer tries to write into it
const uploadsDir = path.join(__dirname, 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

app.use(cors());
app.use(express.json());

// Uploaded walkthrough videos are served as plain static files
app.use('/uploads', express.static(uploadsDir));

app.use('/api/projects', projectsRouter);

// Errors thrown by multer (file too big, wrong type) land here
app.use((err, req, res, next) => {
  res.status(400).json({ error: err.message });
});

store.init().then(() => {
  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
});
