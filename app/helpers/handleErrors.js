const httpError = (req,err)=>{
    res.status(500).send({message:"Internal Server Error"});
}

export default httpError;