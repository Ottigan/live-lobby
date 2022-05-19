function hasKey<K extends string, T extends object>(
    k: K, o: T,
): o is T & Record<K, unknown> {
    return k in o;
}

export function isGame(data: unknown): data is Game {
    return typeof data === "object"
    && data !== null
    && hasKey("name", data)
    && typeof data.name === "string"
    && hasKey("type", data)
    && typeof data.type === "string"
    && hasKey("players", data)
    && typeof data.players === "number"
    && hasKey("betLimits", data)
    && typeof data.betLimits === "object"
    && data.betLimits !== null
    && hasKey("min", data.betLimits)
    && typeof data.betLimits.min === "number"
    && hasKey("max", data.betLimits)
    && typeof data.betLimits.max === "number"
    && hasKey("currency", data.betLimits)
    && typeof data.betLimits.currency === "string";
}
