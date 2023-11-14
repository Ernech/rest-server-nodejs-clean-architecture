import { CategoryDatasource } from "../../domain/darasources/category.datasource";
import { CategoryDTO } from "../../domain/dtos/category/category.dto";
import { CategoryEntity } from "../../domain/entities/category.entity";
import { CategoryRepository } from "../../domain/repositories/category.repository";


export class CategoryRepositoryImpl implements CategoryRepository{

    constructor(
        private readonly categoryDatasource:CategoryDatasource
    ){}

    async createCategory(categoryDTO: CategoryDTO, userId: string): Promise<CategoryEntity> {
        return await this.categoryDatasource.createCategory(categoryDTO,userId);
    }
    getCategoryById(categoryId: string): Promise<CategoryEntity> {
        throw new Error("Method not implemented.");
    }
    async getAllCategories(): Promise<CategoryEntity[]> {
        return await this.categoryDatasource.getAllCategories();
    }
    editCategory(categoryId: string, categoryDto: CategoryDTO): Promise<CategoryEntity> {
        throw new Error("Method not implemented.");
    }
    deleteCategory(categoryId: string): Promise<CategoryEntity> {
        throw new Error("Method not implemented.");
    }
    
}