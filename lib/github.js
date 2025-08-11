import { marked } from 'marked';
import matter from 'gray-matter';

const GITHUB_API_BASE = 'https://api.github.com';

// Configure marked for better security and performance
marked.setOptions({
  breaks: true,
  gfm: true,
  sanitize: false, // We'll handle sanitization if needed
});

/**
 * Fetch repositories from GitHub API
 * @param {string} username - GitHub username
 * @param {number} maxRepos - Maximum number of repositories to fetch
 * @returns {Promise<Array>} Array of repository objects
 */
export async function fetchRepositories(username, maxRepos = 10) {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=${maxRepos}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          // Add GitHub token if available in environment
          ...(process.env.GITHUB_TOKEN && {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`
          })
        }
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    
    // Filter out forks and private repos, sort by stars and recent activity
    return repos
      .filter(repo => !repo.fork && !repo.private)
      .sort((a, b) => {
        // Sort by stars first, then by updated date
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.updated_at) - new Date(a.updated_at);
      })
      .slice(0, maxRepos);
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
}

/**
 * Fetch README content from a repository
 * @param {string} username - GitHub username
 * @param {string} repoName - Repository name
 * @returns {Promise<string|null>} README content or null if not found
 */
export async function fetchReadme(username, repoName) {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${username}/${repoName}/readme`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          ...(process.env.GITHUB_TOKEN && {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`
          })
        }
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    // Decode base64 content
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    return content;
  } catch (error) {
    console.error(`Error fetching README for ${repoName}:`, error);
    return null;
  }
}

/**
 * Process repository data for display
 * @param {Array} repos - Array of repository objects from GitHub API
 * @param {string} username - GitHub username
 * @returns {Promise<Array>} Processed repository data with README content
 */
export async function processRepositories(repos, username) {
  const processedRepos = await Promise.all(
    repos.map(async (repo) => {
      const readme = await fetchReadme(username, repo.name);
      let processedReadme = null;
      let frontMatter = {};

      if (readme) {
        try {
          // Parse frontmatter if it exists
          const { data, content } = matter(readme);
          frontMatter = data;
          processedReadme = marked(content);
        } catch (error) {
          // If frontmatter parsing fails, just convert markdown
          processedReadme = marked(readme);
        }
      }

      return {
        id: repo.id,
        name: repo.name,
        slug: repo.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        title: frontMatter.title || repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        description: frontMatter.description || repo.description || 'No description available',
        shortDescription: (frontMatter.description || repo.description || '').slice(0, 150) + '...',
        githubUrl: repo.html_url,
        liveUrl: frontMatter.live_url || repo.homepage || null,
        stars: repo.stargazers_count,
        language: repo.language,
        topics: repo.topics || [],
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        readme: processedReadme,
        frontMatter
      };
    })
  );

  return processedRepos;
}

/**
 * Get all projects (repositories) for the portfolio
 * @param {string} username - GitHub username
 * @param {number} maxProjects - Maximum number of projects to fetch
 * @returns {Promise<Array>} Array of processed project data
 */
export async function getProjects(username, maxProjects = 10) {
  if (!username) {
    console.warn('No GitHub username provided');
    return [];
  }

  const repos = await fetchRepositories(username, maxProjects);
  return await processRepositories(repos, username);
}

/**
 * Get a specific project by slug
 * @param {string} username - GitHub username
 * @param {string} slug - Project slug
 * @returns {Promise<Object|null>} Project data or null if not found
 */
export async function getProjectBySlug(username, slug) {
  const projects = await getProjects(username, 50); // Get more projects to find the specific one
  return projects.find(project => project.slug === slug) || null;
}

/**
 * Get all project slugs for static generation
 * @param {string} username - GitHub username
 * @returns {Promise<Array>} Array of slug objects for Next.js static generation
 */
export async function getAllProjectSlugs(username) {
  const projects = await getProjects(username);
  return projects.map(project => ({
    params: { slug: project.slug }
  }));
}
