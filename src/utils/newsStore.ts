/**
 * News Store - Manages news articles/posts
 * Supports drafts and published articles
 */

export interface NewsArticle {
  id: string;
  title: string;
  description: string; // Short excerpt
  content: string; // Full article content
  imageUrl: string;
  category: 'update' | 'event' | 'achievement' | 'announcement';
  author: string; // admin email
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  isPublished: boolean;
  tags: string[];
}

const NEWS_KEY = 'jayashree_news';

/**
 * Get all news articles (admin view - includes drafts)
 */
export function getAllNews(): NewsArticle[] {
  try {
    const stored = localStorage.getItem(NEWS_KEY);
    return stored ? JSON.parse(stored) : getDefaultNews();
  } catch (error) {
    console.error('Error loading news:', error);
    return getDefaultNews();
  }
}

/**
 * Get published news articles only (public view)
 */
export function getPublishedNews(): NewsArticle[] {
  return getAllNews()
    .filter(article => article.isPublished && article.publishedAt)
    .sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA;
    });
}

/**
 * Get draft articles
 */
export function getDraftNews(): NewsArticle[] {
  return getAllNews().filter(article => !article.isPublished);
}

/**
 * Get news by category
 */
export function getNewsByCategory(category: NewsArticle['category']): NewsArticle[] {
  return getPublishedNews().filter(article => article.category === category);
}

/**
 * Create new article
 */
export function createNewsArticle(
  data: Omit<NewsArticle, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt'>
): NewsArticle {
  const now = new Date().toISOString();
  const article: NewsArticle = {
    ...data,
    id: Date.now().toString(),
    createdAt: now,
    updatedAt: now,
    publishedAt: data.isPublished ? now : null,
  };

  const allNews = getAllNews();
  allNews.push(article);
  localStorage.setItem(NEWS_KEY, JSON.stringify(allNews));
  return article;
}

/**
 * Update article
 */
export function updateNewsArticle(id: string, updates: Partial<Omit<NewsArticle, 'id' | 'createdAt'>>): NewsArticle | null {
  const allNews = getAllNews();
  const index = allNews.findIndex(article => article.id === id);
  if (index === -1) return null;

  const oldArticle = allNews[index];
  const now = new Date().toISOString();

  // If publishing an unpublished article
  const publishedAt =
    updates.isPublished && !oldArticle.isPublished
      ? now
      : oldArticle.publishedAt;

  allNews[index] = {
    ...oldArticle,
    ...updates,
    updatedAt: now,
    publishedAt,
  };

  localStorage.setItem(NEWS_KEY, JSON.stringify(allNews));
  return allNews[index];
}

/**
 * Delete article
 */
export function deleteNewsArticle(id: string): boolean {
  const allNews = getAllNews();
  const filtered = allNews.filter(article => article.id !== id);
  if (filtered.length === allNews.length) return false;

  localStorage.setItem(NEWS_KEY, JSON.stringify(filtered));
  return true;
}

/**
 * Publish article
 */
export function publishNewsArticle(id: string): NewsArticle | null {
  return updateNewsArticle(id, {
    isPublished: true,
    publishedAt: new Date().toISOString(),
  });
}

/**
 * Unpublish article (make it draft)
 */
export function unpublishNewsArticle(id: string): NewsArticle | null {
  return updateNewsArticle(id, {
    isPublished: false,
  });
}

/**
 * Search news articles
 */
export function searchNews(query: string): NewsArticle[] {
  const lowerQuery = query.toLowerCase();
  return getPublishedNews().filter(article =>
    article.title.toLowerCase().includes(lowerQuery) ||
    article.description.toLowerCase().includes(lowerQuery) ||
    article.content.toLowerCase().includes(lowerQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get recent articles (last N published)
 */
export function getRecentNews(limit: number = 3): NewsArticle[] {
  return getPublishedNews().slice(0, limit);
}

/**
 * Get default news articles
 */
function getDefaultNews(): NewsArticle[] {
  const now = new Date().toISOString();
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  return [
    {
      id: '1',
      title: 'Jayashree Foundation Launches New Initiative',
      description: 'We are proud to announce our latest community development program',
      content: 'We are proud to announce the launch of our latest community development program aimed at improving education and healthcare access in rural areas. This initiative will serve over 1000 families.',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHl8ZW58MXx8fHwxNzc0NTUxMjkwfDA&ixlib=rb-4.0.3&q=80&w=1080',
      category: 'announcement',
      author: 'admin@foundation.org',
      createdAt: yesterday,
      updatedAt: yesterday,
      publishedAt: yesterday,
      isPublished: true,
      tags: ['initiative', 'community', 'development'],
    },
    {
      id: '2',
      title: 'Medical Camp Success',
      description: 'Over 500 people received free medical checkups',
      content: 'Our recent medical camp was a huge success with over 500 people from the community receiving free medical checkups, consultations, and prescribed medicines.',
      imageUrl: 'https://images.unsplash.com/photo-1631217314830-4ec5a9fdf94c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsIGhlYWx0aHx8ZW58MXx8fHwxNzc0NTUxMjkwfDA&ixlib=rb-4.0.3&q=80&w=1080',
      category: 'achievement',
      author: 'admin@foundation.org',
      createdAt: yesterday,
      updatedAt: yesterday,
      publishedAt: yesterday,
      isPublished: true,
      tags: ['healthcare', 'medical', 'achievement'],
    },
  ];
}
