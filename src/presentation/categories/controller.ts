import { CustomError } from "../../domain";
import { CategoryDTO } from "../../domain/dtos/category/category.dto";
import { CategoryRepository } from "../../domain/repositories/category.repository";
import { Request, Response } from "express";
import { CreateCategory } from "../../domain/use-cases/category/create-category.use-case";

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
        
        new CreateCategory(this.categoryRepository).execute(categoryDto, user.userId)
        .then((data)=>res.status(201).json(data)).catch(error=>this.handleError(error,res));
        


    }

}