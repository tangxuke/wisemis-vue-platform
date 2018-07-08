var express = require('express');
var router = express.Router();

//获取菜单列表
router.get('/',function(req,res,next){
    res.send(
        [
            {
                path:'/',
                name:'root',
                icon:'key',
                title:'根目录',
                children:[
                    {
                        name:'about',
                        path:'/about',
                        title:'子菜单1'
                    }
                ]
            }
        ]
    )
})

module.exports=router