<template>
    <div id="root">
        <h1>用户列表</h1>
        <Table width="80%" height="400" border :columns="columns1" :data="userList"></Table>
        <Modal v-model="modal1" :title="'修改密码 - '+username" @on-ok="ok" @on-cancel="cancel" ref="modal2">
            <Form>
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
import axios from 'axios'

export default {
    data:function(){
        return {
            password1:'',
            password2:'',
            username:'',
            modal1:false,
            userList:[],
            columns1:[
                {
                    title:'用户名',
                    key:'username',
                    width:150
                },
                {
                    title:'Action',
                    key:'username',
                    width:150,
                    render:(h,params)=>{
                        return h('div',[
                            h('Button',
                            {
                                props:{
                                    type:'primary',
                                    size:'small'
                                },
                                on:{
                                    click:()=>{
                                        this.username=this.userList[params.index].username;
                                        this.modal1=true;
                                    }
                                }
                            }
                            ,'改密码'),
                            h('Button',
                            {
                                props:{
                                    type:'error',
                                    size:'small'
                                },
                                style:{
                                    'margin-left':'5px'
                                },
                                on:{

                                }
                            }
                            ,'删用户')
                        ])
                    }
                }
            ]
        }
    },
    methods:{
        ok:function(){
            //this.$refs.modal2.close();
            if(!this.password1 || !this.password2 || this.password1!==this.password2){
                this.$Modal.warning({content:'密码不能为空，或者输入不符！',title:'系统提示',onOk:this.clear});
                
                return;
            }
            //修改密码
            //关闭
            this.clear();
            this.$refs.modal2.close();
        },
        clear:function(){
            this.password1='';
            this.password2='';
            this.$refs.pass1.focus();
        },
        cancel:function(){
            this.$refs.modal2.close();
        },
        getUsers:function(){
            axios.get('http://localhost:3000/users')
                .then((value)=>{
                    if(value.data.success)
                        this.userList=value.data.result;
                    else
                        this.$Modal.info({content:'获取用户列表失败！原因：'+value.data.message});
                })
                .catch((error)=>{
                    this.$Modal.info({content:'获取用户列表失败！原因：'+error.message});
                })
        }
    },
    mounted:function(){
        this.getUsers();
    }
}
</script>
