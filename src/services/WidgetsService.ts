import { Database } from "db/Db";
import { Widget } from "types";

export class WidgetsService {
    public static async getWidgets(): Promise<Record<string, Widget>> {
        const widgets = await Database.find("widgets") as Record<string, Widget>;

        return widgets;
    }
}
