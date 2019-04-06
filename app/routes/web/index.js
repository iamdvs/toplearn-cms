const express=require('express');
const router=express.Router();




router.get('/',function(req,res){
    res.render('index');
})

router.get('/register' ,function(req,res){
    res.render('auth/register')
})



module.exports=router;