import express from 'express';
import { protect } from '../middleware/auth';
import User from '../models/User';

const router=express.Router();

//Logged in User info
router.get('/profile',protect,async(req,res)=>{
    try{
        const user=await User.findById(req.user!.id).select('-password');
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        res.json(user);
    }
    catch(err){
        res.status(500).json({message:'Server error'});
    }
}
)

export default router;