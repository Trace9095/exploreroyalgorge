import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Explore Royal Gorge',
    short_name: 'Explore RG',
    description: 'Royal Gorge adventure directory — Canon City, Colorado',
    start_url: '/',
    display: 'standalone',
    background_color: '#0D1117',
    theme_color: '#D4A853',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
