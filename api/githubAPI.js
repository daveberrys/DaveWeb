import { allContributions } from "./misc/contributionsData.js";

const cacheDuration = 10 * 60 * 1000;

let cachedStats = null;
let cacheTimestamp = 0;

function extractGithubPath(url) {
  return url
    .replace("https://github.com/", "")
    .replace("http://github.com/", "")
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");
}

function getContributionType(path) {
  if (path.includes("/")) {
    return "repository";
  } else {
    return "organization";
  }
}

function getGithubToken() {
  if (process.env.GITHUB_API) {
    return process.env.GITHUB_API;
  } else if (process.env.GITHUB_TOKEN) {
    return process.env.GITHUB_TOKEN;
  } else {
    return null;
  }
}

function getHeaders(useAuth = true) {
  const headers = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "DavesWeb",
  };

  const githubToken = getGithubToken();

  if (useAuth && githubToken) {
    headers.Authorization = `Bearer ${githubToken}`;
  }

  return headers;
}

async function fetchGithubJSON(url) {
  const response = await fetch(url, {
    headers: getHeaders(true),
  });

  if (response.status === 403 && getGithubToken()) {
    const fallbackResponse = await fetch(url, {
      headers: getHeaders(false),
    });

    if (!fallbackResponse.ok) {
      throw new Error(`GitHub API error: ${fallbackResponse.status}`);
    } else {
      return fallbackResponse.json();
    }
  }

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  } else {
    return response.json();
  }
}

async function fetchOrgStats(path) {
  return fetchGithubJSON(`https://api.github.com/orgs/${path}`);
}

async function fetchOrgMembers(path) {
  const data = await fetchGithubJSON(
    `https://api.github.com/orgs/${path}/public_members?per_page=100`,
  );

  if (Array.isArray(data)) {
    return data.length;
  } else {
    return 0;
  }
}

async function fetchRepoStats(path) {
  return fetchGithubJSON(`https://api.github.com/repos/${path}`);
}

async function fetchRepoContributors(path) {
  const data = await fetchGithubJSON(
    `https://api.github.com/repos/${path}/contributors?per_page=100`,
  );

  if (Array.isArray(data)) {
    return data.length;
  } else {
    return 0;
  }
}

async function buildSingleGithubStat(path) {
  const githubPath = extractGithubPath(path);
  const contributionType = getContributionType(githubPath);

  if (contributionType === "organization") {
    const [data, members] = await Promise.all([
      fetchOrgStats(githubPath),
      fetchOrgMembers(githubPath),
    ]);

    return {
      path: githubPath,
      type: "organization",
      followers: data.followers ?? 0,
      repos: data.public_repos ?? 0,
      members: members,
    };
  } else {
    const [data, contributors] = await Promise.all([
      fetchRepoStats(githubPath),
      fetchRepoContributors(githubPath),
    ]);

    return {
      path: githubPath,
      type: "repository",
      stars: data.stargazers_count ?? 0,
      issues: data.open_issues_count ?? 0,
      forks: data.forks_count ?? 0,
      contributors: contributors,
    };
  }
}

async function buildGithubStats() {
  if (cachedStats && Date.now() - cacheTimestamp < cacheDuration) {
    return cachedStats;
  }

  const stats = {};

  const promises = allContributions.map(async function (contribution) {
    const githubPath = extractGithubPath(contribution.url);

    try {
      if (contribution.type === "organization") {
        const [data, members] = await Promise.all([
          fetchOrgStats(githubPath),
          fetchOrgMembers(githubPath),
        ]);

        stats[contribution.url] = {
          type: "organization",
          followers: data.followers ?? 0,
          repos: data.public_repos ?? 0,
          members: members,
        };
      } else {
        const [data, contributors] = await Promise.all([
          fetchRepoStats(githubPath),
          fetchRepoContributors(githubPath),
        ]);

        stats[contribution.url] = {
          type: "repository",
          stars: data.stargazers_count ?? 0,
          issues: data.open_issues_count ?? 0,
          forks: data.forks_count ?? 0,
          contributors: contributors,
        };
      }
    } catch (error) {
      console.log("Exception: " + error);

      stats[contribution.url] = {
        type: "error",
      };
    }
  });

  await Promise.all(promises);

  cachedStats = stats;
  cacheTimestamp = Date.now();

  return stats;
}

export async function GET(req) {
  try {
    const githubPath = req.query.url;

    if (githubPath) {
      const stat = await buildSingleGithubStat(githubPath);

      return stat;
    }

    const stats = await buildGithubStats();

    return {
      stats: stats,
    };
  } catch (error) {
    console.log("Exception: " + error);

    return {
      error: "Failed to fetch GitHub stats.",
    };
  }
}
