import { Database } from "db/Db";
import { Category } from "types";
import { isCategory } from "utils";

export class CategoriesService {
    public static async getCategories(): Promise<Category[]> {
        const categories = await Database.find("categories");

        const verifiedCategories = Array.isArray(categories) ? categories.filter(isCategory) : [];

        return verifiedCategories;
    }
}
