class Contribution {
    constructor(name, url, type) {
        this.name = name;
        this.url = url;
        this.type = type;
    }
}

export const allContributions = [
    new Contribution("Daveberry's Stats", "https://github.com/daveberrys/daves-stats", "repository")
];
