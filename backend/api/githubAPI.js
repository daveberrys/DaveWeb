function buildHeader() {
  return {
    "Authorization": `Bearer ${process.env.GITHUB_API}`,
    "Accept": "application/vnd.github+json",
    "User-Agent": "daveberrys"
  }
}

async function fetchStats(url, isRepo) {
  const finalGithubURL = `https://api.github.com/${isRepo ? `repos/${url}` : `orgs/${url}`}`;
  console.log(finalGithubURL)
  
  const response = await fetch(finalGithubURL, { headers: buildHeader(), });
  if (!response.ok) throw new Error(`GitHub API Error: ${response.status}`)
  const data = await response.json();

  if (isRepo) {
    return {
      stars: data.stargazers_count,
      forks: data.forks,
      type: "repository",
    }
  } else {
    return {
      followers: data.followers,
      repos: data.public_repos,
      type: "organization",
    }
  }
}

export async function GET(req) {
  const githubPath = req.query.url;
  const stats = await fetchStats(githubPath, githubPath.includes('/'));
  return {
    ...stats,
  };
}