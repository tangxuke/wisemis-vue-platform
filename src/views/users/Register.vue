<template>
    <div id="root">
        <Form>
            <h1>用户注册</h1>
            <FormItem label="用户名">
                <Input clearable v-model="userName" placeholder="用户名" icon="person"/>
            </FormItem>
            <FormItem label="密码">
                <Input type="password" clearable v-model="password" placeholder="密码" icon="key"/>
            </FormItem>
            <FormItem label="确认密码">
                <Input type="password" clearable v-model="password1" placeholder="确认密码"/>
            </FormItem>
            <Button type="primary" @click="submit">注册</Button>
        </Form>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data:function(){
        return {
            userName:'',
            password:'',
            password1:''
        }
    },
    methods:{
        submit:function(){
            //用户名和密码不能为空
            if(!this.userName || !this.password){
                this.$Modal.info({
                    content:'用户名和密码不能为空！'
                })
                return
            }
            //密码和确认密码必须一致
            if(this.password!=this.password1){
                this.$Modal.info({
                    content:'密码输入不符！'
                })
                return
            }
            //将密码转换成md5码，后续
            //提交到后台
            var body={
                'username':this.userName,
                'password':this.password
            }
            axios.post('http://localhost:3000/users/add',body)
                .then((res)=>{
                    if(res.data.success){
                        this.$Modal.success({content:'注册成功！',onOk:()=>this.$router.push('/users')})
                    }else{
                        this.$Modal.error({content:'注册失败！原因：'+res.data.message})
                    }
                }).catch((err)=>{
                    this.$Modal.error({content:'注册失败！原因：'+err.message})
                })
        }
    }
}
</script>