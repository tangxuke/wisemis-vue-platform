<template>
    <Table width="80%" height="400" border :columns="columns2" :data="data4"></Table>
</template>
<script>
    export default {
        data () {
            return {
                columns2: [
                    {
                        title: 'Action',
                        key: 'action',
                        width: 120,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, 'View'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, 'Edit')
                            ]);
                        }
                    },
                    {
                        title: 'Name',
                        key: 'name',
                        width: 100
                    },
                    {
                        title: 'Title',
                        key: 'title',
                        width: 100
                    },
                    {
                        title: 'Path',
                        key: 'path',
                        width: 100
                    },
                    {
                        title: 'Icon',
                        key: 'icon',
                        width: 100,
                        render:(h,params)=>{
                            return h('Icon',{
                                props:{
                                    type:this.data4[params.index].icon,
                                },
                                style:{
                                    'font-size':'40px',
                                    'padding':'10px'
                                }
                                })
                        }
                    }
                ]
            }
        },
        computed:{
            data4:function(){
                return this.$store.state.app.menuList
            }
        }
    }
</script>
<style>
.icon{
    font-size: 20px;
}
</style>
