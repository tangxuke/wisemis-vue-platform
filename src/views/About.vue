<template>
  <div class="about">
    {{data}}
  </div>
</template>
<script>

export default {
  data:function(){
    return {
      data:''
    }
  },
  mounted:function(){
    this.$http.get('http://localhost:3000/users/about').then((response)=>{
      this.data=response.data.test
    }).catch((error)=>{
      this.data=error
    })
  }
}
</script>
