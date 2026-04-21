// Local storage utility for managing form submissions

interface FormSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  interests: string[];
  involvement: string;
  message: string;
  submittedAt: string;
}

const SUBMISSIONS_KEY = 'jayashree_form_submissions';

export function getSubmissions(): FormSubmission[] {
  try {
    const data = localStorage.getItem(SUBMISSIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading submissions:', error);
    return [];
  }
}

export function saveSubmission(formData: Omit<FormSubmission, 'id' | 'submittedAt'>): FormSubmission {
  const newSubmission: FormSubmission = {
    ...formData,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
  };

  try {
    const submissions = getSubmissions();
    submissions.unshift(newSubmission);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
    return newSubmission;
  } catch (error) {
    console.error('Error saving submission:', error);
    throw error;
  }
}

export function deleteSubmission(id: string): boolean {
  try {
    const submissions = getSubmissions().filter(s => s.id !== id);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
    return true;
  } catch (error) {
    console.error('Error deleting submission:', error);
    return false;
  }
}
