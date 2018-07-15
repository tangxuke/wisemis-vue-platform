<template>
    <div id="root" style="width:500px">
        <Form>
            <FormItem label="架构名称">
                <Input v-model="name" @on-change="typing" placeholder="架构名称" />
            </FormItem>
            <FormItem label="集合名称">
                <Input v-model="collname" placeholder="集合名称" />
            </FormItem>
            <Table width="50%" height="300" border :columns="columns" :data="data">
                <template slot="header">
                    <Button type="success" style="margin:5px;" @click="create">添加字段</Button>
                </template>
            </Table>
            <Button type="primary" style="margin:10px;" @click="save">保存</Button>
        </Form>
        <Modal v-model="showModal" @on-ok="ok" @on-cancel="cancel" @on-visible-change="visibleChange">
            <Form>
                <FormItem label="字段名称">
                    <Input v-model="field.name" ref="fieldname" placeholder="字段名称"/>
                </FormItem>
                <FormItem label="数据类型">
                    <Select v-model="field.type" placeholder="数据类型">
                        <Option value="string">string</Option>
                        <Option value="number">number</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data:function(){
        return {
            showModal:false,
            field:{
                name:'',
                type:'string',
                index:-1
            },
            name:'',
            collname:'',
            data:[],
            columns:[
                {
                    type:'index',
                    title:'行号',
                    width:60,
                    align:'center'
                },
                {
                    key:'name',
                    title:'字段名'
                },
                {
                    key:'type',
                    title:'类型'
                },
                {
                    title:'Action',
                    align:'center',
                    width:120,
                    render:(h,params)=>{
                        return h('div',
                        [
                            h('Button',{
                                props:{
                                    type:'primary',
                                    size:'small'
                                },
                                style:{
                                    'margin-right':'3px'
                                },
                                on:{
                                    click:()=>{
                                        this.modify(params.index);
                                    }
                                }
                            },'修改'),
                            h('Button',{
                                props:{
                                    type:'dashed',
                                    size:'small'
                                },
                                on:{
                                    click:()=>{
                                        this.delete(params.index);
                                    }
                                }
                            },'删除')
                        ])
                    }
                }
            ]
        }
    },
    methods:{
        visibleChange:function(visible){
            if(visible)
            {
               setTimeout(()=>{
                    this.$refs.fieldname.focus();
               },200) 
            }  
        },
        create:function(){
            this.field.index=-1;
            this.field.name='';
            this.field.type='string';
            this.showModal=true;
        },
        modify:function(index){
            this.field.index=index;
            this.field.name=this.data[index].name;
            this.field.type=this.data[index].type;
            this.showModal=true;
        },
        delete:function(index){
            this.data.splice(index,1);
        },
        ok:function(){
            if(this.field.index==-1)
                this.data.push({name:this.field.name,type:this.field.type});
            else{
                this.data[this.field.index].name=this.field.name;
                this.data[this.field.index].type=this.field.type;
            }
        },
        cancel:function(){
            
        },
        save:function(){
            //验证表单
            if(!this.name || !this.collname)
            {
                this.$Modal.info({title:'系统提示',content:'资料填写不完整！'});
                return;
            }
            if(!this.data.length)
            {
                this.$Modal.info({title:'系统提示',content:'至少要包含一个字段！'});
                return;
            }
            //save
            var schama=new Object();           
            this.data.forEach((value)=>{
                schama[value.name]=value.type;
            })
            var model={
                name:this.name,
                collname:this.collname,
                schama:schama
            }
            axios.post('http://localhost:3000/model/Schama/new',model)
                .then((value)=>{
                    if(value.data.success)
                    {
                        this.$Modal.success({title:'系统提示',content:'创建架构成功！'});
                        this.name="";
                        this.collname="";
                        this.data=[];
                    }
                    else
                        this.$Modal.error({title:'系统提示',content:'创建架构失败！原因：'+value.data.message});
                })
                .catch((err)=>{
                    this.$Modal.error({title:'系统提示',content:'创建架构失败！原因：'+err.message});
                })
        },
        typing:function(){
            if(this.name.endsWith('s'))
                this.collname=this.name.toLowerCase();
            else
                this.collname=this.name.toLowerCase()+'s';
            if(this.name.length==0)
                this.collname='';
        }
    }
}
</script>
