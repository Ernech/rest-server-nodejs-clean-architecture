import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos/auth/login-user.dto"
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository"

interface TokenResp{
    token:string
}

interface LoginUseCase{

    execute(loginUserDto:LoginUserDto):Promise<TokenResp>


}

type SignToken = (payload: Object, duration?: string)=> Promise<string | null>;


export class LoginUser implements LoginUseCase{
    
    constructor(
        private readonly authRepository:AuthRepository,
        private readonly signToken:SignToken = JwtAdapter.generateToken
    ){}

    async execute(loginUserDto: LoginUserDto): Promise<TokenResp> {
        
        const user = await this.authRepository.login(loginUserDto);

        const token = await this.signToken({userId:user.id, roles:user.roles},'2h');

        if(!token) throw CustomError.internalServer('There was an error generating the token')

        return{token}

    }

    



}

