import Head from 'next/head';
import Navigation from '../components/Navigation';
import Card from '../components/Card';
import CardGrid from '../components/CardGrid';

export default function Demo() {
  const demoCards = [
    {
      id: 1,
      title: "Building a Modern Card System",
      description: "A comprehensive guide to creating beautiful, accessible card components with proper hover states and responsive design.",
      author: "Sarah Chen",
      date: "2024-01-15",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21,15 16,10 5,21"/>
        </svg>
      )
    },
    {
      id: 2,
      title: "Linear's Design Philosophy",
      description: "Exploring the principles behind Linear's minimalist approach to product design and user experience.",
      author: "Alex Rivera",
      date: "2024-01-12",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      )
    },
    {
      id: 3,
      title: "Advanced CSS Grid Techniques",
      description: "Learn how to create complex layouts using CSS Grid with practical examples and best practices.",
      author: "Maria Santos",
      date: "2024-01-10",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
      )
    },
    {
      id: 4,
      title: "React Performance Optimization",
      description: "Essential techniques for optimizing React applications, from memoization to code splitting.",
      author: "David Kim",
      date: "2024-01-08",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polygon points="10,8 16,12 10,16 10,8"/>
        </svg>
      )
    },
    {
      id: 5,
      title: "TypeScript Best Practices",
      description: "A deep dive into TypeScript patterns that will make your code more maintainable and type-safe.",
      author: "Emma Wilson",
      date: "2024-01-05",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
        </svg>
      )
    },
    {
      id: 6,
      title: "Accessibility in Modern Web Apps",
      description: "How to build inclusive web applications that work for everyone, regardless of their abilities.",
      author: "Jordan Lee",
      date: "2024-01-03",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      )
    }
  ];

  return (
    <>
      <Head>
        <title>Card System Demo | MNouk</title>
        <meta name="description" content="Demo of the modern card component system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

            <Navigation />

      <main className="container">
        <header className="header">
          <h1>Card System Demo</h1>
          <p className="subtitle">
            A showcase of the modern, minimalist card component system inspired by Linear's design.
          </p>
        </header>

        <CardGrid>
          {demoCards.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              description={card.description}
              author={card.author}
              date={card.date}
              icon={card.icon}
              href="#"
            />
          ))}
        </CardGrid>

        <div className="demo-section">
          <h2>Card Variations</h2>
          <p>Different card styles and configurations:</p>

          <div className="card-variations">
                                    <Card
              title="Card with Image"
              description="This card includes a featured image for visual appeal."
              author="Demo User"
              date="2024-01-20"
              image="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop"
              href="#"
            />

            <Card
              title="External Link Card"
              description="This card links to an external website with proper security attributes."
              author="External Source"
              date="2024-01-18"
              href="https://example.com"
              external={true}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15,3 21,3 21,9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              }
            />

            <Card
              title="Simple Card"
              description="A basic card without any special features, just clean content."
              author="Simple Author"
              date="2024-01-16"
            />
          </div>
        </div>

        <footer className="footer">
          <p>
            Built with Next.js • Card System Demo
          </p>
        </footer>
      </main>
    </>
  );
}
