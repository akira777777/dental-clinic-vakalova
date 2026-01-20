import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vakalova-dental.cz';
  
  // Static pages
  const staticPages = [
    '',  // Homepage
    '/booking',
  ];
  
  // Service pages
  const servicePages = [
    '/services/lechenie-kariesa',
    '/services/otbelivanie',
    '/services/implantatsiya',
    '/services/chistka',
    '/services/protezirovanie',
    '/services/hirurgiya',
    '/services/detskaya',
    '/services/parodontologiya',
  ];
  
  // Generate sitemap entries
  const routes = [
    ...staticPages.map(route => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1.0 : 0.8,
    })),
    ...servicePages.map(route => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
  
  return routes;
}
