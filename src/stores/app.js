/**
 * 内置的状态管理器
 */
import axios from '@/util/my_axios'

const app={
    state:{
        shrink:false,       /*侧边栏收缩状态*/
        menuTheme:'dark',   /*主题：默认深色*/
        menuList:[],        /*侧边栏菜单*/
        openedSubmenuArr:[], /**要展开的菜单数组 */
        openTabs:[],         /**打开的页签 */
        currentPage:''       /**当前页签*/   
    },
    mutations:{
        updateMenuList:function(state){
            axios.get('http://localhost:3000/menu')
                .then((res)=>{
                    if(res.data.success){
                        state.menuList=res.data.result
                    }else{
                        alert('1'+JSON.stringify(res.data))
                    }
                }).catch((error)=>{
                    alert('2'+error.message)
                })
        },
        setCurrentPage:function(state,page){
            state.currentPage=page
            this.$router.push(page)
            if(state.openTabs.findindex(
                (item)=>{
                return item==page
            })==-1){
                state.openTabs.push(page)
            }
        },
        closePage:function(state,page){
            let i=state.openTabs.findindex(
                (item)=>{
                return item==page
            })
            if(i>-1){
                state.openTabs.splice(i,1)
                if(i>0)
                    state.currentPage=state.openTabs[i-1]
                else
                    state.currentPage=state.openTabs[0]
                state.commit('setCurrentPage',state.currentPage)
            }
        }
    },
    actions:{

    },
    gettters:{

    }
}

export default app