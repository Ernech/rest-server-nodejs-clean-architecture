import { CustomError } from "../../domain";
import { ProductEntity } from "../../domain/entities/product.entitty";


export class ProductMapper{
 
    static productEntityFromObject(object:{[key:string]:any}){

        const {_id,name,description,available,category, user}= object;

        
        if(!_id) throw CustomError.internalServer('Mongo id missed');
        if(!name) throw CustomError.badRequest('Name is required');
        if(!description) throw CustomError.badRequest('Description is required');
        if(!category) throw CustomError.badRequest('CategoryId is required');
        if(!user) throw CustomError.badRequest('UserId is required');

        return new ProductEntity(_id,name,description,available,category,user);


    }

}