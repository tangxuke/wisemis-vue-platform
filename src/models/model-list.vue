<template>
    <Row>
        <Col span="12" offset="6">
            <Table height="300" :columns="columns" :data="data">
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
                                }
                            },'Del')
                        ])
                    }
                }
            ],
            data:[{name:'test',collname:'test',schama:{name:'tangxuke',age:10}}]
        }
    },
    methods:{
        view(index){
            this.$Modal.info({title:'查看架构',content:JSON.stringify(this.data[index].schama)})
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
            axios.get('http://localhost:3000/model').then((value)=>{

            })
            .catch((err)=>{
                this.$Modal.info({title:'读取列表',content:'读取列表失败！原因：'+err.message})
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
