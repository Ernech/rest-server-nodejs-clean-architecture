import { CategoryEntity } from "../../entities/category.entity";
import { CategoryRepository } from "../../repositories/category.repository";

interface DeleteCategoryUseCase{
    execute(categoryId:string):Promise<CategoryEntity>;
}


export class DeleteCategory implements DeleteCategoryUseCase{

    constructor(
        private readonly categoryRepository:CategoryRepository
    ){}

    async execute(categoryId: string): Promise<CategoryEntity> {
        return this.categoryRepository.deleteCategory(categoryId);
    }
}