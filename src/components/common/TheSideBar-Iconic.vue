<template>
    <Menu active-name="1-2" :open-names="['1']" :theme="'dark'">
        <Submenu name="1">
            <template slot="title">
                <Icon type="ios-analytics"></Icon>
            </template>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                <Icon type="ios-filing"></Icon>
            </template>
        </Submenu>
        <Submenu name="4">
            <template slot="title">
                <Icon type="ios-gear"></Icon>
            </template>
        </Submenu>
    </Menu>
</template>
<script>
    export default {
        
    }
</script>
