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

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract member data from request
    const { name, role, bio, email, linkedIn, photoUrl } = req.body;

    if (!name || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const member: Member = {
      id: Date.now().toString(),
      name,
      role,
      bio,
      photoUrl: photoUrl || '/default-avatar.png', // Use default if no photo
      email,
      linkedIn,
    };

    const members = getMembers();
    members.push(member);
    saveMembers(members);

    return res.status(200).json({ success: true, member });
  } catch (error) {
    console.error('Error uploading member:', error);
    return res.status(500).json({ error: 'Failed to upload member' });
  }
}
