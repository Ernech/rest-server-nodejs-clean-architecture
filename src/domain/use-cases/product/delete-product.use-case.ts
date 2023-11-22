import { ProductEntity } from "../../entities/product.entitty";
import { ProductRepository } from "../../repositories/product.repository";

interface DeleteProductUseCase{

    execute(productId:string):Promise<ProductEntity>;

}

export class DeleteProduct implements DeleteProductUseCase{
    
    constructor(
        private readonly productRepository:ProductRepository
    ){}

    async execute(productId:string): Promise<ProductEntity> {
        return await this.productRepository.deleteProduct(productId);
    }
    
}