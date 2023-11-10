import mongoose, {Schema} from "mongoose"

const categorySchema = new Schema({

    name:{
        type:String,
        required: [true,'Name is required']
    },

    status:{
        type: Boolean,
        default:true
    },

    user:{
        type: Schema.Types.ObjectId,
        require:true,
        ref:'User'
    }
});

categorySchema.methods.toJSON = function(){
    const {__v,status,...data} = this.toObject();
    
    return data;
}

export const CategoryModel = mongoose.model('Category',categorySchema); 