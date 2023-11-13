import { CategoryDTO } from "../../dtos/category/category.dto";
import { CategoryEntity } from "../../entities/category.entity";
import { CategoryRepository } from "../../repositories/category.repository";

interface CreateCategoryUseCase{

    execute(categoryDTO:CategoryDTO, userId:string):Promise<CategoryEntity>

}


export class CreateCategory implements CreateCategoryUseCase{
    
    constructor(
        private readonly categoryRepository:CategoryRepository
    ){}

     async execute(categoryDTO: CategoryDTO, userId:string): Promise<CategoryEntity> {


        const newCategory = await this.categoryRepository.createCategory(categoryDTO,userId);

        return newCategory;


    }
}