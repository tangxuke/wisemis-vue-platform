<template>
    <ul>
        <li v-for="page in pages" :key="page.path">
            <the-page-tag :title="page.title" :path="page.path"></the-page-tag>
        </li>
    </ul>
</template>

<style>
ul{
    list-style-type:none;
    padding: 0;
    margin: 0;
}
li{
    display: inline-block;
}
</style>


<script>
import ThePageTag from './ThePageTag'
export default {
    components:{
        'the-page-tag':ThePageTag
    },
    computed:{
        pages:function(){
            return this.$store.state.openTabs
        }
    }
}
</script>
