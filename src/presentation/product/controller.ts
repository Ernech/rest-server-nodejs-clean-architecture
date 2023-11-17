import { Response, Request } from "express";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { CustomError } from "../../domain";
import { ProductDTO } from "../../domain/dtos/product/product.dto";
import { CreateProduct } from "../../domain/use-cases/product/create-product.use-case";


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

    createProduct=async(req:Request,res:Response)=>{

        const {user, ...data} =req.body
        const [error, productDTO] = ProductDTO.create({user:user._id,...data});
        if(error || !productDTO) return res.status(400).json({error});

        new CreateProduct(this.productRepository).execute(productDTO)
        .then(data=>res.status(201).json(data)).catch(error=>this.handleError(error,res));

    
    }



}