import { Router } from "express"
import { CategoryDataSourceImp } from "../../infrastructure/datasources/category.repository";
import { CategoryRepositoryImpl } from "../../infrastructure/repositories/category.repository.";
import { CategoryController } from "./controller";


export class CategoryRoutes{

    static getRoutes():Router{
        const router = Router() ;

        const dataSource = new CategoryDataSourceImp();
        const categoryRepository =  new CategoryRepositoryImpl(dataSource);

        const controller = new CategoryController(categoryRepository);

        router.post('',controller.createCategory)


        return router;
    }

}