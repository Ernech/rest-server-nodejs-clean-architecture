import { ProductEntity } from "../../entities/product.entitty";
import { ProductRepository } from "../../repositories/product.repository";

interface GetProductsUseCase{

    execute(offset:number, limit:number):Promise<ProductEntity[]>

}



export class GetProducts implements GetProductsUseCase{

    constructor(
        private productsRepository:ProductRepository
    ){}

    async execute(offset: number, limit: number): Promise<ProductEntity[]> {
        return await this.productsRepository.getProducts(offset,limit);
    }

}