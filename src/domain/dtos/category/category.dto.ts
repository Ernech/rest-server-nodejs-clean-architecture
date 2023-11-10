

export class CategoryDTO{

    constructor(
        public readonly name:string,
      
    ){}

    static create(object:{[key:string]:any}):[string?,CategoryDTO?]{

        const { name } = object;

        if(!name) return['Name is required',undefined];

        return[undefined, new CategoryDTO(name)];


    }


}