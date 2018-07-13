<template>
<div>       
          <ul class="menu">
            <li v-for="(item,index) in items" :key="'item-'+index">
                <div class="menu-title" :class="{'menu-title-active':isopen(index)}" @click="toggleOpen(index)">
                    <Icon :type="item.icon" data-menu-title></Icon>
                    <span data-menu-title>{{item.title}}</span>
                    <Icon type="chevron-down" class="menu-right" :class="{'menu-closed':isopen(index)}"></Icon>
                </div>
                <template>
                <ul class="menu-content"  :class="{'menu-closed':!isopen(index)}" v-if="item.children">
                    <li class="menu-item" :class="{'menu-item-active':selected=='child-'+index+'-'+i}" v-for="(child,i) in item.children" :key="'child-'+index+'-'+i" @click="menuSelect('child-'+index+'-'+i)">
                        {{child.title}}
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
  background-color: #f0f0f0;
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

.menu .menu-title-active{
  background-color: rgb(103, 175, 243);
  color: #fff;
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
}
.menu .menu-content .menu-item {
  position: relative;
  cursor: pointer;
  line-height: 30px;
  padding: 5px;
}

.menu .menu-content .menu-item-active{
  background-color: rgb(156, 143, 143);
  color: rgb(228, 224, 240);
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
  background-color: gray;
  color: #333;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  top: +2px;
  left: +2px;
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
      opened: [],
      selected:'',
      items: [
        {
          title: "数据概览",
          icon: "grid",
          children: [
            {
              title: "应用概览"
            },
            {
              title: "用户趋势"
            },
            {
              title: "渠道分析"
            },
            {
              title: "留存分析"
            },
            {
              title: "用户质量评估"
            }
          ]
        },
        {
          title: "数据概览",
          icon: "grid",
          children: [
            {
              title: "应用概览"
            },
            {
              title: "用户趋势"
            },
            {
              title: "渠道分析"
            },
            {
              title: "留存分析"
            },
            {
              title: "用户质量评估"
            }
          ]
        },
        {
          title: "数据概览",
          icon: "grid",
          children: [
            {
              title: "应用概览"
            },
            {
              title: "用户趋势"
            },
            {
              title: "渠道分析"
            },
            {
              title: "留存分析"
            },
            {
              title: "用户质量评估"
            }
          ]
        },
        {
          title: "数据概览",
          icon: "grid",
          children: [
            {
              title: "应用概览"
            },
            {
              title: "用户趋势"
            },
            {
              title: "渠道分析"
            },
            {
              title: "留存分析"
            },
            {
              title: "用户质量评估"
            }
          ]
        },
        {
          title: "数据概览",
          icon: "grid",
          children: [
            {
              title: "应用概览"
            },
            {
              title: "用户趋势"
            },
            {
              title: "渠道分析"
            },
            {
              title: "留存分析"
            },
            {
              title: "用户质量评估"
            }
          ]
        }
      ]
    };
  },
  methods: {
    menuSelect:function(key){
      this.selected=key;
    },
    isopen: function(index) {
      if (this.checkOpen(index) > -1) return true;
      else return false;
    },
    checkOpen: function(index) {
      let i = this.opened.findIndex(value => {
        if (index == value) return true;
        else return false;
      });
      return i;
    },
    toggleOpen: function(index) {
      let i = this.checkOpen(index);
      if (i > -1) {
        this.opened.splice(i, 1);
      } else {
        this.opened.push(index);
      }
    }
  }
};
</script>
