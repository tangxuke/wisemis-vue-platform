<script>

export default {
    methods:{
        logout:function(){
            this.$Modal.confirm({title:'注销提示',content:'你真的要退出系统吗？',onOk:this.do_logout})
        },
        do_logout:function(){
            
            this.$http.post('http://localhost:3000/users/logout',{})
            .then((value)=>{
                if(value.data.success){
                    this.$store.commit('logout')
                    this.$router.push('/login')
                }
                else
                    setTimeout(()=>{
                        this.$Modal.info({title:'注销失败',content:value.data.message})
                    },500)
            }).catch((error)=>{
                setTimeout(()=>{
                    this.$Modal.info({title:'注销失败',content:error.message})
                },500)
            })
        }
    },
    mounted:function(){
        this.logout()
    },
    watch:{
        '$router':(to,from)=>{
            this.logout()
        }
    }
}
</script>
