import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    login:{
        type:Boolean,
        default:false
    },
    tickets:[{
        time:{
            type:String,
            required:true
        },
        route :{
            type:String,
            required:true
        },
        vehicle: {
            type: String,
            required: true
        },
        seat_number:{
            type:String,
            required:true
        }
    }],
    default: []
});


const userModel = mongoose.model("users",userSchema);

export default userModel;