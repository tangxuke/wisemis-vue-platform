<template>
    <div class="container center">
        <Form>
        <Select v-model="parent" placeholder="请选择父层菜单：">
            <Option v-for="item in menuList" :value="item.name" :key="item.name">{{ item.title }}</Option>
        </Select>
        <FormItem label="菜单名：">
            <Input v-model="name" placeholder="菜单名"/>
        </FormItem>
        <FormItem label="标题：">
            <Input v-model="title" placeholder="标题"/>
        </FormItem>
        <FormItem label="路径：">
            <Input v-model="path" placeholder="路径"/>
        </FormItem>
        <FormItem label="图标：">
            <Input v-model="icon" placeholder="图标"/>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit">Submit</Button>
            <Button type="ghost" style="margin-left: 8px">Cancel</Button>
        </FormItem>
        </Form>
    </div>
</template>

<style>
.center {
  padding: 0 20%;
}
</style>



<script>
import axios from "axios";

export default {
  data: () => {
    return {
      name: "",
      title: "",
      path: "",
      icon: "",
      parent:""
    }
  },
  computed:{
      menuList:function(){
          return this.$store.state.app.menuList;
      }
  },
  methods: {
    handleSubmit: function() {
      var body = {
        name: this.name,
        title: this.title,
        path: this.path,
        icon: this.icon,
        parent:this.parent
      };
      axios({
        method: "post",
        url: "http://localhost:3000/menu/add",
        data: body
      })
        .then(res => {
          if (res.data.success){
            this.$Modal.info({title:'系统提示',content:'添加菜单成功！'});
            this.clear();
            this.$store.commit('updateMenuList');
          } 
          else this.$Modal.info({title:'系统提示',content:'添加菜单失败！'});
        })
        .catch(err => {
          this.$Modal.info({title:'系统提示',content:"发生异常：" + res.data.message});
        });
      //this.clear()
    },
    clear: function() {
      this.name = "";
      this.title = "";
      this.path = "";
      this.icon = "";
    }
  }
};
</script>
