<template>
    <Form>
        <FormItem label="菜单名：">
            <Input v-model="name" placeholder="菜单名"/>
        </FormItem>
        <FormItem label="标题：">
            <Input v-model="title" placeholder="标题"/>
        </FormItem>
        <FormItem label="路径：">
            <Input v-model="path" placeholder="路径"/>
        </FormItem>
        <FormItem label="图标：">
            <Input v-model="icon" placeholder="图标"/>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit">Submit</Button>
            <Button type="ghost" style="margin-left: 8px">Cancel</Button>
        </FormItem>
    </Form>
</template>

<script>
import axios from 'axios'

export default {
    data:()=>{
        return {
                name:'',
                title:'',
                path:'',
                icon:''
        }
    },
    methods:{
        handleSubmit:function(){
            var body={
                name:this.name,
                title:this.title,
                path:this.path,
                icon:this.icon,
                children:[]
            }
            axios({
                method: 'post',
                url: 'http://localhost:3000/menu/add',
                data: body
            }).then((res)=>{
                    if(res.data.success)
                        alert('添加菜单成功！')
                    else
                        alert('添加菜单失败！')
                })
                .catch((err)=>{
                    alert('发生异常：'+res.data.message)
                })
            //this.clear()
        },
        clear:function(){
            this.name=''
            this.title=''
            this.path=''
            this.icon=''
        }
    }
}
</script>
