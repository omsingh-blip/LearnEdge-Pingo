import mongoose from "mongoose";

const reviewSchema =
new mongoose.Schema({

user:{

type:
mongoose.Schema.Types.ObjectId,

ref:"User",

required:true

},

problem:{

type:String,

required:true,

trim:true

},

language:{

type:String,

default:"javascript"

},

code:{

type:String,

required:true

},

status:{

type:String,

enum:[
"Excellent",
"Good",
"Needs Improvement"
],

default:
"Needs Improvement"

},

earnedXp:{

type:Number,

default:0

},

feedback:{

bugs:[String],

optimization:[String],

readability:[String],

bestPractices:[String],

summary:String

}

},

{

timestamps:true

}

);

export default mongoose.model(
"Review",
reviewSchema
);