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
        try {
            const products = await ProductModel.find({status:true}).skip(offset).limit(limit);
            const productsEntities:ProductEntity[] = []
            for(let i = 0; i<products.length;i++){  
                productsEntities.push(ProductMapper.productEntityFromObject(products[i]));
            }
            return productsEntities;
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer('Iternal server error')
        }
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
    async getProductsByCategory(categoryId: string, offset:number, limit:number): Promise<ProductEntity[]> {
        
        try {
            const products = await ProductModel.find({status:true, category:categoryId}).skip(offset).limit(limit);
            const productsEntities:ProductEntity[] = []
            for(let i = 0; i<products.length;i++){  
                productsEntities.push(ProductMapper.productEntityFromObject(products[i]));
            }
            return productsEntities;
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer('Iternal server error')
        }
    }
    
    updateProduct(productId: string, categoryId: string): Promise<ProductEntity> {
        throw new Error("Method not implemented.");
    }
    deleteProduct(productId: string): Promise<ProductEntity> {
        throw new Error("Method not implemented.");
    }
    
}