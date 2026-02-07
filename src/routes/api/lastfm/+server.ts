import { json } from '@sveltejs/kit';
import { LASTFM_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

const LASTFM_USERNAME = 'daveberrycb';

export const GET: RequestHandler = async ({ fetch }) => {
	try {
		if (!LASTFM_API_KEY) {
			return json({ error: 'API key not configured' }, { status: 500 });
		}

		const response = await fetch(
			`https://pylastfmcurrent.vercel.app/api/now_playing?user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}`
		);

		if (!response.ok) {
			return json(
				{ error: `Failed to fetch Last.fm data: ${response.statusText}` },
				{ status: response.status }
			);
		}

		const data = await response.json();
		return json(data);
	} catch (error: any) {
		console.error('LastFM API error:', error);
		return json({ error: `Network error: ${error.message}` }, { status: 500 });
	}
};
