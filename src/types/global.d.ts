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
    id: number;
    name: string;
    players: number;
    type: GameType;
    betLimits: {
        currency: string;
        min: number;
        max: number;
    };
    online: boolean;
    description: string;
    bgImage: string;
}

interface Category {
    name: string;
    path: string;
    descriptor: string;
    gameIds: number[];
    bgColor: string;
}

interface WidgetOption {
    size: number;
    title: string;
    image: string;
}

interface Widget {
    name: string;
    options?: WidgetOption[];
}
