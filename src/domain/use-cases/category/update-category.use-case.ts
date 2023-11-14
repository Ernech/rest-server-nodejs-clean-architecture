import { CategoryDTO } from "../../dtos/category/category.dto";
import { CategoryEntity } from "../../entities/category.entity";
import { CategoryRepository } from "../../repositories/category.repository";


interface UpdateCategoryUseCase{
    execute(categoryDTO:CategoryDTO, userId:string, categoryId:string):Promise<CategoryEntity>;
}



export class UpdateCategory implements UpdateCategoryUseCase{
    
    constructor(
        private readonly categoryRepository:CategoryRepository
    ){}
    
    execute(categoryDTO: CategoryDTO, userId: string, categoryId: string): Promise<CategoryEntity> {


        return this.categoryRepository.editCategory(categoryId,userId,categoryDTO);

    }


}