function hasKey<K extends string, T extends object>(
    k: K, o: T,
): o is T & Record<K, unknown> {
    return k in o;
}

export function isGame(data: unknown): data is Game {
    return !!data
    && typeof data === "object"
    && hasKey("name", data)
    && typeof data.name === "string"
    && hasKey("type", data)
    && typeof data.type === "string"
    && hasKey("online", data)
    && typeof data.online === "boolean"
    && hasKey("bgImage", data)
    && typeof data.bgImage === "string"
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

export function isCategory(data: unknown): data is Category {
    return !!data
    && typeof data === "object"
    && hasKey("name", data)
    && typeof data.name === "string"
    && hasKey("path", data)
    && typeof data.path === "string"
    && hasKey("descriptor", data)
    && typeof data.descriptor === "string"
    && hasKey("bgColor", data)
    && typeof data.bgColor === "string"
    && hasKey("gameIds", data)
    && Array.isArray(data.gameIds)
    && data.gameIds.every(Number.isInteger);
}

export function assertsWidgets(data: unknown): asserts data is Record<string, Widget> {
    function isWidget(x: unknown): x is Widget {
        return !!x
            && typeof x === "object"
            && hasKey("name", x)
            && typeof x.name === "string"
            && (!hasKey("options", x) || (Array.isArray(x.options)
              && x.options.every((option: unknown) => {
                  return !!option && typeof option === "object"
                  && hasKey("size", option) && typeof option.size === "number"
                  && hasKey("title", option) && typeof option.title === "string"
                  && hasKey("image", option) && typeof option.image === "function";
              })
            ));
    }

    if (!data
    || typeof data !== "object"
    || Object.keys(data).some((key): boolean => {
        return !hasKey(key, data) || !isWidget(data[key]);
    })) {
        throw Error("Received invalid Widgets data");
    }
}
