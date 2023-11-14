import { CategoryEntity } from "../../entities/category.entity";
import { CategoryRepository } from "../../repositories/category.repository";


interface GetAllCategoriesUseCase{

    execute(limit:number,offset:number):Promise<CategoryEntity[]>

}

export class GetAllCategories implements GetAllCategoriesUseCase{

    constructor(
        private readonly categoryRepository:CategoryRepository
    ){}

    async execute(limit:number, offset:number): Promise<CategoryEntity[]> {

        return await this.categoryRepository.getAllCategories(limit,offset);
    }
}
