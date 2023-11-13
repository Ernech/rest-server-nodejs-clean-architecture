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
    getAllCategories(): Promise<CategoryEntity[]> {
        throw new Error("Method not implemented.");
    }
    editCategory(categoryId: string, categoryDto: CategoryDTO): Promise<CategoryEntity> {
        throw new Error("Method not implemented.");
    }
    deleteCategory(categoryId: string): Promise<CategoryEntity> {
        throw new Error("Method not implemented.");
    }

}