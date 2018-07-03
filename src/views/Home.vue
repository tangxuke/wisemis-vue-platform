<template>
  <div class="home">
   <my-page>
     这是主页{{count}}
   </my-page>
  </div>
</template>

<script>
// @ is an alias to /src
import MyPage from '@/components/common/ThePage'
import store from '@/store.js'
export default {
  name: 'home',
  components: {
    'my-page':MyPage
  },
  computed:{
    count:()=>{
      return store.state.count
    }
  }
}
</script>
