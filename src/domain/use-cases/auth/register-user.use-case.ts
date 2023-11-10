import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserToken{
    token:string;
    user:{
        id:string;
        name: string;
        email:string;
    }
}

type SignToken = (payload: Object, duration?: string)=> Promise<string | null>;

interface RegisterUserCase{

     execute(registerUserDto:RegisterUserDto):Promise<UserToken>;

}


export class ResgisterUser implements RegisterUserCase{

    constructor(
        private readonly authRepository:AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
        ){}


    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
        
        const user = await this.authRepository.register(registerUserDto);

        const token = await this.signToken({userId:user.id, roles:user.roles})
      
        if(!token) throw CustomError.internalServer('Error generating token')

        return {
            token,
            user:{
                id: user.id,
                name: user.name,
                email: user.email
            }
        }

    }

    
}

