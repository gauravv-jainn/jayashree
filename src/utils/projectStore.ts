// Local storage utility for managing projects in development
// On production with Vercel, this should use a database

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  imageUrl: string;
  impact: string;
}

const PROJECTS_KEY = 'jayashree_projects';

export function getProjects(): Project[] {
  try {
    const data = localStorage.getItem(PROJECTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
}

export function saveProject(project: Omit<Project, 'id'>): Project {
  const newProject: Project = {
    ...project,
    id: Date.now().toString(),
  };

  try {
    const projects = getProjects();
    projects.unshift(newProject); // Add to beginning (newest first)
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    return newProject;
  } catch (error) {
    console.error('Error saving project:', error);
    throw error;
  }
}

export function deleteProject(id: string): boolean {
  try {
    const projects = getProjects().filter(p => p.id !== id);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
}

export function updateProject(id: string, project: Omit<Project, 'id'>): Project | null {
  try {
    const projects = getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updatedProject: Project = { ...project, id };
    projects[index] = updatedProject;
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    return updatedProject;
  } catch (error) {
    console.error('Error updating project:', error);
    return null;
  }
}
