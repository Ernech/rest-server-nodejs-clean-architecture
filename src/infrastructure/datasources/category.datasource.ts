import { CategoryModel } from "../../data/mongodb/models/category.model";
import { CustomError } from "../../domain";
import { CategoryDatasource } from "../../domain/darasources/category.datasource";
import { CategoryDTO } from "../../domain/dtos/category/category.dto";
import { CategoryEntity } from "../../domain/entities/category.entity";
import { CategoryMapper } from "../mappers/category.mapper";


export class CategoryDataSourceImp implements CategoryDatasource {

    async createCategory(categoryDto: CategoryDTO, userId: string): Promise<CategoryEntity> {


        try {

            const {name} = categoryDto;
            const newCategory = await CategoryModel.create({name,user:userId});

            await newCategory.save();
            
            return CategoryMapper.categoryEntityFromObject(newCategory);

        } catch (error) {
            if (error instanceof CustomError) {
                throw error
            }
            throw CustomError.internalServer();
        }

    }
    getCategoryById(categoryId: string): Promise<CategoryEntity> {
        throw new Error("Method not implemented.");
    }

    async getAllCategories(limit:number, offset:number): Promise<CategoryEntity[]> {
        try {

            const categories = await CategoryModel.find({status:true}).skip(offset).limit(limit);

            if(!categories || categories.length===0) return [];

            const categoriesEntities:CategoryEntity[] =[];

            for(let i=0; i<categories.length; i++){

                categoriesEntities.push(CategoryMapper.categoryEntityFromObject(categories[i]));
            }

            return categoriesEntities;


        } catch (error) {

            if (error instanceof CustomError) {
                throw error
            }
            throw CustomError.internalServer();

        }
    }
    async editCategory(categoryId: string, userId:string ,categoryDto: CategoryDTO): Promise<CategoryEntity> {
        
        try {
            const categoryToEdit = await CategoryModel.findByIdAndUpdate(categoryId,{...categoryDto, user:userId},{new:true});
        if(!categoryToEdit){
            throw CustomError.notFound(`The category with the id ${categoryId} does not exists`);
        }
            return CategoryMapper.categoryEntityFromObject(categoryToEdit);

        } catch (error) {
            
            if (error instanceof CustomError) {
                throw error
            }
            throw CustomError.internalServer();
        }
    }
    deleteCategory(categoryId: string): Promise<CategoryEntity> {
        throw new Error("Method not implemented.");
    }

}