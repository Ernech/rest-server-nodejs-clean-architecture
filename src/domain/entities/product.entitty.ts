export class ProductEntity{

    constructor(
        public id:string,
        public readonly name:string,
        public readonly description:string,
        public readonly available:boolean,
        public readonly category:string,
        public readonly user:string
    ){}
    
}