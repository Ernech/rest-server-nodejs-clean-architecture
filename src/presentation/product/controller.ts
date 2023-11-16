import { Response } from "express";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { CustomError } from "../../domain";


export class ProductController{

    constructor(
        private readonly productRepository:ProductRepository
    ){}


    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message})
        }
        console.log(error);
        return res.status(500).json({error:'Internal server error'});
    }



}