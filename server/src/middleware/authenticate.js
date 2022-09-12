// const jwt = require("jsonwebtoken");
// const enrollModel = require("../model/enrollModel");


// const authenticate = async (req,res,next) => {
//     try{
//         console.log('inside Authenticate');
//         const token = req.cookies.user;
          
//         const decode = jwt.verify(JSON.parse(token).token, process.env.SECRET_KEY);

//         const user = await enrollModel.findById({_id:decode._id});
//         // console.log(user);
//         req.user = user;
//         req.token = token;

//         next();
//     }catch(err){
//         if(err.name == 'TokenExpiredError'){
//         res.status(401).send("Token Expired");
//         }else{
//             res.status(401).send("Authentication failed");
//         }
//     }
// }

// module.exports = authenticate;