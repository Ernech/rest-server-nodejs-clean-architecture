import { ProductModel } from "../../data/mongodb/models/product.model";
import { CustomError } from "../../domain";
import { ProductDatasource } from "../../domain/darasources/product.datasource";
import { ProductDTO } from "../../domain/dtos/product/product.dto";
import { ProductEntity } from "../../domain/entities/product.entitty";
import { ProductMapper } from "../mappers/product.mapper";



export class ProductDatasourceIml implements ProductDatasource{

    async createProduct(productDTO: ProductDTO): Promise<ProductEntity> {
        
        try {
            const product = await ProductModel.create(productDTO);

            await product.save();
            
            return ProductMapper.productEntityFromObject(product);

        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
           throw CustomError.internalServer('internal server')
        }
        
    }
    async getProducts(offset: number, limit: number): Promise<ProductEntity[]> {
        throw new Error("Method not implemented.");
    }
    async getProductById(productId: string): Promise<ProductEntity> {
        try {
            const product = await ProductModel.findOne({_id:productId,status:true})
            if(!product) throw CustomError.notFound(`THe product with the id: ${productId} does not exists`);
            return ProductMapper.productEntityFromObject(product);
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
           throw CustomError.internalServer('internal server')
        }
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