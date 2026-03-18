export interface Contribution {
    name: string;
    url: string;
    description: string;
    tags: string;
    type: 'organization' | 'repository';
}

export const softwareAndWebsiteContributions: Contribution[] = [
    {
        name: 'Pinpoint Tools',
        url: 'https://github.com/PinpointTools',
        description: 'A team dedicated of making apps, websites and webapps. All for free and Open Source.',
        tags: 'open source',
        type: 'organization'
    },
    {
        name: 'Creativity Archived',
        url: 'https://github.com/Creativity-Archived',
        description: 'A way to easily share your game with less restrctions. No bullshit. Just cool shit.',
        tags: 'open source',
        type: 'organization'
    },
    {
        name: 'Solar Engine',
        url: 'https://github.com/Team-SolarEngine',
        description:
            'Modified version of Psych Engine, now turning into a base-game fork. Former main developer. Formerly called as Universe Engine.',
        tags: 'open source',
        type: 'organization'
    }
];

export const allContributions: Contribution[] = [
    ...softwareAndWebsiteContributions
];