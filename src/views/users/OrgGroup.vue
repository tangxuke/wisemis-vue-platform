<template>
    <div id="root">
        <Row>
            <Col span="10">
                <el-tree :data="data" node-key="name" :props="defaultProps" :render-content="renderContent" @node-click="handleNodeClick" ref="tree"></el-tree>
            </Col>
            <Col span="10">
                <Form :labelWidth="100">
                    <FormItem label="部门名称">
                        <Input v-model="name"/>
                    </FormItem>
                    <FormItem label="上级部门">
                        <Input v-model="parent" placeholder="请在点击左侧的部门树来选择上级部门" :clearable="true"/>
                    </FormItem>
                    <FormItem>
                        <Button type="success" class="button" @click="addNode">添加部门</Button>
                        <Button type="primary" class="button" @click="save">保存</Button>
                    </FormItem>
                </Form>
            </Col>
        </Row>
        
    </div>
</template>
<script>
export default {
  data() {
    return {
      test: false,
      name: "",
      parent: "",
      data: [],
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  methods: {
    renderContent(h,{node,data,store}){
        return (<span class="custom-tree-node">
            <span>{node.label}</span>
            <span style="margin-left:20px;">
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            </span>
          </span>)
    },
    handleNodeClick(data,node,obj) {
      this.parent=data.name
    },
    addNode(){
        if(!this.parent)  
            this.data.push({name:this.name})
        else{
            let theNode=this.$refs.tree.getNode(this.parent)
            this.$refs.tree.append({name:this.name},theNode)
        }
        this.name=''
    },
    getData(){
        this.$http.get('custom-model/OrgGroup')
        .then(res=>{
            if(res.data.success){
                this.data=res.data.result
            }else{
                this.$Modal.info({title:'获取数据失败',content:res.data.message})
            }
        }).catch(error=>{
            this.$Modal.info({title:'获取数据失败',content:error.message})
        })
    },
    save(){
        //删除全部
        this.$http.post('custom-model/OrgGroup/del-many',{where:{}})
        .then(res=>{
          if(!res.data.success){
            this.$Modal.info({title:'保存数据失败',content:res.data.message})
            return
          }
        this.$http.post('custom-model/OrgGroup/new',{data:this.data})
            .then(res=>{
                if(res.data.success){
                    this.$Modal.info({title:'系统提示',content:'保存数据成功！'})
                    this.getData()
                }else{
                    this.$Modal.info({title:'获取数据失败',content:res.data.message})
                }
            }).catch(error=>{
                this.$Modal.info({title:'获取数据失败',content:error.message})
            })
        }).catch(error=>{
          this.$Modal.info({title:'保存数据失败',content:error.message})
          return
        })
        
    },
    append(data){
        setTimeout(() => {
            this.$prompt('请输入节点名称：','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'info'
            }).then(res=>{
                let nodename=res.value
                if(!data.children)
                    Vue.set(data,'children',[])
                data.children.push({name:nodename})
            }).catch(()=>{
                alert('cancel')
            })
        }, 500);
        
    }
  },
  mounted:function(){
      this.getData()
  }
};
</script>
<style lang="less" scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

</style>
