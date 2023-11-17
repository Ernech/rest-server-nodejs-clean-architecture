import { ProductDatasource } from "../../domain/darasources/product.datasource";
import { ProductDTO } from "../../domain/dtos/product/product.dto";
import { ProductEntity } from "../../domain/entities/product.entitty";
import { ProductRepository } from "../../domain/repositories/product.repository";


export class ProductRepositoryImp implements ProductRepository{

    constructor(
        private productDatasource:ProductDatasource
    ){}

   async createProduct(productDTO: ProductDTO): Promise<ProductEntity> {
        return this.productDatasource.createProduct(productDTO);
    }
    getProducts(offset: number, limit: number): Promise<ProductEntity[]> {
        throw new Error("Method not implemented.");
    }
    getProductById(productId: string): Promise<ProductEntity> {
        throw new Error("Method not implemented.");
    }
    getProductsByCategory(categoryId: string): Promise<ProductEntity[]> {
        throw new Error("Method not implemented.");
    }
    updateProduct(productId: string, categoryId: string): Promise<ProductEntity> {
        throw new Error("Method not implemented.");
    }
    deleteProduct(productId: string): Promise<ProductEntity> {
        throw new Error("Method not implemented.");
    }
}