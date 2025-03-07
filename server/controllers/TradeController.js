import TradeModel from '../models/TradeModel.js';

export const CreateTrade=async(req,res)=>{
   try{
    const {date,trade_code,high,low,open, close, volume}= req.body
    if(!date || !trade_code || !high || !low || !open || !close || !volume){
      return res.status(400).json({status:'fail',message: 'Please fill all field'})
    }
    
    const data= await TradeModel.create({ date,trade_code,high,low,open, close, volume });
    return res.status(200).json({status:'success',message: ' Successful',data:data})
   
   }catch(error){
       console.log(error)
       res.status(500).json({status:'fail',message: 'Internal server error'})
   }

}

export const UpdateTrade=async(req,res)=>{
    try{
     const reqBody= req.body;
     const id=req.params.id;
         
     await TradeModel.updateOne({_id:id},{ $set: reqBody },);
     return res.status(200).json({status:'success',message: ' Successful'})
    
    }catch(error){
        console.log(error)
        res.status(500).json({status:'fail',message: 'Internal server error'})
    }
 
 }

 export const ReadTradeData=async(req,res)=>{
    try{
     const id=req.params.id;
         
     const data= await TradeModel.findOne({_id:id});
     return res.status(200).json({status:'success',message: ' Successful',data:data})
    
    }catch(error){
        console.log(error)
        res.status(500).json({status:'fail',message: 'Internal server error'})
    }
 
 }


 export const ReadAllTrade=async(req,res)=>{
    try{    
         
     const data= await TradeModel.find({}).sort({ date: -1 });;
     return res.status(200).json({status:'success',message: ' Successful',data:data})
    
    }catch(error){
        console.log(error)
        res.status(500).json({status:'fail',message: 'Internal server error'})
    }
 
 }
 

 export const DeleteTask=async(req,res)=>{
    try{
     
     const id=req.params.id;
         
     await TradeModel.deleteOne({_id:id});
     return res.status(200).json({status:'success',message: ' Successful'})
    
    }catch(error){
        console.log(error)
        res.status(500).json({status:'fail',message: 'Internal server error'})
    }
 
 }