declare module "*.module.scss" {
    const classNames: Record<string, string>;
    export = classNames;
}

interface Game {
    name: string;
    players: number;
    betLimits: {
        currency: string;
        min: number;
        max: number;
    };
}
