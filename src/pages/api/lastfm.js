function createJSONResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status: status,
        headers: {
            "Content-Type": "application/json"
        }
    });
}

function getFallbackData() {
    return {
        albumArt: "null",
        artist: "null",
        isPlaying: false,
        song: "null"
    };
}

export async function GET() {
    const apiKey = import.meta.env.LASTFM_API_KEY;
    const username = "daveberrycb";

    if (!apiKey) {
        return createJSONResponse(getFallbackData(), 500);
    }

    const fetchURL = `https://pylastfmcurrent.vercel.app/api/now_playing?user=${username}&api_key=${apiKey}`;

    try {
        const response = await fetch(fetchURL);

        if (!response.ok) {
            return createJSONResponse(getFallbackData(), response.status);
        } else {
            const data = await response.json();
            return createJSONResponse(data);
        }
    } catch (error) {
        console.log("Exception: " + error);

        return createJSONResponse(getFallbackData(), 500);
    }
}
