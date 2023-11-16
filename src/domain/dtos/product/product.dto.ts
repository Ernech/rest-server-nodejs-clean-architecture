

export class ProductDTO{

    constructor(
        public readonly name:string,
        public readonly description:string,
        public readonly categoryId:string,
        public readonly userId:string
     ){}

    static create(object:{[key:string]:any}):[string?,ProductDTO?]{
        const {name,description,categoryId, userId}= object;

        if(!name) return ['Name is required', undefined];
        if(!description) return ['dDscription is required', undefined];
        if(!categoryId) return ['CategoryId is required', undefined];
        if(!userId) return ['UserId is required', undefined];

        return [undefined, new ProductDTO(name,description,categoryId, userId)];

    }
        


}