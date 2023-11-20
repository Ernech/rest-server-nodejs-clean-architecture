import { ProductEntity } from "../../entities/product.entitty";
import { ProductRepository } from "../../repositories/product.repository";


interface GetProductsByCategoryUseCase{

    execute(categoryId:string,offset:number, limit:number):Promise<ProductEntity[]>

}

export class GetProductsByCategory implements GetProductsByCategoryUseCase{
    
    constructor(private readonly productRepository:ProductRepository){}

    async execute(categoryId: string, offset: number, limit: number): Promise<ProductEntity[]> {
        return await this.productRepository.getProductsByCategory(categoryId,offset,limit);
    }
}