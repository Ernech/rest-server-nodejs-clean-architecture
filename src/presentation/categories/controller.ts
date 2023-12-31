import { CustomError } from "../../domain";
import { CategoryDTO } from "../../domain/dtos/category/category.dto";
import { CategoryRepository } from "../../domain/repositories/category.repository";
import { Request, Response } from "express";
import { CreateCategory } from "../../domain/use-cases/category/create-category.use-case";
import { GetAllCategories } from "../../domain/use-cases/category/get-all-categories.use-case";
import { UpdateCategory } from "../../domain/use-cases/category/update-category.use-case";
import { GetCategoryById } from "../../domain/use-cases/category/get-category-by-is.use-case";
import { DeleteCategory } from "../../domain/use-cases/category/delete-category.use-case";

export class CategoryController{

    constructor(
        private readonly categoryRepository:CategoryRepository
    ){}

    private handleError = (error:unknown, res:Response)=>{
   
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message});
        }
        console.log(error);
        return res.status(500).json({error:'Internal server error'});
    }

    


    createCategory = async(req:Request, res:Response)=>{
        
        const {name, user} =req.body
        const [error, categoryDto] = CategoryDTO.create({name})
        if (error || !categoryDto ) return res.status(400).json({error});
        
        new CreateCategory(this.categoryRepository).execute(categoryDto, String(user._id))
        .then((data)=>res.status(201).json(data)).catch(error=>this.handleError(error,res));
        
    }

    getCategories = async(req:Request, res:Response)=>{
        const {limit=5, offset=0} = req.query;

        new GetAllCategories(this.categoryRepository).execute(Number(limit),Number(offset))
        .then((data)=>res.status(200).json(data)).catch(error=> this.handleError(error,res));
    }

    updateCategory = async(req:Request, res:Response)=>{
        
        const {user, name} = req.body;
        const {id} = req.params;

        const [error, categoryDto] = CategoryDTO.create({name})
        if (error || !categoryDto ) return res.status(400).json({error});
        

        new UpdateCategory(this.categoryRepository).execute(categoryDto,user._id,id)
        .then(data=> res.status(201).json(data)).catch(error=>this.handleError(error,res));

    }

    getCategoryById = async(req:Request, res:Response)=>{

        const {id} = req.params;

        new GetCategoryById(this.categoryRepository).execute(id)
        .then(data=> res.status(200).json(data)).catch(error=>this.handleError(error,res));
    }

    deleteCategory = async(req:Request, res:Response)=>{
        const {id} = req.params;
        new DeleteCategory(this.categoryRepository).execute(id)
        .then(data=> res.status(200).json(data)).catch(error=>this.handleError(error,res));
    }

}