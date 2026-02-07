export interface Contribution {
	name: string;
	url: string;
	description: string;
	tags: string;
	type: 'organization' | 'repository';
}

export const softwareAndWebsiteContributions: Contribution[] = [
	{
		name: 'Track The Code',
		url: 'https://github.com/TrackTheCode',
		description:
			'A team dedicated of making apps, websites and webapps. All for free and Open Source.',
		tags: 'open source',
		type: 'organization'
	},
	{
		name: 'Current LastFM',
		url: 'https://github.com/daveberrys/CurrentLastFM',
		description: 'This is a project I made recently to fetch your current playing from LastFM.',
		tags: 'open source',
		type: 'repository'
	},
	{
		name: 'WhatsAnApp',
		url: 'https://github.com/daveberrys/WhatsAnApp',
		description:
			"Modification to Whatsapp's web UI. Purely made with Python. Currently not mainted, but will be soon.",
		tags: 'open source',
		type: 'repository'
	},
	{
		name: 'Creativity Archived',
		url: 'https://github.com/Creativity-Archived/Creativity-Archived',
		description:
			'A way to easily share your game with less restrctions. No bullshit. Just cool shit.',
		tags: 'open source',
		type: 'repository'
	}
];

export const gameContributions: Contribution[] = [
	{
		name: 'Universe Engine',
		url: 'https://github.com/Team-UniverseEngine',
		description:
			'Modified version of Psych Engine, now turning into a base-game fork. Former main developer.',
		tags: 'open source',
		type: 'organization'
	}
];

export const allContributions: Contribution[] = [
	...softwareAndWebsiteContributions,
	...gameContributions
];
