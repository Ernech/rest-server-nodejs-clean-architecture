import { ProductDTO } from "../../dtos/product/product.dto";
import { ProductEntity } from "../../entities/product.entitty";
import { ProductRepository } from "../../repositories/product.repository";

interface UpdateProductUseCase{
    execute(categoryId:string, productDTO:ProductDTO):Promise<ProductEntity>
}


export class UpdateProduct implements UpdateProductUseCase{
    
    constructor(
        private readonly productRepository:ProductRepository
    ){}

    async execute(categoryId: string, productDTO: ProductDTO): Promise<ProductEntity> {
        return this.productRepository.updateProduct(categoryId, productDTO);
    }
    
}