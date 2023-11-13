import { Router } from "express"
import { CategoryDataSourceImp } from "../../infrastructure/datasources/category.repository";
import { CategoryRepositoryImpl } from "../../infrastructure/repositories/category.repository.";
import { CategoryController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class CategoryRoutes{

    static get routes():Router{

        const router = Router();

        const dataSource = new CategoryDataSourceImp();
        const categoryRepository =  new CategoryRepositoryImpl(dataSource);

        const controller = new CategoryController(categoryRepository);

        router.post('/',AuthMiddleware.validateJwt,controller.createCategory);


        return router;
    }

}