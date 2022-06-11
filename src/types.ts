import { CategoriesService, GamesService, WidgetsService } from "services";
import { CategoriesStore, GamesStore, WidgetsStore } from "stores";
import { UiStore } from "stores/UiStore";

/**
 * Miscellaneous
 */
export enum Env {
    Production = "production",
    Development = "development",
}

export type OmitMethodNames<T> = NonNullable<
  {
      // eslint-disable-next-line @typescript-eslint/ban-types
      [K in keyof T]: T[K] extends Function ? never : K;
  }[keyof T]
>;

export interface AppContext {
    stores: Stores;
    services: Services;
}

/**
 * Transports
 */
export interface TransportResponse {
    status: string;
    data: string;
}

/**
 * Stores
 */
export interface Stores {
    "CategoriesStore": CategoriesStore;
    "GamesStore": GamesStore;
    "UiStore": UiStore;
    "WidgetsStore": WidgetsStore;
}
export type StoreName = keyof Stores;
export type Store = Stores[StoreName];
export type StoreConstructor = typeof CategoriesStore | typeof GamesStore | typeof UiStore | typeof WidgetsStore;
export type StoreConstructors = Record<StoreName, StoreConstructor>;

/**
 * Services
 */
export interface Services {
    "CategoriesService": CategoriesService;
    "GamesService": GamesService;
    "WidgetsService": WidgetsService;
}
export type ServiceName = keyof Services;
export type Service = Services[ServiceName];
export type ServiceConstructor = typeof CategoriesService | typeof GamesService | typeof WidgetsService;
export type ServiceConstructors = Record<ServiceName, ServiceConstructor>;

/**
 * Categories
 */

export interface Category {
    name: string;
    path: string;
    descriptor: string;
    gameIds: number[];
    bgColor: string;
}

/**
 * Games
 */
export type GameId = number;

export enum GameType {
    Baccarat = "baccarat",
    Blackjack = "blackjack",
    Roulette = "roulette",
}

export interface BaseGame {
    id: GameId;
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
    language: string;
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
export type Games = Record<GameId, Game>;
export type Id = Game["id"];
export type GamePlayerData = Pick<Game, "id" | "players">;
export type BlackjackSeatData = Pick<BlackjackGame, "id" | "players" | "seats">;

/**
 * Widgets
*/
export type GridSize = "lg" | "md" | "sm";

export interface GridWidgetOption {
    size: GridSize;
    title: string;
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
