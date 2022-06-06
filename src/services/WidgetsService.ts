import { Database } from "db/Db";
import { Widget } from "types";

export class WidgetsService {
    public static async getWidgets(): Promise<Widget[]> {
        const widgets = await Database.find("widgets") as Widget[];

        return widgets;
    }
}
