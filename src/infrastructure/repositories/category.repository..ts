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
    async getCategoryById(categoryId: string): Promise<CategoryEntity> {
        return await this.categoryDatasource.getCategoryById(categoryId);
    }
    async getAllCategories(limit:number, offset:number): Promise<CategoryEntity[]> {
        return await this.categoryDatasource.getAllCategories(limit,offset);
    }
   async editCategory(categoryId: string, userId:string,categoryDto: CategoryDTO): Promise<CategoryEntity> {
       return await this.categoryDatasource.editCategory(categoryId,userId,categoryDto);
    }
    async deleteCategory(categoryId: string): Promise<CategoryEntity> {
        return this.categoryDatasource.deleteCategory(categoryId);
    }
    
}