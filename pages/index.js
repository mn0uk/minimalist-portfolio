import Head from 'next/head';
import Link from 'next/link';
import { getProjects } from '../lib/github';
import ThemeToggle from '../components/ThemeToggle';

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
        </header>

        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.id} className="project-card">
              <div className="project-header">
                <h2 className="project-title">
                  <Link href={`/posts/${project.slug}`}>
                    {project.title}
                  </Link>
                </h2>
                <div className="project-meta">
                  {project.language && (
                    <span className="language">{project.language}</span>
                  )}
                  {project.stars > 0 && (
                    <span className="stars">★ {project.stars}</span>
                  )}
                </div>
              </div>
              
              <p className="project-description">
                {project.shortDescription}
              </p>

              {project.topics.length > 0 && (
                <div className="topics">
                  {project.topics.slice(0, 3).map((topic) => (
                    <span key={topic} className="topic">
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              <div className="project-links">
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="link-github"
                >
                  View Code
                </a>
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="link-live"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

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
