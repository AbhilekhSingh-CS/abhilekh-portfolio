// Storage layer for projects. Primary storage is MongoDB (through Mongoose),
// but if Mongo is not reachable when the server starts, we quietly fall back
// to a plain JSON file (data/projects.json) so the site still works anywhere.
// The route handlers only ever talk to this file, so they don't care which
// backend is actually in use.
import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import Project from './models/Project.js';
import seedProjects from './data/seedProjects.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFile = path.join(__dirname, 'data', 'projects.json');

let useMongo = false;

export async function init() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/abhilekh-portfolio';
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 2500 });
    useMongo = true;
    if ((await Project.countDocuments()) === 0) {
      await Project.insertMany(seedProjects);
      console.log('Seeded MongoDB with starter projects');
    }
    console.log('Connected to MongoDB');
  } catch {
    useMongo = false;
    try {
      await fs.access(dataFile);
    } catch {
      const seeded = seedProjects.map((p) => ({ _id: crypto.randomUUID(), ...p }));
      await fs.writeFile(dataFile, JSON.stringify(seeded, null, 2));
    }
    console.log('MongoDB not reachable — storing projects in data/projects.json instead');
  }
}

async function readAll() {
  return JSON.parse(await fs.readFile(dataFile, 'utf8'));
}

async function writeAll(projects) {
  await fs.writeFile(dataFile, JSON.stringify(projects, null, 2));
}

export async function list() {
  if (useMongo) return Project.find().sort({ createdAt: 1 });
  return readAll();
}

export async function get(id) {
  if (useMongo) {
    try {
      return await Project.findById(id);
    } catch {
      return null; // id is not a valid ObjectId
    }
  }
  const projects = await readAll();
  return projects.find((p) => p._id === id) || null;
}

export async function create(data) {
  if (useMongo) return Project.create(data);
  const projects = await readAll();
  const project = { _id: crypto.randomUUID(), videoUrl: '', ...data };
  projects.push(project);
  await writeAll(projects);
  return project;
}

export async function update(id, data) {
  if (useMongo) {
    try {
      return await Project.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    } catch {
      return null;
    }
  }
  const projects = await readAll();
  const index = projects.findIndex((p) => p._id === id);
  if (index === -1) return null;
  projects[index] = { ...projects[index], ...data, _id: id };
  await writeAll(projects);
  return projects[index];
}

export async function remove(id) {
  if (useMongo) {
    try {
      return await Project.findByIdAndDelete(id);
    } catch {
      return null;
    }
  }
  const projects = await readAll();
  const index = projects.findIndex((p) => p._id === id);
  if (index === -1) return null;
  const [removed] = projects.splice(index, 1);
  await writeAll(projects);
  return removed;
}
