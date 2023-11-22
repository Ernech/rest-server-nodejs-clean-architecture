import { ProductEntity } from "../../entities/product.entitty";
import { ProductRepository } from "../../repositories/product.repository";

interface ChangeProductAvailabilityUseCase{

    execute(productId:string):Promise<ProductEntity>;

}

export class ChangeProductAvailability implements ChangeProductAvailabilityUseCase{
    
    constructor(
        private readonly productRepository:ProductRepository
    ){}

    async execute(productId:string): Promise<ProductEntity> {
        return await this.productRepository.changeAvailability(productId);
    }
}