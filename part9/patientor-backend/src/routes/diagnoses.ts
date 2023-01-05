import express from 'express'

const diagnoseRouter=express.Router();


diagnoseRouter.get('/',(_req,res)=>{
    res.send('fetching all diagnose');
});

export default diagnoseRouter;



