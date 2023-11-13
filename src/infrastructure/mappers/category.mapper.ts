import { CustomError } from "../../domain";
import { CategoryEntity } from "../../domain/entities/category.entity";


export class CategoryMapper{

    static categoryEntityFromObject(object:{[key:string]:any}){

        const { _id ,name, user } = object;
        
        if(!_id){
            throw CustomError.badRequest('Missing id');
        }

        if(!name) CustomError.badRequest('Name is required');
        if(!user) CustomError.badRequest('User id is reqiuired');

        return new CategoryEntity(_id, name, user);

    }


}