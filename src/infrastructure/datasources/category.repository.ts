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

    async getAllCategories(): Promise<CategoryEntity[]> {
        try {

            const categories = await CategoryModel.find({status:true});

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
    editCategory(categoryId: string, categoryDto: CategoryDTO): Promise<CategoryEntity> {
        throw new Error("Method not implemented.");
    }
    deleteCategory(categoryId: string): Promise<CategoryEntity> {
        throw new Error("Method not implemented.");
    }

}