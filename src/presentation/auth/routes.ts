import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes{

    static get routes(): Router{
        
        const router = Router();

        const dasource = new AuthDataSourceImpl();
        const authRepository = new AuthRepositoryImpl(dasource)

        const controller = new AuthController(authRepository);

        router.post('/login',controller.logginUser);
        router.post('/register',controller.registerUser);
        
        router.get('/', AuthMiddleware.validateJwt,controller.getUsers)

        return router;
    } 


}