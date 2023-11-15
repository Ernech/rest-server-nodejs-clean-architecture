import { CategoryEntity } from "../../entities/category.entity";
import { CategoryRepository } from "../../repositories/category.repository";


interface GetCategoryByIdUseCase{

    execute(categoryId:string):Promise<CategoryEntity>;

}


export class GetCategoryById implements GetCategoryByIdUseCase{

    constructor(
        private readonly categoryRepository:CategoryRepository
    ){}

    async execute(categoryId: string): Promise<CategoryEntity> {
        
        return await this.categoryRepository.getCategoryById(categoryId);

    }

}