import { ProductEntity } from "../../entities/product.entitty";
import { ProductRepository } from "../../repositories/product.repository";


interface GetProductsByIdUseCase{

    execute(productId:string):Promise<ProductEntity>;

}


export class GetProductById implements GetProductsByIdUseCase{

    constructor(
        private readonly productRepository:ProductRepository
    ){}
    
    async execute(productId: string): Promise<ProductEntity> {
        
        return await this.productRepository.getProductById(productId)

    }
    
}