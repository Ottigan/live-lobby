import type { CategoriesStore } from "stores/CategoriesStore";
import type { GamesStore } from "stores/GamesStore";
import type { UiStore } from "stores/UiStore";
import type { WidgetsStore } from "stores/WidgetsStore";

export enum Env {
    Production = "production",
    Development = "development",
}

export type Store = CategoriesStore | GamesStore | UiStore | WidgetsStore;

export type OmitMethodNames<T> = NonNullable<
  {
      // eslint-disable-next-line @typescript-eslint/ban-types
      [K in keyof T]: T[K] extends Function ? never : K;
  }[keyof T]
>;

export enum GameType {
    Baccarat = "baccarat",
    Blackjack = "blackjack",
    Roulette = "roulette",
}

export interface BaseGame {
    id: number;
    name: string;
    players: number;
    betLimits: {
        currency: string;
        min: number;
        max: number;
    };
    online: boolean;
    opensAt?: string;
    description: string;
    dealer: string | null;
    language: {
        code: string;
        image: string;
    };
    bgImage: string;
}

export type BaccaratResult = "banker" | "bankerTie" | "player" | "playerTie" | "";
export type BaccaratResultColumn = [BaccaratResult, BaccaratResult, BaccaratResult, BaccaratResult, BaccaratResult, BaccaratResult];

export interface BaccaratGame extends BaseGame {
    type: GameType.Baccarat;
    history: BaccaratResultColumn[];
}

export type BlackjackSeatIndex = "1" | "2" | "3" | "4" | "5" | "6" | "7";
export interface BlackjackGame extends BaseGame {
    type: GameType.Blackjack;
    seats: Record<BlackjackSeatIndex, boolean>;
}

export interface RouletteGame extends BaseGame {
    type: GameType.Roulette;
    history: RouletteResultValue[];
}

// eslint-disable-next-line max-len
export type RouletteResultValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36;

export type Game = BaccaratGame | BlackjackGame | RouletteGame;

export interface Category {
    name: string;
    path: string;
    descriptor: string;
    gameIds: number[];
    bgColor: string;
}

export type GridSize = "lg" | "md" | "sm";

export interface GridWidgetOption {
    size: GridSize;
    title: string;
    image: string;
}

export interface GridWidget {
    name: "gridWidget";
    options: GridWidgetOption[];
}

export interface FilterWidgetOption {
    target: string;
    value: number | string;
    title: string;
}

export type Filter = FilterWidgetOption | null;

export interface FilterWidget {
    name: "filterWidget";
    options: FilterWidgetOption[];
}

export interface SearchWidget {
    name: "searchWidget";
}

export type Widget = GridWidget | FilterWidget | SearchWidget;
