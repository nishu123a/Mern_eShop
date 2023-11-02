const mongoose=require('mongoose');
const User=require("./user")

const {ObjectId}=mongoose.Schema

const ProductCartSchema=mongoose.Schema({
    product:{
        type:ObjectId, 
        ref:"Product"
    },
    name:{
        type:String,
        count:Number,
        price:Number
    }
})
const ProductCart=mongoose.model("ProductCart",ProductCartSchema);
const OrderSchema=new mongoose.Schema({
    products:[ProductCartSchema],
    transaction_id:{},
    amount:{
        type:Number
    },
    address:{
        type:String
    },
    //Enum
    status:{type:String,
        default:"",
        enum:["cancelled","Delivered","Shipped","Processing","Received"]
    },
    updated:Date,
    user:{
        type:ObjectId,
        ref:"User"
    }

},{timestamps:true}
);
const Order=mongoose.model("Order",OrderSchema);
module.exports={Order,ProductCart}