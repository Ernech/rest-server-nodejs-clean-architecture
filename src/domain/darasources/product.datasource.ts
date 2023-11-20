import { ProductDTO } from "../dtos/product/product.dto";
import { ProductEntity } from "../entities/product.entitty";

export abstract class ProductDatasource{

    abstract createProduct(productDTO:ProductDTO):Promise<ProductEntity>;

    abstract getProducts(offset:number,limit:number):Promise<ProductEntity[]>;

    abstract getProductById(productId:string):Promise<ProductEntity>;

    abstract getProductsByCategory(categoryId:string,offset:number, limit:number):Promise<ProductEntity[]>;

    abstract updateProduct(productId:string, categoryId:string):Promise<ProductEntity>;

    abstract deleteProduct(productId:string):Promise<ProductEntity>;

}