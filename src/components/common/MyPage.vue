<template>
    <div>
        <my-header/>
        <div style="background-color:red">
            <slot/>
        </div>
        <my-footer/>
    </div>
</template>
<script>
import MyHeader from './MyHeader'
import MyFooter from './MyFooter'
export default {
    components:{
        'my-header':MyHeader,
        'my-footer':MyFooter
    }
}
</script>
