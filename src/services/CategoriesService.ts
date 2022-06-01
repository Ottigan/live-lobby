import { Database } from "db/Db";
import { Category } from "types";

export class CategoriesService {
    public static async getCategories(): Promise<Category[]> {
        const categories = await Database.find("categories") as Category[];

        return categories;
    }
}
