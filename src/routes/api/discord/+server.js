import { json } from '@sveltejs/kit';

export async function GET() {
	const response = await fetch('https://api.lanyard.rest/v1/users/1149685116042485781');
	const data = await response.json();
	const user = data.data.discord_user;
	const customStatus = data.data.activities.find(function (activity) {
		if (activity.type === 4) {
			return true;
		} else {
			return false;
		}
	});

	return json({
		displayName: user.global_name || user.username,
		username: user.username,
    state: customStatus?.state || null,
		status: data.data.discord_status,
		avatarUrl: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
	});
}
