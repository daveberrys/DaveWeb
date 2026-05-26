function getFallbackData() {
  return {
    albumArt: "null",
    artist: "null",
    isPlaying: false,
    song: "null",
  };
}

export async function GET() {
  const apiKey = process.env.LASTFM_API_KEY;
  const username = "daveberrycb";

  if (!apiKey) {
    return getFallbackData();
  }

  const fetchURL = `https://pylastfmcurrent.vercel.app/api/now_playing?user=${username}&api_key=${apiKey}`;

  try {
    const response = await fetch(fetchURL);

    if (!response.ok) {
      return getFallbackData();
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("Exception: " + error);

    return getFallbackData();
  }
}
