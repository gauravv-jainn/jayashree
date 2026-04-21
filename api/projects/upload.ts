import { put, list } from '@vercel/blob';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';

const DATA_FILE = join(process.cwd(), '/tmp/projects.json');

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  imageUrl: string;
  impact: string;
}

function getProjects(): Project[] {
  try {
    if (existsSync(DATA_FILE)) {
      const data = readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading projects:', error);
  }
  return [];
}

function saveProjects(projects: Project[]) {
  try {
    writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2));
  } catch (error) {
    console.error('Error saving projects:', error);
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = req.body; // Formidable would parse this, but for now we'll assume JSON

    // Extract form data
    const { title, description, category, date, impact, file } = form;

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Upload file to Vercel Blob
    const blobName = `projects/${Date.now()}-${file.originalname}`;
    const blob = await put(blobName, file.buffer, { access: 'public' });

    // Create project entry
    const project: Project = {
      id: Date.now().toString(),
      title,
      description,
      category,
      date,
      imageUrl: blob.url,
      impact,
    };

    // Save to local data file
    const projects = getProjects();
    projects.unshift(project); // Add to beginning so newest appears first
    saveProjects(projects);

    return res.status(200).json({ success: true, project });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Upload failed' });
  }
}
