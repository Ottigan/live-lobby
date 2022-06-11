import WebSocket from 'ws';
import fs from 'fs';
import {
  DbGame, Id, OmitMethodNames, TakeBlackjackSeatParams,
} from '../types';
import { getRandomMomentInNext24h } from '../utils';
import Watcher from './Watcher';

function readAsset(path: string): string {
  return fs.readFileSync(path).toString('base64');
}

class Db extends Watcher {
  public games: Record<Id, DbGame> = {
    1: {
      id: 1,
      name: 'Testerino Halapenjo',
      type: 'roulette',
      players: 54,
      betLimits: {
        currency: '€',
        min: 3,
        max: 20,
      },
      online: false,
      opensAt: getRandomMomentInNext24h(),
      description: '',
      dealer: null,
      language: 'uk',
      bgImage: readAsset('assets/roulette-bg-sm.jpg'),
      history: [],
    },
    2: {
      id: 2,
      name: 'Foo Fighters',
      type: 'roulette',
      players: 678,
      betLimits: {
        currency: '€',
        min: 1,
        max: 20,
      },
      online: true,
      description: '',
      dealer: 'Nelson',
      language: 'uk',
      bgImage: readAsset('assets/roulette-bg-sm.jpg'),
      history: [0, 0, 10, 5, 33, 12, 18, 10, 5, 5],
    },
    3: {
      id: 3,
      name: 'Extremely long name',
      type: 'roulette',
      players: 43,
      betLimits: {
        currency: '€',
        min: 0.5,
        max: 20,
      },
      online: true,
      description: '',
      dealer: 'Bart',
      language: 'fr',
      bgImage: readAsset('assets/roulette-bg-sm.jpg'),
      history: [0, 0, 10, 5, 33, 12, 18, 10, 5, 5],
    },
    4: {
      id: 4,
      name: 'Pineapple on Pizza',
      type: 'blackjack',
      players: 2,
      betLimits: {
        currency: '€',
        min: 5,
        max: 100,
      },
      online: true,
      description: '',
      dealer: 'Homer',
      language: 'uk',
      bgImage: readAsset('assets/blackjack-bg-sm.jpg'),
      seats: {
        1: false,
        2: false,
        3: true,
        4: false,
        5: true,
        6: false,
        7: false,
      },
    },
    5: {
      id: 5,
      name: 'FizzBuzz',
      type: 'blackjack',
      players: 5,
      betLimits: {
        currency: '€',
        min: 15,
        max: 200,
      },
      online: false,
      opensAt: getRandomMomentInNext24h(),
      description: '',
      dealer: null,
      language: 'de',
      bgImage: readAsset('assets/blackjack-bg-sm.jpg'),
      seats: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
      },
    },
    6: {
      id: 6,
      name: 'Omicron',
      type: 'roulette',
      players: 29,
      betLimits: {
        currency: '€',
        min: 5,
        max: 2000,
      },
      online: false,
      opensAt: getRandomMomentInNext24h(),
      description: '',
      dealer: null,
      language: 'in',
      bgImage: readAsset('assets/roulette-bg-sm.jpg'),
      history: [],
    },
    7: {
      id: 7,
      name: 'Adult Tic Tac Toe',
      type: 'baccarat',
      players: 29,
      betLimits: {
        currency: '€',
        min: 5,
        max: 2000,
      },
      online: true,
      description: '',
      dealer: 'Ultron',
      language: 'uk',
      bgImage: readAsset('assets/baccarat-bg-sm.jpg'),
      history: [
        ['banker', 'banker', 'banker', '', '', ''],
        ['player', 'player', 'playerTie', '', '', ''],
        ['banker', 'bankerTie', 'bankerTie', '', '', ''],
        ['player', '', '', '', '', ''],
        ['banker', 'banker', 'banker', 'banker', '', ''],
        ['player', 'player', '', '', '', ''],
        ['banker', 'banker', 'banker', 'banker', 'banker', 'banker'],
        ['player', 'player', '', '', '', 'banker'],
        ['banker', '', '', '', '', 'banker'],
        ['player', 'playerTie', 'playerTie', '', '', ''],
        ['banker', 'banker', '', '', '', ''],
        ['playerTie', 'player', 'player', '', '', ''],
        ['banker', 'banker', 'banker', 'banker', 'banker', 'banker'],
        ['player', 'player', '', '', '', ''],
        ['banker', 'banker', 'banker', '', '', ''],
        ['player', '', '', '', '', ''],
        ['banker', 'banker', 'banker', 'banker', 'banker', 'banker'],
        ['player', 'playerTie', 'player', '', '', ''],
        ['banker', 'banker', '', '', '', ''],
        ['player', 'player', '', '', '', ''],
        ['banker', 'banker', 'banker', 'banker', 'banker', ''],
        ['player', '', '', '', '', ''],
        ['banker', 'banker', 'banker', 'banker', 'banker', 'banker'],
        ['playerTie', 'player', '', '', '', ''],
        ['banker', 'banker', '', '', '', ''],
        ['player', 'player', 'player', 'player', 'player', 'playerTie'],
        ['', '', '', '', '', 'player'],
        ['', '', '', '', '', 'player'],
        ['', '', '', '', '', 'player'],
        ['', '', '', '', '', ''],
      ],
    },
  };

  public categories = [
    {
      name: 'Baccarat',
      path: 'baccarat',
      descriptor: 'baccarat',
      gameIds: [7],
      bgColor: '#3f3050',
    },
    {
      name: 'Blackjack',
      path: 'blackjack',
      descriptor: 'blackjack',
      gameIds: [4, 5],
      bgColor: '#332424',
    },
    {
      name: 'Roulette',
      path: 'roulette',
      descriptor: 'roulette',
      gameIds: [1, 2, 3, 6],
      bgColor: '#3e3e53',
    },
  ];

  public widgets = [
    {
      name: 'searchWidget',
    },
    {
      name: 'filterWidget',
      options: [
        {
          target: 'betLimits',
          value: 10,
          title: '€ 10+',
        },
        {
          target: 'betLimits',
          value: 5,
          title: '€ 5+',
        },
        {
          target: 'betLimits',
          value: 1,
          title: '€ 1+',
        },
        {
          target: 'language',
          value: 'uk',
          title: 'UK',
        },
        {
          target: 'language',
          value: 'de',
          title: 'DE',
        },
      ],
    },
    {
      name: 'gridWidget',
      options: [
        {
          size: 'lg',
          title: 'Large grid',
        },
        {
          size: 'md',
          title: 'Medium grid',
        },
        {
          size: 'sm',
          title: 'Small grid',
        },
      ],
    },
  ];

  public constructor() {
    super();

    this.on('games_blackjack_seats', this.takeBlackjackSeat);

    setInterval(() => this.updatePlayers(), 1000);
    setInterval(() => this.freeRandomBlackjackSeat(), 5000);
    setInterval(() => this.togglePromoCategory(), 10000);
  }

  public initClient(socket: WebSocket): void {
    socket.send(JSON.stringify({ status: 'categories', data: this.categories }));
    socket.send(JSON.stringify({ status: 'games', data: this.games }));
    socket.send(JSON.stringify({ status: 'widgets', data: this.widgets }));

    this.appendClient(socket);
  }

  public find<K extends OmitMethodNames<Db>>(descriptor: K): Db[K] {
    return this[descriptor];
  }

  public takeBlackjackSeat = ({ gameId, seatIndex }: TakeBlackjackSeatParams): void => {
    const game = this.games[gameId];
    const { seats } = game;

    if (seats && seats[seatIndex] === false) {
      seats[seatIndex] = true;
      game.players++;

      const data = {
        status: 'games_blackjack_seats',
        data: {
          id: gameId,
          seats: game.seats,
          players: game.players,
        },
      };

      this.sendToAll(data);
    }
  };

  public leaveBlackjackSeat = ({ gameId, seatIndex }: TakeBlackjackSeatParams): void => {
    const game = this.games[gameId];
    const { seats } = game;

    if (seats && seats[seatIndex] === true) {
      seats[seatIndex] = false;
      game.players--;

      const data = {
        status: 'games_blackjack_seats',
        data: {
          id: gameId,
          seats: game.seats,
          players: game.players,
        },
      };

      this.sendToAll(data);
    }
  };

  private updatePlayers(): void {
    const playerCountData = Object.values(this.games).map((game) => {
      const { id, type, players } = game;

      const changes = Math.round(Math.random() * 10);

      if (type !== 'blackjack') {
        if (Math.random() > 0.5) {
          this.games[id].players = players + changes;
        } else {
          this.games[id].players = changes > players ? 0 : players - changes;
        }
      }

      return { id, players: this.games[id].players };
    });

    const data = { status: 'games_player_count', data: playerCountData };

    this.sendToAll(data);
  }

  private togglePromoCategory(): void {
    if (this.categories.length === 4) {
      this.categories.pop();
    } else {
      const promoCategory = {
        name: 'Promotion',
        path: 'promotion',
        descriptor: 'promo',
        gameIds: [7, 3, 4],
        bgColor: '#14474d',
      };

      this.categories.push(promoCategory);
    }

    const data = { status: 'categories', data: this.categories };

    this.sendToAll(data);
  }

  private freeRandomBlackjackSeat(): void {
    Object.values(this.games).forEach((game) => {
      if (game.type === 'blackjack' && game.seats) {
        const takenSeats = Object.keys(game.seats).filter((key) => game.seats && game.seats[+key]);

        const seatIndex = +takenSeats[Math.round(takenSeats.length * Math.random())];

        this.leaveBlackjackSeat({ gameId: game.id, seatIndex });
      }
    });
  }
}

const Database = new Db();

export default Database;
