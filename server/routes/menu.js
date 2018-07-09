var express=require('express')
var router = express.Router()
var Menu=require('../models/menu')

var response={
    success:false,
    message:'',
    result:null
}

//获取菜单列表
router.get('/',function(req,res,next){
    Menu.find({},(err,docs)=>{
        if(err){
            response.message=err.message
        }else{
            response.success=true
            response.result=docs
        }
        res.json(response)
    })
})

module.exports=router