<template>
  <div class="about">
    {{data}}
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data:function(){
    return {
      data:''
    }
  },
  mounted:function(){
    axios.get('http://localhost:3000/users/about').then((response)=>{
      this.data=response.data.test
    }).catch((error)=>{
      this.data=error
    })
  }
}
</script>
