import EventEmitter from "events";

interface CustomEmitter extends EventEmitter {
    send: () => void;
    fetchCategories: () => void;
    fetchGames: () => void;
    fetchWidgets: () => void;
}

export const LobbyTransport = (): CustomEmitter => {
    const emitter = new EventEmitter() as CustomEmitter;
    emitter.send = jest.fn();
    emitter.fetchCategories = jest.fn();
    emitter.fetchGames = jest.fn();
    emitter.fetchWidgets = jest.fn();

    return emitter;
};
