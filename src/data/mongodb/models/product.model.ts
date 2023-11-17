import mongoose , {Schema} from "mongoose";

const productSchema = new Schema({

    name:{
        type:String,
        required:[true,'Name is required']
    },

    description:{
        type: String,
        required: [true, 'Description is required']
    },
    available:{
        type: Boolean,
        default:true,
    },

    img:{
        type:String
    },
    status:{
        type:Boolean,
        default:true
    },

    category:{
        type: Schema.Types.ObjectId,
        ref:'Category',
        required:true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }


});


productSchema.methods.toJSON = function(){
    const {__v,status,...data} = this.toObject();
    
    return data;
}

export const ProductModel = mongoose.model('Product',productSchema);


