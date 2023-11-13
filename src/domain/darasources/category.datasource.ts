import { CategoryDTO } from "../dtos/category/category.dto";
import { CategoryEntity } from "../entities/category.entity";

export abstract class CategoryDatasource{

    abstract createCategory(categoryDto:CategoryDTO, userId:string):Promise<CategoryEntity>;

    abstract getCategoryById(categoryId:string):Promise<CategoryEntity>;

    abstract getAllCategories():Promise<CategoryEntity[]>;

    abstract editCategory(categoryId:string,categoryDto:CategoryDTO):Promise<CategoryEntity>;

    abstract deleteCategory(categoryId:string):Promise<CategoryEntity>;

}