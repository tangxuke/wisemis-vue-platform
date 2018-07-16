<template>
    <Row>
        <Col span="12" offset="1">
            <Table height="500" :columns="columns" :data="data">
                <template slot="header">
                    模型列表
                </template>
                <template slot="footer">
                    <Button type="success" style="margin:10px" @click="$router.push('/model-new')">创建模型</Button>
                </template>
            </Table>
        </Col>
    </Row>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            columns:[
                {
                    type:'index',
                    title:'行号',
                    width:60
                },
                {
                    key:'name',
                    title:'架构名称'
                },
                {
                    key:'collname',
                    title:'集合名称'
                },
                {
                    title:'操作',
                    width:350,
                    render:(h,params)=>{
                        return h('div',[
                            h('Button',
                            {
                                class:{
                                    button:true
                                },
                                on:{
                                    click:()=>{
                                        this.view(params.index);
                                    }
                                }
                            },'View'),
                            h('Button',{
                                on:{
                                    click:()=>{
                                        this.delete(params.index)
                                    }
                                },
                                class:{
                                    button:true
                                }
                            },'Del'),
                            h('Button',{
                                class:{
                                    button:true
                                },
                                on:{
                                    click:()=>{
                                        this.$router.push(`/model-page/${params.row.name}`)
                                    }
                                }
                            },'Preview'),
                            h('Button',{
                                on:{
                                    click:()=>{
                                        this.$router.push(
                                            {
                                                name:'new-menu2'
                                                ,params:{
                                                    name:params.row.name
                                                    ,title:params.row.name
                                                    ,path:'/model-page/'+params.row.name
                                                }
                                            }
                                        )
                                    }
                                }
                            },'Add Menu')
                        ])
                    }
                }
            ],
            data:[]
        }
    },
    methods:{
        view(index){
            this.$router.push({name:'model-edit',params:{'name':this.data[index].name}})
            //this.$Modal.info({title:'查看架构',content:JSON.stringify(this.data[index].schama)})
        },
        delete(index){

            this.$Modal.confirm({title:'删除架构',content:'是否删除此架构？',onOk:()=>this.doDelete(index)})
        },
        doDelete(index){
            setTimeout(()=>{
                this.$Modal.info({title:'删除架构',content:'代码尚未实现'})
            },500)
        },
        getModels(){
            this.data=[]
            axios.get('http://localhost:3000/model').then((value)=>{
                if(value.data.success)
                    this.data=value.data.result;
                else
                    this.$Modal.error({title:'读取列表',content:'读取列表失败！原因：'+err.message})
            })
            .catch((err)=>{
                this.$Modal.error({title:'读取列表',content:'读取列表失败！原因：'+err.message})
            })
        }
    },
    mounted:function(){
        this.getModels()
    }
}
</script>
<style>
.button{
    margin-right: 3px;
}
</style>
