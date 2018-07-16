<template>
    <div id="root">
        <p>这是模板展示页面：{{$route.params.model}}</p>
        <hr/>
        <Table  :columns="columns" :data="data">
            <template slot="header">
                <div>
                    <Button type="success" style="margin-left:5px" @click="showDialog=true">新建</Button>
                </div>
            </template>
        </Table>
        <Modal v-model="showDialog" @on-ok="ok">
            <Form>
                <template v-for="column in data_columns">
                    <FormItem :label="column.name" :key="column.name">
                        <Input v-model="obj[column.name]"/>
                    </FormItem>

                </template>
            </Form>
        </Modal>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    data(){
        return {
            showDialog:false,
            name:'',
            obj:new Object(),
            columns:[{type:'index',title:'#',width:50}],
            data_columns:[],
            data:[]
        }
    },
    computed:{
        actionColumn:()=>{
            return {
                title:'操作',
                width:160,
                fixed:'right',
                align:'center',
                render:(h,params)=>{
                    return h('div',[
                        h('Button',{
                            props:{
                                type:'text',
                                size:'small'
                            },
                            style:{
                                'margin-right':'3px'
                            }
                        },'Edit/View'),
                        h('Button',{
                            props:{
                                type:'text',
                                size:'small'
                            }
                        },'Delete')
                    ])
                }
            }
        }
    },
    methods:{
        ok:function(){
            axios.post(`http://localhost:3000/custom-model/${this.name}/new`,this.obj)
            .then((value)=>{
                if(value.data.success){
                    this.$Modal.success({title:'系统提示',content:'保存数据成功'})
                    this.fetchData()
                }
                else
                    this.$Modal.error({title:'系统提示',content:'保存数据失败：'+value.data.message})
            })
        },
        fetchData:function(){
            axios.get(`http://localhost:3000/custom-model/${this.name}`)
                .then((res)=>{
                    if(res.data.success)
                        this.data=res.data.result
                    else
                        this.$Modal.info({title:'系统提示',content:res.data.message})
                })
        },
        readModel:function(){
            axios.get(`http://localhost:3000/model/find/${this.name}`)
                .then((val)=>{
                    if(val.data.success){
                        var schama=val.data.result.schama
                        Object.keys(schama).forEach((item)=>{
                            this.columns.push({
                                key:item,
                                title:item
                            })
                            this.data_columns.push({name:item,type:schama[item]})
                            this.obj[item]=null
                        })
                        /this.columns.push(this.actionColumn)
                        this.fetchData()
                    }else{
                        this.$Modal.info({title:'系统提示',content:val.data.message})
                    }
                    
                })
                .catch((err)=>{
                    this.$Modal.info({title:'系统提示',content:err.message})
                })
        }
    },
    mounted:function(){
        this.name=this.$route.params.model;
        this.readModel();
    }
}
</script>
