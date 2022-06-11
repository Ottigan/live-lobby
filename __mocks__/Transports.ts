import EventEmitter from "events";

interface CustomEmitter extends EventEmitter {
    send: () => void;
}

export const LobbyTransport = (): CustomEmitter => {
    const emitter = new EventEmitter() as CustomEmitter;
    emitter.send = jest.fn();

    return emitter;
};
