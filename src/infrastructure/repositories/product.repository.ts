import { ProductDatasource } from "../../domain/darasources/product.datasource";
import { ProductDTO } from "../../domain/dtos/product/product.dto";
import { ProductEntity } from "../../domain/entities/product.entitty";
import { ProductRepository } from "../../domain/repositories/product.repository";


export class ProductRepositoryImp implements ProductRepository{

    constructor(
        private productDatasource:ProductDatasource
    ){}

   async createProduct(productDTO: ProductDTO): Promise<ProductEntity> {
        return await this.productDatasource.createProduct(productDTO);
    }
    async getProducts(offset: number, limit: number): Promise<ProductEntity[]> {
        return await this.productDatasource.getProducts(offset,limit);
    }
    async getProductById(productId: string): Promise<ProductEntity> {
       return await this.productDatasource.getProductById(productId);
    }
   async getProductsByCategory(categoryId: string,offset:number, limit:number): Promise<ProductEntity[]> {
        return await this.productDatasource.getProductsByCategory(categoryId, offset,limit);
    }
    async updateProduct(productId: string, categoryId: string): Promise<ProductEntity> {
        throw new Error("Method not implemented.");
    }
    async deleteProduct(productId: string): Promise<ProductEntity> {
       return await this.productDatasource.deleteProduct(productId);
    }
}