import express from 'express';
import { getEntries } from '../services/diaryService';
const diaryRouter=express.Router();


diaryRouter.get('/',(_req,res)=>{

    res.send(getEntries());
});

diaryRouter.post('/',(_req,res)=>{
    res.send('saving a diary')
});

export default diaryRouter;