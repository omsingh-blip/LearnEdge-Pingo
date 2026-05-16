import jwt from "jsonwebtoken";

import User from "../models/User.js";

const authMiddleware =
async (
req,
res,
next
)=>{

try{

const authHeader=
req.headers.authorization;

if(

!authHeader ||

!authHeader.startsWith(
"Bearer "
)

){

return res.status(401).json({

success:false,

msg:"No token provided"

});

}

const token=
authHeader.split(
" "
)[1];

const decoded=
jwt.verify(

token,
process.env.JWT_SECRET

);

const user=
await User.findById(
decoded.id
)
.select(
"-password"
);

if(!user){

return res.status(404).json({

success:false,

msg:"User not found"

});

}

req.user={

id:user._id,

name:user.name,

email:user.email,

role:user.role

};

next();

}

catch(error){

if(

error.name===

"TokenExpiredError"

){

return res.status(401).json({

success:false,

msg:"Token expired"

});

}

return res.status(401).json({

success:false,

msg:"Invalid token"

});

}

};

export default authMiddleware;