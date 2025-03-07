import mongoose from "mongoose";

const DataSchema= mongoose.Schema({
    date: {
        type:String,
        trim:true
    },
    trade_code: {
        type:String,
        trim:true
    },
    high: {
        type:String,
        trim:true
    },
    low: {
        type:String,
        trim:true
    },
    open: {
        type:String,
        trim:true
    },
    close: {
        type:String,
        trim:true
    },
    volume: {
        type:String,
        trim:true
    },
   

}, {timestamps: true, versionKey: false});

const TradeModel=mongoose.model('trades', DataSchema);

export default TradeModel;