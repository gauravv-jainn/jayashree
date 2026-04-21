import { useEffect } from 'react';

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
    // Return cleanup function to reset title if needed
    return () => {
      document.title = 'Jayashree Foundation';
    };
  }, [title]);
}
