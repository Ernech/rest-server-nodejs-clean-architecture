import { Response, Request } from "express";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { CustomError } from "../../domain";
import { ProductDTO } from "../../domain/dtos/product/product.dto";
import { CreateProduct } from "../../domain/use-cases/product/create-product.use-case";
import { GetProductById } from "../../domain/use-cases/product/get-product-byt-id.use-case";
import { GetProducts } from "../../domain/use-cases/product/get-products.use-case";
import { error } from "console";
import { GetProductsByCategory } from "../../domain/use-cases/product/get-products-by-category.use-case";
import { DeleteProduct } from "../../domain/use-cases/product/delete-product.use-case";
import { UpdateProduct } from "../../domain/use-cases/product/update-product.use-case";


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

    getProductById = async(req:Request,res:Response)=>{
        
        const {id} = req.params;

        new GetProductById(this.productRepository).execute(id)
        .then(data=>res.status(200).json(data)).catch(error=>this.handleError(error,res));
        
    }

    getAllProducts=async(req:Request,res:Response)=>{
        const {limit=0,offset=0} = req.query;
        new GetProducts(this.productRepository).execute(Number(offset),Number(limit))
        .then(data=>res.status(200).json(data)).catch(error=>this.handleError(error,res));
    }

    getProductsByCategory=async(req:Request,res:Response)=>{
        const {limit=0,offset=0} = req.query;
        const { id } = req.params;

        new GetProductsByCategory(this.productRepository).execute(id,Number(offset),Number(limit))
        .then(data=>res.status(200).json(data)).catch(error=>this.handleError(error,res));
    }

    updateProduct = async(req:Request,res:Response)=>{
        const {id} = req.params;
        const {user, ...data} =req.body
        const [error, productDTO] = ProductDTO.create({user:user._id,...data});
        if(error || !productDTO) return res.status(400).json({error});
        new UpdateProduct(this.productRepository).execute(id,productDTO)
        .then(data=>res.status(201).json(data)).catch(error=>this.handleError(error,res));
    }

    deleteProduct = async(req:Request,res:Response)=>{
        const { id } = req.params;
        new DeleteProduct(this.productRepository).execute(id)
        .then(data=>res.status(200).json(data))
    }
}