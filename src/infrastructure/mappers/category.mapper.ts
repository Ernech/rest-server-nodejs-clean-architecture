import { CustomError } from "../../domain";
import { CategoryEntity } from "../../domain/entities/category.entity";


export class CategoryMapper{

    static categoryEntityFromObject(object:{[key:string]:any}){

        const { _id, id,name, userId } = object;

        if(!_id || !id){
            throw CustomError.badRequest('Missing id');
        }

        if(!name) CustomError.badRequest('Name is required');
        if(!userId) CustomError.badRequest('User id is reqiuired');

        return new CategoryEntity(id || _id, name, userId);

    }


}