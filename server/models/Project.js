import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    tagline: { type: String, default: '' },
    description: { type: String, default: '' },
    tech: { type: [String], default: [] },
    github: { type: String, default: '' },
    live: { type: String, default: '' },
    videoUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
