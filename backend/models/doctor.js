//const mongoose = require('mongoose')
import mongoose, { model, Schema } from "mongoose";

const doctorSchema = mongoose.Schema({
    name:{
        type : String, required: true
    },
    designation :{
        type : String, required: true
    },
    opdfee :{
        type: Number , required: true
    },
    experience :{
        type: String , required: true
    },
    speciality:{
        type: String , required: true
    },
    hospital:{
        type: String , required: true
    },
    education:{
        type: String 
    },
    opdtiming:{
        type: String, required: true
    },
    imageurls:[],
    currentbookings :[],
    description:{
        type: String , required:true
    }
},{
    timestamps :true
})

export default model('doctor' , doctorSchema)


// const roomModel = mongoose.model('room' , roomSchema)
// module.exports = roomModel
