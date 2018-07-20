<template>
    <div id="root">
        <Modal v-model="modal1" :title="'修改密码 - '+username" ref="modal2">
            <Form :labelWidth="80">
                <FormItem label="旧密码">
                    <Input type="password" autofocus ref="pass0" clearable icon="key" v-model="password0" placeholder="旧密码"/>
                </FormItem>
                <FormItem label="密码">
                    <Input type="password" autofocus ref="pass1" clearable icon="key" v-model="password1" placeholder="密码"/>
                </FormItem>
                <FormItem label="确认密码">
                    <Input type="password" clearable icon="key" v-model="password2" placeholder="确认密码"/>
                </FormItem>
           </Form>
            <div slot="footer">
                <Button type="primary" @click="ok">修改密码</Button>
            </div> 
            
        </Modal>
    </div>
</template>

<script>

export default {
    data:function(){
        return {
            password0:'',
            password1:'',
            password2:'',
            modal1:false
        }
    },
    methods:{
        ok:function(){
            //this.$refs.modal2.close();
            if(!this.password1 || !this.password2 || this.password1!==this.password2){
                this.$Modal.warning({content:'密码不能为空，或者输入不符！',title:'系统提示',onOk:()=>{
                    this.password1=''
                    this.password2=''
                }});
                
                return;
            }
            //修改密码
            this.$http.post('http://localhost:3000/users/change-pass',{'username':this.username,'old-password':this.password0,'new-password':this.password1})
                .then((value)=>{
                    if(value.data.success){
                        this.$Modal.info({
                            title:'系统提示'
                            ,content:'修改密码成功！'
                            ,onOk:()=>{
                                this.cancel();
                            }
                        })
                    }else{
                        this.$Modal.error({title:'修改密码失败',content:value.data.message})
                    }
                }).catch(error=>{
                    this.$Modal.error({title:'修改密码失败',content:error.message})
                })
        },
        cancel:function(){
            this.$refs.modal2.close();
        }
    },
    computed:{
        username:function(){
            return this.$store.state.app.username
        }
    },
    mounted:function(){
        this.modal1=true
    },
    watch:{
        '$route':(to,from)=>{
            this.modal1=true
        }
    }
}
</script>
