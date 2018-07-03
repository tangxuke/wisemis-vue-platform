<template>
  <div class="home">
   <my-page>
     this is home page
     <el-input/>
   </my-page>
  </div>
</template>

<script>
// @ is an alias to /src
import MyPage from '@/components/common/MyPage'

export default {
  name: 'home',
  components: {
    'my-page':MyPage
  }
}
</script>
