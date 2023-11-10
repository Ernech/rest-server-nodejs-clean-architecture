import { Validators } from "../../../config";


export class LoginUserDto{

    constructor(
        public readonly email:string,
        public readonly password:string
    ){}


    static create(object:{[key:string]:any}):[string?, LoginUserDto?]{

        const {email,password} = object;

        if(!email) return ['Missing email'];
        if(!Validators.email.test(email)) return ['Invalid email'];
        if(!password) return ['Missing password'];

        return['', new LoginUserDto(email,password)]
        
    
    }


}