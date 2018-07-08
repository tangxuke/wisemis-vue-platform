/**
 * 内置的状态管理器
 */
import axios from 'axios'

const app={
    state:{
        shrink:false,       /*侧边栏收缩状态*/
        menuTheme:'dark',   /*主题：默认深色*/
        menuList:[],        /*侧边栏菜单*/
        openedSubmenuArr:[] /**要展开的菜单数组 */
    },
    mutations:{
        updateMenuList:function(state){
            axios.get('http://localhost:3000/menu')
                .then((res)=>{
                    state.menuList=res.data
                })
        }
    },
    actions:{

    },
    gettters:{

    }
}

export default app