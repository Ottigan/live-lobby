declare module "*.module.scss" {
    const classNames: Record<string, string>;
    export = classNames;
}

declare module "*.jpg";
declare module "*.svg";

type OmitMethodNames<T> = NonNullable<
  {
      // eslint-disable-next-line @typescript-eslint/ban-types
      [K in keyof T]: T[K] extends Function ? never : K;
  }[keyof T]
>;

const enum GameType {
    Roulette = "roulette",
    Blackjack = "blackjack",
}

interface Game {
    name: string;
    players: number;
    type: GameType;
    betLimits: {
        currency: string;
        min: number;
        max: number;
    };
}

interface Category {
    name: string;
    path: string;
}
