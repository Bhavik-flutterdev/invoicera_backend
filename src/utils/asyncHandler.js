const asyncHandler = (requestHandler)=>{
(req,res,next)=>{
    Promise.resolve(requestHandler(req,res,next)).catch((erorr)=>next(erorr));
}
};


export {asyncHandler}