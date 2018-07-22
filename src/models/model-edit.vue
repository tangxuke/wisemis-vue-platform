<template>
    <div id="root">
        <Row>
            <Col span="8">
                <Form>
                    <FormItem label="架构名称">
                        <Input v-model="name" disabled="true" @on-change="typing" placeholder="架构名称" />
                    </FormItem>
                    <FormItem label="集合名称">
                        <Input v-model="collname" disabled="true" placeholder="集合名称" />
                    </FormItem>
                    
                    <Button type="primary" style="margin:10px;" @click="save">保存</Button>
                    <Button type="ghost" style="margin:10px;" @click="goback">返回</Button>
                </Form>
            </Col>
            <Col span="14" offset="1">
                <Table border :columns="columns" :data="data">
                    <template slot="header">
                        <Button type="success" style="margin:5px;" @click="create">添加字段</Button>
                    </template>
                </Table>
            </Col>
        </Row>
        
        <Modal v-model="showModal" @on-ok="ok" @on-cancel="cancel" @on-visible-change="visibleChange">
            <Form :labelWidth="100">
                <FormItem label="字段名称">
                    <Input v-model="field.name" ref="fieldname" placeholder="字段名称"/>
                </FormItem>
                <FormItem label="字段标题">
                    <Input v-model="field.title" placeholder="字段标题"/>
                </FormItem>

                <FormItem label="数据类型">
                    <Select v-model="field.type" placeholder="数据类型">
                        <template v-for="type in schama_types">
                            <Option :value="type" :key="type">{{type}}</Option>
                        </template>
                    </Select>
                </FormItem>
                <FormItem label="字段长度">
                    <Input v-model="field.length" placeholder="字段长度"/>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import schama_types from '@/util/schama_types'
export default {
    data:function(){
        return {
            schama_types:schama_types,
            showModal:false,
            field:{
                name:'',
                title:'',
                length:80,
                type:schama_types[0],
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
                    title:'字段名',
                    width:90
                },
                {
                    key:'title',
                    title:'标题',
                    width:90
                },
                {
                    key:'type',
                    title:'类型',
                    width:90
                },
                {
                    key:'length',
                    title:'长度',
                    width:80
                },
                {
                    title:'Action',
                    align:'center',
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
        goback:function(){
            this.$router.push('/model-list')
        },
        visibleChange:function(visible){
            if(visible)
            {
               setTimeout(()=>{
                    this.$refs.fieldname.focus();
               },200) 
            }  
        },
        create:function(){
            this.showModal=true;
            this.field.index=-1;
            this.field.name='';
            this.field.title='';
            this.field.length=80
            this.field.type=schama_types[0];
        },
        modify:function(index){
            this.field.index=index;
            this.field.name=this.data[index].name;
            this.field.title=this.data[index].title;
            this.field.length=this.data[index].length;
            this.field.type=this.data[index].type;
            this.showModal=true;
        },
        delete:function(index){
            this.data.splice(index,1);
        },
        findItem:function(){
            if(this.data.findIndex((item)=>{
                return item.name==this.field.name
            })>-1)
                return true
            else
                return false
        },
        showMessage:function(message){
            this.$Modal.info({title:'系统提示',content:message});
        },
        ok:function(){
            let item={
                name:this.field.name,
                title:this.field.title,
                type:this.field.type,
                length:this.field.length
            }
            if(this.field.index==-1)
            {
                if(this.findItem())
                {
                    this.showMessage('字段已存在！');
                    return;
                }
                this.data.push(item);
            }
            else
            {
                if(this.data[this.field.index].name!=this.field.name)
                {
                    if(this.findItem())
                    {
                        this.showMessage('字段已存在！');
                        return;
                    }
                }
                this.data[this.field.index]=item;
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
            var model={
                name:this.name,
                collname:this.collname,
                schama:this.data
            }
            this.$http.post('http://localhost:3000/model/edit',model)
                .then((value)=>{
                    if(value.data.success)
                    {
                        this.$Modal.success({title:'系统提示',content:'修改架构成功！<br/>请重新启动Node.js服务器使修改生效！',onOk:()=>this.$router.push('/model-list')});
                    }
                    else
                        this.$Modal.error({title:'系统提示',content:'修改架构失败！原因：'+value.data.message});
                })
                .catch((err)=>{
                    this.$Modal.error({title:'系统提示',content:'修改架构失败！原因：'+err.message});
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
    },
    mounted:function(){
        this.name=this.$route.params.name;
        this.$http.get('http://localhost:3000/model/find/'+this.name)
            .then((value)=>{
                if(value.data.success)
                {
                    this.collname=value.data.result.collname;
                    this.data.push(...value.data.result.schama)
                }
                else
                {
                    this.$Modal.info({title:'系统提示',content:value.data.message,onOk:()=>this.$router.push('/model-list')})
                }
            })
    }
}
</script>
