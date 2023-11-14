import { CategoryDTO } from "../dtos/category/category.dto";
import { CategoryEntity } from "../entities/category.entity";

export abstract class CategoryRepository{

    abstract createCategory(categoryDto:CategoryDTO, userId:string):Promise<CategoryEntity>;

    abstract getCategoryById(categoryId:string):Promise<CategoryEntity>;

    abstract getAllCategories(limit:number,offset:number):Promise<CategoryEntity[]>;

    abstract editCategory(categoryId:string,userId:string,categoryDto:CategoryDTO):Promise<CategoryEntity>;

    abstract deleteCategory(categoryId:string):Promise<CategoryEntity>;
}