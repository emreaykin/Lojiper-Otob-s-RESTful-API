import mongoose from "mongoose";


const routeSchema = new mongoose.Schema({

 route_name:{
    type:String,
    required:true
 },
 route_time:{
    type:String,
    required:true
 },
 route_bus:{
    type:String,
    required:true
 }
})

const routeModel = mongoose.model("routes",routeSchema);

export default routeModel;