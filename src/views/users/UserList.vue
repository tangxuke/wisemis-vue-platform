<template>
    <div id="root">
        <h1>用户列表</h1>
        <Table width="80%" height="400" border :columns="columns1" :data="userList">
            <div style="padding:0 0 5px 5px;" slot="header">
                <Button type="success" @click="$router.push('/register')">注册用户</Button>
            </div>
        </Table>
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
                                        this.username=params.row.username;
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
                                    click:()=>{
                                        this.remove(params.row.username)
                                    }
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
            axios.post('http://localhost:3000/users/change-pass-admin',{'username':this.username,'password':this.password1})
                .then((value)=>{
                    if(value.data.success){
                        this.$Modal.info({
                            title:'系统提示'
                            ,content:'修改密码成功！'
                            ,onOk:()=>{
                                this.clear();
                                this.cancel();
                            }
                        })
                    }
                })
        },
        remove:function(username){
            this.$Modal.confirm({
                title:'删除提示',
                content:`你真的要删除用户[${username}]吗？`,
                onOk:()=>{
                    axios.post('http://localhost:3000/users/del-user',{'username':username})
                        .then((value)=>{
                            if(value.data.success){
                                setTimeout(()=>{
                                    this.$Modal.info({title:'删除提示',content:'删除用户成功！'})
                                    this.getUsers()
                                },500)
                            }else{
                                setTimeout(()=>{
                                    this.$Modal.error({title:'删除提示',content:'删除用户失败！原因：'+value.data.message})
                                },500)
                            }
                        }).catch((error)=>{
                            setTimeout(()=>{
                                this.$Modal.error({title:'删除提示',content:'删除用户失败！原因：'+error.message})
                            },500)
                        })
                }
            })
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
