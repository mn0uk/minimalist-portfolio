import Head from 'next/head';
import { getProjects } from '../lib/github';
import ThemeToggle from '../components/ThemeToggle';
import Card from '../components/Card';
import CardGrid from '../components/CardGrid';

export default function Home({ projects }) {
  return (
    <>
      <Head>
        <title>Projects Portfolio</title>
        <meta name="description" content="A minimalist showcase of personal projects" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <div className="theme-toggle-wrapper">
          <ThemeToggle />
        </div>

        <header className="header">
          <h1>Projects</h1>
          <p className="subtitle">
            A collection of things I've built and problems I've solved.
          </p>
          <div className="header-links">
            <a href="/demo" className="demo-link">
              View Card System Demo →
            </a>
          </div>
        </header>

        <CardGrid>
          {projects.map((project) => (
            <Card
              key={project.id}
              title={project.title}
              description={project.shortDescription}
              author="GitHub"
              date={project.updatedAt}
              href={`/posts/${project.slug}`}
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              }
            />
          ))}
        </CardGrid>

        {projects.length === 0 && (
          <div className="empty-state">
            <p>No projects found. Make sure to configure your GitHub username.</p>
          </div>
        )}

        <footer className="footer">
          <p>
            Built with Next.js • Data from GitHub API
          </p>
        </footer>
      </main>
    </>
  );
}

export async function getStaticProps() {
  // Replace with your GitHub username
  const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'your-username';

  try {
    const projects = await getProjects(GITHUB_USERNAME, 10);

    return {
      props: {
        projects,
      },
      // Revalidate every hour (3600 seconds)
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching projects:', error);

    return {
      props: {
        projects: [],
      },
      revalidate: 3600,
    };
  }
}
