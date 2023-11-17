

export class ProductDTO{

    constructor(
        public readonly name:string,
        public readonly description:string,
        public readonly category:string,
        public readonly user:string
     ){}

    static create(object:{[key:string]:any}):[string?,ProductDTO?]{
        const {name,description,category, user}= object;

        if(!name) return ['Name is required', undefined];
        if(!description) return ['dDscription is required', undefined];
        if(!category) return ['CategoryId is required', undefined];
        if(!user) return ['UserId is required', undefined];

        return [undefined, new ProductDTO(name,description,category, user)];

    }
        


}