<template>
    <div id="root">
        <p>这是模板展示页面：{{$route.params.model}}</p>
        <Button type="primary" @click="toggle">切换</Button>
        <hr/>
        <Row v-if="showForm">
            <Col span="8">form</Col>
            <Col span="16">table</Col>
        </Row>
        <Row v-else>
            <Col span="24">table</Col>
        </Row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            showForm:true
        }
    },
    methods:{
        toggle:function(){
            this.showForm=!this.showForm
        }
    }
}
</script>
