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
    bus_full_seats:{
        type: Map,
        of: String,
        default: {},
    }
   
})

const busModel = mongoose.model("buses",busSchema);

export default busModel;