function buildHeader() {
  return {
    "Authorization": `token ${process.env.CODEBERG_API}`,
    "Accept": "application/json",
    "User-Agent": "daveberrys"
  }
}

async function fetchStats(url, isRepo) {
  const finalCodebergURL = `https://codeberg.org/api/v1/${isRepo ? `repos/${url}` : `orgs/${url}`}`;
  console.log(finalCodebergURL)
  
  const response = await fetch(finalCodebergURL, { headers: buildHeader(), });
  if (!response.ok) throw new Error(`Codeberg API Error: ${response.status}`)
  const data = await response.json();
  
  if (isRepo) {
    return {
      stars: data.stars_count,
      forks: data.forks_count,
      type: "repository",
    }
  } else {
    const reposResp = await fetch(`${finalCodebergURL}/repos`, { headers: buildHeader(), });
    
    return {
      followers: data.followers_count || 0,
      repos: reposResp.ok ? (await reposResp.json()).length : 0,
      type: "organization",
    }
  }
}

export async function GET(req) {
  const codebergPath = req.query.url;
  const stats = await fetchStats(codebergPath, codebergPath.includes('/'));
  return {
    ...stats,
  };
}