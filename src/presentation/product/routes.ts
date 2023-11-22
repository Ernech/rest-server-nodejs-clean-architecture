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
        router.get('/:id',[AuthMiddleware.validateJwt, IsValidMongoId.checkId],productController.getProductById);
        router.get('/',productController.getAllProducts);
        router.get('/category/:id',[IsValidMongoId.checkId],productController.getProductsByCategory);
        router.delete('/:id',[AuthMiddleware.validateJwt,IsValidMongoId.checkId],productController.deleteProduct);
        router.put('/:id',[AuthMiddleware.validateJwt,IsValidMongoId.checkId], productController.updateProduct)
        router.patch('/:id',[AuthMiddleware.validateJwt,IsValidMongoId.checkId], productController.changeAvailability);
       
        return router;


    }


}