// Local storage utility for managing members in development
// On production with Vercel, this should use a database

interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  email?: string;
  linkedIn?: string;
}

const MEMBERS_KEY = 'jayashree_members';

export function getMembers(): Member[] {
  try {
    const data = localStorage.getItem(MEMBERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading members:', error);
    return [];
  }
}

export function saveMember(member: Omit<Member, 'id'>): Member {
  const newMember: Member = {
    ...member,
    id: Date.now().toString(),
  };

  try {
    const members = getMembers();
    members.push(newMember);
    localStorage.setItem(MEMBERS_KEY, JSON.stringify(members));
    return newMember;
  } catch (error) {
    console.error('Error saving member:', error);
    throw error;
  }
}

export function deleteMember(id: string): boolean {
  try {
    const members = getMembers().filter(m => m.id !== id);
    localStorage.setItem(MEMBERS_KEY, JSON.stringify(members));
    return true;
  } catch (error) {
    console.error('Error deleting member:', error);
    return false;
  }
}

export function updateMember(id: string, member: Omit<Member, 'id'>): Member | null {
  try {
    const members = getMembers();
    const index = members.findIndex(m => m.id === id);
    if (index === -1) return null;

    const updatedMember: Member = { ...member, id };
    members[index] = updatedMember;
    localStorage.setItem(MEMBERS_KEY, JSON.stringify(members));
    return updatedMember;
  } catch (error) {
    console.error('Error updating member:', error);
    return null;
  }
}
