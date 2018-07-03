<template>
  <div id="app">
    <my-header></my-header>
    <div class="alert alert-primary" role="alert">
      A simple primary alert—check it out!
    </div>
    <span><router-link to="/about">About</router-link></span>  
    <span><router-link to="/login">Login</router-link></span>
     <span><router-link to="/">Home</router-link></span>
    <router-view/>
  </div>
</template>

<script>
import MyHeader from './components/common/MyHeader'
export default {
  components:{
    'my-header':MyHeader
  }
}
</script>


<style>
span{
  margin-right: 10px
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
