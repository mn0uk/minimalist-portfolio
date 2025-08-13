import { marked } from 'marked';
import matter from 'gray-matter';

const GITHUB_API_BASE = 'https://api.github.com';

marked.setOptions({
  breaks: true,
  gfm: true,
});

/**
 * Fetch repositories from GitHub API
 */
export async function fetchRepositories(username, maxRepos = 10) {
  const response = await fetch(
    `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=${maxRepos}`,
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
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const repos = await response.json();

  return repos
    .filter(repo => !repo.fork && !repo.private)
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at) - new Date(a.updated_at);
    })
    .slice(0, maxRepos);
}

/**
 * Fetch README content from a repository
 */
export async function fetchReadme(username, repoName) {
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

  if (!response.ok) return null;

  const data = await response.json();
  return Buffer.from(data.content, 'base64').toString('utf-8');
}

/**
 * Process repository data for display
 */
export async function processRepositories(repos, username) {
  const processedRepos = await Promise.all(
    repos.map(async (repo) => {
      const readme = await fetchReadme(username, repo.name);
      let processedReadme = null;
      let frontMatter = {};

      if (readme) {
        try {
          const { data, content } = matter(readme);
          frontMatter = data;
          processedReadme = marked(content);
        } catch {
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
 */
export async function getProjects(username, maxProjects = 10) {
  if (!username) return [];

  const repos = await fetchRepositories(username, maxProjects);
  return await processRepositories(repos, username);
}

/**
 * Get a specific project by slug - optimized to fetch only that repo
 */
export async function getProjectBySlug(username, slug) {
  if (!username || !slug) return null;

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${username}/${slug}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          ...(process.env.GITHUB_TOKEN && {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`
          })
        }
      }
    );

    if (!response.ok) return null;

    const repo = await response.json();
    if (repo.fork || repo.private) return null;

    const [processedRepo] = await processRepositories([repo], username);
    return processedRepo;
  } catch {
    return null;
  }
}

/**
 * Get all project slugs for static generation
 */
export async function getAllProjectSlugs(username) {
  const projects = await getProjects(username);
  return projects.map(project => ({
    params: { slug: project.slug }
  }));
}
