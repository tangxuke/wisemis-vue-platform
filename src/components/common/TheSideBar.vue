<template>
<div>
    <h1>test</h1>
        <scroll-bar ref="scrollBar">
            <ul class="menu">
            <li v-for="(item,index) in items" :key="'item'+index">
                <div class="menu-title" @click="toggleOpen(index)">
                    <Icon :type="item.icon" data-menu-title></Icon>
                    <span data-menu-title>{{item.title}}</span>
                    <template v-if="checkOpen(index)">
                        <Icon type="chevron-down" class="menu-right menu-closed"></Icon>
                    </template>
                    <template v-else>
                        <Icon type="chevron-down" class="menu-right"></Icon>
                    </template>
                </div>
                <template v-if="checkOpen(index)">
                <ul class="menu-content menu-closed" v-if="item.children">
                    <li class="menu-item" v-for="(child,i) in item.children" :key="'child'+index+i">
                        {{child.title}}
                    </li>
                </ul>
                </template>
                <template v-else>
                <ul class="menu-content" v-if="item.children">
                    <li class="menu-item" v-for="(child,i) in item.children" :key="'child'+index+i">
                        {{child.title}}
                    </li>
                </ul>
                </template>
            </li>
            </ul>
        </scroll-bar>
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
}

.menu-item:hover {
  background-color: cornflowerblue;
  color: cyan;
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
import scrollBar from "@/components/common/vue-scroller-bars"

export default {
  data: function() {
    return {
      opened: [],
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
  components: {
    "scroll-bar": scrollBar
  },
  methods: {
    checkOpen:function(index) {
      let i = this.opened.findIndex(value => {
        if (index == value) return true;
        else return false;
      });
      if (checkOpen > -1) return true;
      else return false;
    },
    toggleClose: function(index) {
      let opened = this.checkOpen(index);
      if (opened) {
        this.opened.splice(i, 1);
      } else {
        this.opened.push(i);
      }
      setTimeout(function() {
        this.$refs.scrollBar.resize();
      }, 300);
    }
  }
}
</script>
