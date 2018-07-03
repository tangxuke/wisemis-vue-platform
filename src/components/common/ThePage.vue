<template>
    <div>
        <my-header/>       
            <slot/>
        <my-footer/>
    </div>
</template>
<script>
import MyHeader from './TheHeader'
import MyFooter from './TheFooter'
export default {
    components:{
        'my-header':MyHeader,
        'my-footer':MyFooter
    }
}
</script>
