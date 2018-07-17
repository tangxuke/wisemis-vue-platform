<template>
  <div id="root">
    <Card id="card" title="系统登录">
      <Form :labelWidth="80">
        <FormItem label="用户名">
          <Input v-model="username" icon="person" placeholder="请输入用户名"/>
        </FormItem>
        <FormItem label="密码">
          <Input v-model="password" type="password" icon="key" clearable="true" placeholder="请输入密码"/>
        </FormItem>  
        <FormItem label="">
          <Button type="success" @click="login">
            登录
            <Icon type="log-in" style="margin-left:5px;"></Icon>
          </Button>  
        </FormItem> 
             
      </Form>
    </Card>
  </div>
</template>
<script>
export default {
  data(){
    return {
      'username':'',
      'password':''
    }
  },
  methods:{
    login:function(){
      if(!this.username)
      {
        this.$Modal.info({title:'系统提示',content:'请输入用户名！'})
        return
      }
    }
  }
}
</script>

<style lang="less">
#root{
  display: flex;
  background-color: #f0f0f0;
  width:100%;
  height: 100%;
  align-items: center;
  #card{
    width: 400px;
    margin: 0 auto;
  }
}
</style>

<style lang="less">
</style>
