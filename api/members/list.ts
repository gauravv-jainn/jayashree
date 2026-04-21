import { join } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const dataDir = join(process.cwd(), 'data');

interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  email?: string;
  linkedIn?: string;
}

function getMembers(): Member[] {
  try {
    const filePath = join(dataDir, 'members.json');
    if (existsSync(filePath)) {
      const data = readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading members:', error);
  }
  return [];
}

function saveMembers(members: Member[]) {
  try {
    const filePath = join(dataDir, 'members.json');
    writeFileSync(filePath, JSON.stringify(members, null, 2));
  } catch (error) {
    console.error('Error saving members:', error);
  }
}

export default function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      const members = getMembers();
      return res.status(200).json(members);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch members' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, role, bio, photoUrl, email, linkedIn } = req.body;

      if (!name || !role) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const member: Member = {
        id: Date.now().toString(),
        name,
        role,
        bio,
        photoUrl,
        email,
        linkedIn,
      };

      const members = getMembers();
      members.push(member);
      saveMembers(members);

      return res.status(200).json({ success: true, member });
    } catch (error) {
      console.error('Error saving member:', error);
      return res.status(500).json({ error: 'Failed to save member' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
