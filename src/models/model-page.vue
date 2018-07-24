<template>
    <div id="root">
        <p>这是模板展示页面：{{$route.params.model}}</p>
        <hr/>
        <Table :border="true"  :columns="columns" :data="data">
            <template slot="header">
                <div>
                    <Button type="success" style="margin-left:5px" @click="createNew">新建</Button>
                </div>
            </template>
        </Table>

        <Page :total="100" 
        :page-size="nPageSize"
        style="margin-top:10px;" 
        size="small" 
        @on-change="onPageChange">
        </Page> 

        <Modal v-model="showDialog" @on-ok="ok">
            <Form  :label-width="100">
                <Tabs :animated="false" :capture-focus="true">
                    <TabPane v-for="i in Math.ceil(data_columns.length/nItemCountForPage)" :key="'key'+i" :label="'第 '+i+' 页'">
                        <template v-for="column in data_columns.slice((i-1)*nItemCountForPage,(i-1)*nItemCountForPage+nItemCountForPage)">
                            <FormItem :label="column.title" :key="column.key">
                                <template v-if="column.type=='Boolean'">
                                    <Checkbox v-model="obj[column.key]"></Checkbox>
                                </template>
                                <template v-else>
                                    <Input v-model="obj[column.key]"/>
                                </template>
                            </FormItem>

                        </template>
                    </TabPane>
                
                </Tabs>
            </Form>
        </Modal>
    </div>
</template>


<script>

export default {
    data(){
        return {
            nPageSize:20,
            nItemCountForPage:10,
            showDialog:false,
            action:'new',   //new,edit,del
            name:'',
            _id:'',
            obj:new Object(),
            columns:[
                {type:'index',title:'#',width:50},
                {
                title:'操作',
                width:160,
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
                            },
                            on:{
                                click:()=>this.edit(params.row)
                            }
                        },'Edit'),
                        h('Button',{
                            props:{
                                type:'text',
                                size:'small'
                            },
                            on:{
                                click:()=>this.del(params.row._id)
                            }
                        },'Delete')
                    ])
                }
            }],
            data_columns:[],
            data:[]
        }
    },
    methods:{
        onPageChange:function(nPage){
            console.log(nPage)
        },
        init:function(){
            this.obj=new Object()
            this.columns=[{type:'index',title:'#',width:50},{
                title:'操作',
                width:160,
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
                            },
                            on:{
                                click:()=>this.edit(params.row)
                            }
                        },'Edit'),
                        h('Button',{
                            props:{
                                type:'text',
                                size:'small'
                            },
                            on:{
                                click:()=>this.del(params.row._id)
                            }
                        },'Delete')
                    ])
                }
            }]
            this.data_columns=[]
            this.data=[]
        },
        del:function(_id){
            this.$Modal.confirm({title:'删除提示',content:'你真的要删除此条记录吗？',onOk:()=>this.do_del(_id)})
        },
        do_del:function(_id){
            setTimeout(()=>{
                this.$http.post(`http://localhost:3000/custom-model/${this.name}/del`,{'_id':_id})
                .then((value)=>{
                    if(value.data.success){
                        this.$Modal.info({title:'系统提示',content:'删除记录成功！'})
                        this.fetchData()
                        this.clearData()
                    }
                    else
                        this.$Modal.error({title:'系统提示',content:'删除记录失败！原因：'+value.data.message})
                }).catch((error)=>{
                    this.$Modal.error({title:'系统提示',content:'删除记录失败！原因：'+error.message})
                })
            },500)
        },
        edit:function(row){
            for(var key in this.obj){
                this.obj[key]=row[key]
            }
            this._id=row._id
            this.action='edit'
            this.showDialog=true
        },
        clearData:function(){
            this.data_columns.forEach((item)=>{
                var def_value=''

                switch(item.type){
                    case 'Boolean':
                        def_value=false
                        break
                    case 'Number':
                        def_value=0
                        break
                    case 'Date':
                        def_value=new Date()
                        break
                    case 'String':
                        def_value=''
                        break
                    default:
                        def_value=null
                        break
                }

                this.obj[item.key]=def_value
            })
        },
        createNew:function(){
            
            this.clearData()
            
            this.action='new'
            this.showDialog=true
        },
        ok:function(){

            var url;
            if(this.action=='new')
                url=`http://localhost:3000/custom-model/${this.name}/new`
            else
                url=`http://localhost:3000/custom-model/${this.name}/edit`

            this.$http.post(url,{'_id':this._id,'data':this.obj})
            .then((value)=>{
                if(value.data.success){
                    this.$Modal.success(
                        {
                            title:'系统提示'
                            ,content:'保存数据成功'
                        }
                    )
                    this.fetchData()
                }
                else
                    this.$Modal.error({title:'系统提示',content:'保存数据失败：'+value.data.message})
            })
        },
        fetchData:function(){
            this.$http.get(`http://localhost:3000/custom-model/${this.name}`)
                .then((res)=>{
                    if(res.data.success)
                        this.data=res.data.result
                    else
                        this.$Modal.info({title:'系统提示',content:res.data.message})
                })
        },
        readModel:function(){
            this.init()
            this.$http.get(`http://localhost:3000/model/find/${this.name}`)
                .then((val)=>{
                    if(val.data.success){
                        var schama=val.data.result.schama
                        schama.forEach((item)=>{
                            console.log(item)
                            var column=new Object();
                            column['key']=item.name
                            column['title']=item.title
                            column['type']=item.type
                            column['width']=parseInt(''+item.length)
                            if(column['width']<80)
                                column['width']=80
                            if(item.type=='Boolean'){
                                column['render']=(h,params)=>{
                                    return h('Checkbox',{
                                        props:{
                                            value:params.row[item.name]
                                        }
                                    })
                                }
                            }
                            this.columns.push(column)
                            this.data_columns.push(column)
                            this.obj[item.name]=null
                        })
                        var len=this.columns.length
                        delete this.columns[len-1].width
                        //delete this.columns[this.columns.length]['width']
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
    },
    watch:{
        '$route':function(to,from){
            this.name=this.$route.params.model;
            this.readModel();
        }
    }
}
</script>
