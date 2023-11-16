export class ProductEntity{

    constructor(
        public id:string,
        public readonly name:string,
        public readonly description:string,
        public readonly categoryId:string,
        public readonly userId:string
    ){}
    
}