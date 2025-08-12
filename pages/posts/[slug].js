import Head from 'next/head';
import Link from 'next/link';
import { getProjectBySlug, getAllProjectSlugs } from '../../lib/github';
import ThemeToggle from '../../components/ThemeToggle';

export default function ProjectPost({ project }) {
  if (!project) {
    return (
      <div className="container">
        <div className="error-state">
          <h1>Project Not Found</h1>
          <p>The requested project could not be found.</p>
          <Link href="/">← Back to Projects</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{project.title} | Projects Portfolio</title>
        <meta name="description" content={project.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="container">
        <div className="theme-toggle-wrapper">
          <ThemeToggle />
        </div>
        
        <nav className="breadcrumb">
          <Link href="/">← Back to Projects</Link>
        </nav>

        <article className="post">
          <header className="post-header">
            <h1 className="post-title">{project.title}</h1>
            
            <div className="post-meta">
              <div className="meta-row">
                {project.language && (
                  <span className="language">{project.language}</span>
                )}
                {project.stars > 0 && (
                  <span className="stars">★ {project.stars}</span>
                )}
                <time className="date">
                  Updated {new Date(project.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              
              {project.topics.length > 0 && (
                <div className="topics">
                  {project.topics.map((topic) => (
                    <span key={topic} className="topic">
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="post-links">
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="link-github"
              >
                View on GitHub
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
          </header>

          <div className="post-content">
            {project.readme ? (
              <div 
                className="markdown-content"
                dangerouslySetInnerHTML={{ __html: project.readme }}
              />
            ) : (
              <div className="no-readme">
                <h2>About this project</h2>
                <p>{project.description}</p>
                <p>
                  This project doesn't have a detailed README yet. 
                  Check out the source code on GitHub to learn more about how it works.
                </p>
              </div>
            )}
          </div>
        </article>

        <footer className="post-footer">
          <Link href="/" className="back-link">
            ← View All Projects
          </Link>
        </footer>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  // Replace with your GitHub username
  const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'your-username';
  
  try {
    const paths = await getAllProjectSlugs(GITHUB_USERNAME);
    
    return {
      paths,
      fallback: 'blocking', // Enable ISR for new projects
    };
  } catch (error) {
    console.error('Error generating static paths:', error);
    
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

export async function getStaticProps({ params }) {
  // Replace with your GitHub username
  const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'your-username';
  
  try {
    const project = await getProjectBySlug(GITHUB_USERNAME, params.slug);
    
    if (!project) {
      return {
        notFound: true,
      };
    }
    
    return {
      props: {
        project,
      },
      // Revalidate every 6 hours
      revalidate: 21600,
    };
  } catch (error) {
    console.error('Error fetching project:', error);
    
    return {
      notFound: true,
    };
  }
}
