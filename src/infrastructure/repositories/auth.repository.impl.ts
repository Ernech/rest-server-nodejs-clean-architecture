import { AuthDatasource, AuthRepository, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";



export class AuthRepositoryImpl implements AuthRepository{

    constructor(
        private readonly authDataSource:AuthDatasource
    ){}
    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.authDataSource.login(loginUserDto);
    }
    
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDataSource.register(registerUserDto);
    }

}