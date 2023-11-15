import { Router } from "express"
import { CategoryDataSourceImp } from "../../infrastructure/datasources/category.datasource";
import { CategoryRepositoryImpl } from "../../infrastructure/repositories/category.repository.";
import { CategoryController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { IsValidMongoId } from "../middlewares/mongoId.middleware";


export class CategoryRoutes{

    static get routes():Router{

        const router = Router();

        const dataSource = new CategoryDataSourceImp();
        const categoryRepository =  new CategoryRepositoryImpl(dataSource);

        const controller = new CategoryController(categoryRepository);

        router.post('/',AuthMiddleware.validateJwt,controller.createCategory);
        router.get('/',controller.getCategories);
        router.get('/:id',IsValidMongoId.checkId,controller.getCategoryById);
        router.delete('/:id',[AuthMiddleware.validateJwt,IsValidMongoId.checkId],controller.deleteCategory);
        router.put('/:id',[AuthMiddleware.validateJwt, IsValidMongoId.checkId],controller.updateCategory);


        return router;
    }

}