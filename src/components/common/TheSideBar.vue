<template>
<div>       
          <ul class="menu">
            <li v-for="(item,index) in items" :key="'item-'+index">
                <div class="menu-title" @click="toggleOpen(index,item)">
                    <Icon :type="item.icon" class="menu-title-icon"></Icon>
                    <span class="menu-title-text">{{item.title}}</span>
                    <Icon type="chevron-down" class="menu-right" :class="{'menu-closed':isopen(index)}" v-if="item.children.length"></Icon>
                </div>
                <template>
                <ul class="menu-content"  :class="{'menu-closed':!isopen(index)}" v-if="item.children">
                    <li class="menu-item" 
                        :class="{'menu-item-active':selected=='child-'+index+'-'+i}" 
                        v-for="(child,i) in item.children" 
                        :key="'child-'+index+'-'+i" 
                        @click="menuSelect('child-'+index+'-'+i,child)">
                          <Icon :type="child.icon" class="menu-item-icon" v-if="child.icon"></Icon>
                          <span class="menu-item-text">
                            {{child.title}}
                          </span>
                    </li>
                </ul>
                </template>
            </li>
          </ul>
</div>
</template>

<style>
.menu {
  position: relative;
  background-color: #996868;
  color:#fff;
}
.menu .menu-title {
  position: relative;
  cursor: pointer;
  padding: 10px;
  
}

.menu .menu-title:hover{
  background-color: cadetblue;
  color: #ddd;
}

.menu-title .menu-closed {
  transform: rotate(180deg);
  transition: all 0.2s;
}

[data-menu-title] {
  margin: 5px;
}
.menu .menu-content {
  position: relative;
  background-color: #fff;
  color:darkblue;
}
.menu .menu-content .menu-item {
  position: relative;
  cursor: pointer;
  /*line-height: 30px;*/
  padding: 5px;
  font-size: 80%;
}

.menu .menu-content .menu-item-active{
  background-color: rgb(240, 240, 240);
  color: rgb(100, 100, 100);
  border: 1px solid #f0f0f0;
  border-radius: 4px;
}

.menu-item:hover {
  background-color: rgb(222, 226, 233);
  color: rgb(111, 114, 128);
  border: 1px solid #f0f0f0;
  border-radius: 4px;
}

.menu-item:active{
  background-color: rgb(192, 192, 192);
  color: #333;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  top: +2px;
  left: +2px;
}

.menu-title-icon{
  position: absolute;
  padding: 5px;
  text-align: center;
}

.menu-title-text{
  position: relative;
  left: 30px;
}

.menu-item-icon{
  position: absolute;
  padding: 5px;
  text-align: center;
}

.menu-item-text{
  position: relative;
  left: 25px;
}

.menu-closed {
  display: none;
}
.menu-right {
  position: absolute;
  right: 10px;
  padding: 5px;
}
</style>

<script>
export default {
  data: function() {
    return {
      opened: 0,
      selected:'',
    };
  },
  computed:{
    items:function(){
      return this.$store.state.app.menuList;
    }
  },
  methods: {
    menuSelect:function(key,item){
      this.selected=key;
      if(item.path)
        this.$router.push(item.path);
      else
        this.$router.push('404');
    },
    isopen: function(index) {
      return this.opened==index;
    },
    toggleOpen: function(index,item) {
      if(this.opened==index)
        this.opened='$$$$$$$$$$$$';
      else
        this.opened=index;
      /*if(item.path)
        this.$router.push(item.path);*/
    }
  }
};
</script>
