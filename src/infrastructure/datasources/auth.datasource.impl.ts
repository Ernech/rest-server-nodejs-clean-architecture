import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { UserMapper } from "../mappers/user.mapper";

type hashFunction = (password: string) => string;
type compareFunction = (password: string, hashed: string) => boolean;

export class AuthDataSourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: hashFunction = BcryptAdapter.hash,
        private readonly compareFunction: compareFunction = BcryptAdapter.compare
    ) { }
    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {

        const { email, password } = loginUserDto;
        try {

            const user = await UserModel.findOne({ email });

            if (!user) throw CustomError.notFound('Invalid credentials');

            const result = this.compareFunction(password, user.password);

            if (!result) throw CustomError.badRequest('Wrong credentials');

            return UserMapper.userEntityFromObject(user);

        } catch (error) {
            if (error instanceof CustomError) {
                throw error
            }
            throw CustomError.internalServer();
         }
    }


    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const { name, email, password } = registerUserDto;

        try {

            const exists = await UserModel.findOne({ email });
            if (exists) throw CustomError.badRequest('User already exitst');

            const user = await UserModel.create({
                name,
                email,
                password: this.hashPassword(password)
            });

            await user.save();


            return UserMapper.userEntityFromObject(user);


        } catch (error) {
            if (error instanceof CustomError) {
                throw error
            }
            throw CustomError.internalServer();
        }
    }

}