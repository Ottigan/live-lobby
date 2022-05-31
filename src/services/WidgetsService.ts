import { Database } from "db/Db";
import { Widget } from "types";
import { assertsWidgets } from "utils";

export class WidgetsService {
    public static async getWidgets(): Promise<Record<string, Widget>> {
        const widgets = await Database.find("widgets");
        assertsWidgets(widgets);

        return widgets;
    }
}
