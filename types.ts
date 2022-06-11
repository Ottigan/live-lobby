export type OmitMethodNames<T> = NonNullable<
  {
      // eslint-disable-next-line @typescript-eslint/ban-types
      [K in keyof T]: T[K] extends Function ? never : K;
  }[keyof T]
>;

export type Id = number;

export interface TakeBlackjackSeatParams {
    gameId: Id;
    seatIndex: number;
}

export interface DbGame {
    id: Id;
    name: string;
    type: string;
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
    history?: number[] | [string, string, string, string, string, string][];
    seats?: Record<number, boolean>;
}
