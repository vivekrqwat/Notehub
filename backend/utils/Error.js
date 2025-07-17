
const error=(res,statusid,message )=>{
    return res.status(statusid).json({error:message});


}

const response=(res,statusid,message )=>{
    return res.status(statusid).json(message);


}
module.exports={error,response}