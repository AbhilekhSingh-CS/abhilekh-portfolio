import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as store from '../store.js';
import requireAdmin from '../middleware/requireAdmin.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, '..', 'uploads');

const router = Router();

// Walkthrough videos are stored on disk as <projectId>-<timestamp>.<ext>
const upload = multer({
  storage: multer.diskStorage({
    destination: uploadsDir,
    filename: (req, file, cb) => {
      cb(null, `${req.params.id}-${Date.now()}${path.extname(file.originalname)}`);
    },
  }),
  limits: { fileSize: 200 * 1024 * 1024 }, // 200 MB per video
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) cb(null, true);
    else cb(new Error('Only video files are allowed'));
  },
});

router.get('/', async (req, res) => {
  res.json(await store.list());
});

router.get('/:id', async (req, res) => {
  const project = await store.get(req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
});

router.post('/', requireAdmin, async (req, res) => {
  const project = await store.create(req.body);
  res.status(201).json(project);
});

router.put('/:id', requireAdmin, async (req, res) => {
  const project = await store.update(req.params.id, req.body);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
});

router.delete('/:id', requireAdmin, async (req, res) => {
  const project = await store.remove(req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json({ ok: true });
});

// Upload (or replace) the walkthrough video for one project
router.post('/:id/video', requireAdmin, upload.single('video'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No video file received' });

  const existing = await store.get(req.params.id);
  if (!existing) {
    fs.unlink(req.file.path, () => {});
    return res.status(404).json({ error: 'Project not found' });
  }

  // Replacing a video? Remove the old file so uploads don't pile up on disk.
  if (existing.videoUrl) {
    const oldPath = path.join(uploadsDir, path.basename(existing.videoUrl));
    fs.unlink(oldPath, () => {});
  }

  const project = await store.update(req.params.id, {
    videoUrl: `/uploads/${req.file.filename}`,
  });
  res.json(project);
});

export default router;
