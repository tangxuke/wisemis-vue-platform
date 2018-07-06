<template>
    <div class="container-fluid">
        <!--页头-->
        <div class="row">
            <h1>这是页面设计器属性页</h1>
            <p>id:{{id}}</p>
        </div>
        <!--活动区-->
        <div class="row">
            <!--可用组件区-->
            <div class="col-2">
                这是组件区
                <div>
                   <button class="btn btn-primary" id="demo" draggable="true" @dragstart="drag">
                    这是一个组件
                   </button>
                </div>
            </div>
            <!--页面预览区-->
            <div class="col-8 main" @drop="drop" @dragover="allowDrop" style="height:500px">

            </div>
            <!--属性区-->
            <div class="col-2">
                这是属性区
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data:function(){
        return {
            id:''
        }
    },
    methods:{
        drag:function(event){
            event.dataTransfer.setData('Text',event.target.innerHTML)
        },
        drop:function(event){
            event.preventDefault()
            var data=event.dataTransfer.getData('Text')
            var button=document.createElement('button')
            button.innerHTML=data
            button.setAttribute("class","btn btn-primary")
            button.style.display='block'
            button.style.width='100%'
            button.style.marginTop='10px'
            event.target.appendChild(button)
        },
        allowDrop:function(event){
            event.preventDefault()
        }
    }
}
</script>


<style>

</style>
