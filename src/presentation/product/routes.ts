import { Router } from "express";
import {  ProductController } from "./controller";
import { ProductDatasourceIml } from "../../infrastructure/datasources/product.datasource";
import { ProductRepositoryImp } from "../../infrastructure/repositories/product.repository";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { IsValidMongoId } from "../middlewares/mongoId.middleware";

export class ProductRoutes{

    static get routes(){
        const router = Router();

        const datasource = new ProductDatasourceIml();
        const repository = new ProductRepositoryImp(datasource);
        
        const productController = new ProductController(repository);

        router.post('/',[AuthMiddleware.validateJwt, IsValidMongoId.checkIdFromRequestBody],productController.createProduct)
        return router;


    }


}