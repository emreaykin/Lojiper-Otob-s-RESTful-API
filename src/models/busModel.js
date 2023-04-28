import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
    bus_plate:{
        type:String,
        required:true
    },
    bus_seats:{
        type:Number,
        required:true
    },
    bus_empty_seats:{
        type:[Number],
        required:true,
        default:[]
    }
   
})

const busModel = mongoose.model("buses",busSchema);

export default busModel;