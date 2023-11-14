import { Request, Response,NextFunction } from "express";
import {isValidObjectId} from 'mongoose'

export class IsValidMongoId{

    static checkId=(req:Request, res:Response,next: NextFunction)=>{
 
        const {id} = req.params;

        if(!isValidObjectId(id))  return res.status(400).json({msg:'Invalid mongo id'});

        next()


    }

}