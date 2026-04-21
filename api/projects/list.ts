import { join } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const dataDir = join(process.cwd(), 'data');

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  imageUrl: string;
  impact: string;
}

function ensureDataDir() {
  const dir = join(process.cwd(), 'data');
  if (!existsSync(dir)) {
    // Directory would be created by Vercel or manually
  }
}

function getProjects(): Project[] {
  try {
    const filePath = join(dataDir, 'projects.json');
    if (existsSync(filePath)) {
      const data = readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading projects:', error);
  }
  return [];
}

function saveProjects(projects: Project[]) {
  try {
    ensureDataDir();
    const filePath = join(dataDir, 'projects.json');
    writeFileSync(filePath, JSON.stringify(projects, null, 2));
  } catch (error) {
    console.error('Error saving projects:', error);
  }
}

export default function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      const projects = getProjects();
      // Sort by date, newest first
      projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return res.status(200).json(projects);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch projects' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { title, description, category, date, imageUrl, impact } = req.body;

      if (!title || !imageUrl) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const project: Project = {
        id: Date.now().toString(),
        title,
        description,
        category,
        date: date || new Date().toISOString(),
        imageUrl,
        impact,
      };

      const projects = getProjects();
      projects.unshift(project);
      saveProjects(projects);

      return res.status(200).json({ success: true, project });
    } catch (error) {
      console.error('Error saving project:', error);
      return res.status(500).json({ error: 'Failed to save project' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
