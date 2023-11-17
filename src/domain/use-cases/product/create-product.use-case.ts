import { ProductDTO } from "../../dtos/product/product.dto";
import { ProductEntity } from "../../entities/product.entitty";
import { ProductRepository } from "../../repositories/product.repository";

interface CreateProductUseCase{

    execute(productDTO:ProductDTO):Promise<ProductEntity>;

}


export class CreateProduct implements CreateProductUseCase{

    constructor(
       private readonly productRepository:ProductRepository
    ){}

   async execute(productDTO: ProductDTO): Promise<ProductEntity> {
        return this.productRepository.createProduct(productDTO);
    }

    
}