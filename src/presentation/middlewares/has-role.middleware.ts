import { Request, Response, NextFunction } from "express"

export class CheckRoles{
    
    static hasRole =(roles:string[])=>{
    
        return(req:Request, res:Response, next:NextFunction)=>{
    
    
            const {user} = req.body;

            
            for(const role of user.roles){
                if(roles.includes(role)){
                    next();
                    return;
                }
            }

            res.status(403).json({error:'You do not have permission to access to this resource'});
    
        }

}


}