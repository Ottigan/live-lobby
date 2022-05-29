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

interface BaseGame {
    id: number;
    name: string;
    players: number;
    betLimits: {
        currency: string;
        min: number;
        max: number;
    };
    online: boolean;
    opensAt: string;
    description: string;
    bgImage: string;
}

interface RouletteGame extends BaseGame {
    type: GameType.Roulette;
    history: RouletteResultValue[];

}

interface BlackjackGame extends BaseGame {
    type: GameType.Blackjack;
}

type Game = RouletteGame | BlackjackGame;

interface Category {
    name: string;
    path: string;
    descriptor: string;
    gameIds: number[];
    bgColor: string;
}

type GridSize = "lg" | "md" | "sm";

interface WidgetOption {
    size: GridSize;
    title: string;
    image: string;
}

interface Widget {
    name: string;
    options?: WidgetOption[];
}

type RouletteResultColor = "green" | "black" | "red";
// eslint-disable-next-line max-len
type RouletteResultValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36;
