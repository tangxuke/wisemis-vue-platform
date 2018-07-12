<template>
    <div>
        <Tag closable :color="color" @click="selectPage" @close="closePage">{{title}}</Tag>
    </div>
</template>

<script>
export default {
    props:['title','path']
    ],
    methods:{
        selectPage:function(){
            this.$store.commit('setCurrentPage',this.path)
        },
        closePage(event,name){
            this.$store.commit('closePage',this.path)
        }
    },
    computed:{
        active:function(){
            return this.$store.state.currentPage==this.path?true:false
        },
        color:function(){
            return this.active?'blue':'#EF6AFF'
        }
    }
}
</script>
