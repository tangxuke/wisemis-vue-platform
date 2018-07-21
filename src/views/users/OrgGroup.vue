<template>
    <div id="root">
        <Row>
            <Col span="10">
                <el-tree :data="data" node-key="name" :props="defaultProps" @node-click="handleNodeClick" ref="tree"></el-tree>
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
        this.$http.get('http://localhost:3000/custom-model/OrgGroup')
        .then(res=>{
            if(res.data.success){
                this.data=res.data.result
                this.$Modal.info({content:JSON.stringify(this.data)})
            }else{
                this.$Modal.info({title:'获取数据失败',content:res.data.message})
            }
        }).catch(error=>{
            this.$Modal.info({title:'获取数据失败',content:error.message})
        })
    },
    save(){
        //删除全部
        this.$http.post('http://localhost:3000/custom-model/OrgGroup/del-many',{where:{}})
        .then(res=>{
          if(!res.data.success){
            this.$Modal.info({title:'保存数据失败',content:res.data.message})
            return
          }
        }).catch(error=>{
          this.$Modal.info({title:'保存数据失败',content:error.message})
          return
        })
        this.$http.post('http://localhost:3000/custom-model/OrgGroup/new',{data:this.data})
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
    }
  },
  mounted:function(){
      this.getData()
  }
};
</script>
<style scoped>
.button{
  margin: 5px;
}
</style>
