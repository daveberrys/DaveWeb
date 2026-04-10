import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function GET() {
	const apiKey = env.LASTFM_API_KEY;
	const username = 'daveberrycb';
	const fetchURL = `https://pylastfmcurrent.vercel.app/api/now_playing?user=${username}&api_key=${apiKey}`;

	try {
		const response = await fetch(fetchURL);

		if (!response.ok) {
			return json(
				{
					albumArt: 'null',
					artist: 'null',
					isPlaying: false,
					song: 'null'
				},
				{
					status: response.status
				}
			);
		} else {
			const data = await response.json();
			return json(data);
		}
	} catch (error) {
		console.log('Exception: ' + error);

		return json(
			{
				albumArt: 'null',
				artist: 'null',
				isPlaying: false,
				song: 'null'
			},
			{
				status: 500
			}
		);
	}
}
