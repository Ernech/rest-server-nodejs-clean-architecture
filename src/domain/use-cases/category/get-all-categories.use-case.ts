import { CategoryEntity } from "../../entities/category.entity";
import { CategoryRepository } from "../../repositories/category.repository";


interface GetAllCategoriesUseCase{

    execute():Promise<CategoryEntity[]>

}

export class GetAllCategories implements GetAllCategoriesUseCase{

    constructor(
        private readonly categoryRepository:CategoryRepository
    ){}

    async execute(): Promise<CategoryEntity[]> {

        return await this.categoryRepository.getAllCategories();
    }
}
