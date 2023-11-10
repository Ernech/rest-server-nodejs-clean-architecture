import mongoose from "mongoose";

interface Options{
    mongoUrl:string;
    dbName:string;
}

export class MongoDatabase{

    static async connect(options:Options){
        try {
           await mongoose.connect(options.mongoUrl,{
                dbName:options.dbName
            });
            console.log('DB conected');  
        } catch (error) {
            console.log('Mongo connection error');
            throw Error;
        }
    }


}