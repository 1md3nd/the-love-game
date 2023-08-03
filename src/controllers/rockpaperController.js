
const startrpc=(req,res)=>{
        res.status(200).json({message:'game started',username:req.username});
};

module.exports=startrpc;