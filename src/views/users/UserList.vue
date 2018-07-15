<template>
    <div id="root">
        <h1>用户列表</h1>
        <Table width="80%" height="400" border :columns="columns1" closable="false" maskClosable="false" :data="userList"></Table>
        <Modal v-model="modal1" :title="'修改密码 - '+username" @on-ok="ok" @on-cancel="cancel" ref="modal2">
            <Form>
                <FormItem label="密码">
                    <Input type="password" clearable icon="key" v-model="password1" placeholder="密码"/>
                </FormItem>
                <FormItem label="确认密码">
                    <Input type="password" clearable icon="key" v-model="password2" placeholder="确认密码"/>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="test">修改密码</Button>
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
        test:function(){
            //this.$refs.modal2.close();
        },
        ok:function(){
            
        },
        cancel:function(){

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
