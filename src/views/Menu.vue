<template>
<div>
    <Button v-if="parent" type="primary" @click="readMenu('')">回到根菜单</Button>
    <span style="margin:5px;">{{parent||'root'}}</span>
    <Table width="80%" height="400" border :columns="columns2" :data="data4"></Table>
    <Modal
        v-model="modal1"
        title="Common Modal dialog box title"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form>
            <FormItem label="菜单名：">
                {{data4[index].name}}
            </FormItem>
            <FormItem label="标题：">
                <Input v-model="data4[index].title" placeholder="标题"/>
            </FormItem>
            <FormItem label="路径：">
                <Input v-model="data4[index].path" placeholder="路径"/>
            </FormItem>
            <FormItem label="图标：">
                <Input v-model="data4[index].icon" placeholder="图标"/>
            </FormItem>
        </Form>
    </Modal>
</div>
</template>
<script>

export default {
        data () {
            return {
                index:0,
                modal1:false,
                columns2: [
                    {
                        title: 'Action',
                        key: 'action',
                        width: 200,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on:{
                                        click:()=>this.readMenu(this.data4[params.index].name)
                                    }
                                }, 'Sub Menu'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on:{
                                        click:()=>this.showEdit(params.index)
                                    }
                                }, 'Edit'),
                                h('Button',{
                                    props:{
                                        type:'text',
                                        size:'small'
                                    },
                                    on:{
                                        click:()=>{
                                            this.deleteMenu(params.index)
                                        }
                                    }
                                },'Del')
                            ]);
                        }
                    },
                    {
                        title: 'Name',
                        key: 'name',
                        width: 100
                    },
                    {
                        title: 'Title',
                        key: 'title',
                        width: 100
                    },
                    {
                        title: 'Path',
                        key: 'path',
                        width: 100
                    },
                    {
                        title: 'Icon',
                        key: 'icon',
                        width: 100,
                        render:(h,params)=>{
                            return h('Icon',{
                                props:{
                                    type:this.data4[params.index].icon,
                                    size:20
                                }
                                })
                        }
                    }
                ],
                data4:[],
                parent:''
            }
        },
        methods:{
            ok:function(){
                this.updateMenu()
            },
            cancel:function(){

            },
            showEdit:function(index){
                this.index=index;
                this.modal1=true
            },
            deleteMenu:function(index){
                if(confirm('你真的要删除此菜单吗？')){
                    this.$http.post('http://localhost:3000/menu/del',{parent:this.parent,name:this.data4[index].name})
                        .then((res)=>{
                            if(res.data.success){
                                alert('删除菜单成功！')
                                this.readMenu(this.parent)
                                this.$store.commit('updateMenuList')
                            }else{
                                alert(res.data.message)
                            }
                        }).catch((err)=>{
                            alert(err.message)
                        })
                }
            },
            updateMenu:function(){
                var data={
                    parent:this.parent,
                    name:this.data4[this.index].name,
                    title:this.data4[this.index].title,
                    path:this.data4[this.index].path,
                    icon:this.data4[this.index].icon
                }
                this.$http.post('http://localhost:3000/menu/edit',data)
                    .then((res)=>{
                        if(res.data.success){
                            alert('修改成功')
                            this.readMenu(this.parent)
                            this.$store.commit('updateMenuList')
                        }else{
                            alert(res.data.message)
                        }
                    }).catch((err)=>{
                        alert(err.message)
                    })
            },
            readMenu:function(parent){
                this.parent=parent;
                let url='http://localhost:3000/menu'
                if(parent)
                    url+='/children/'+parent

                this.$http.get(url)
                    .then(
                    (res)=>{
                    if(res.data.success)
                        this.data4=res.data.result
                    else
                        alert(res.data.message)
                }
                ).catch((err)=>{
                    alert(err.message)
                })
            }
        },
        mounted:function(){
            this.readMenu()
        }
    }
</script>
<style lang="less">
.head{
    padding: 10px;
    background-color: #fff;
    margin-bottom: 10px;
}

</style>