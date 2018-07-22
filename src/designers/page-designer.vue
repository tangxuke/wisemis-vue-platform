<template>
    <Tabs value="name1">
        <TabPane label="页面信息" name="base">
            <Row>
                <Col span="10">
                    <Form :model="page" :labelWidth="100">
                        <FormItem label="名称">
                            <Input v-model="page.name" placeholder="页面名称"/>
                        </FormItem>
                        <FormItem label="标题">
                            <Input v-model="page.title" placeholder="页面标题"/>
                        </FormItem>
                        <FormItem label="图标">
                            <Input v-model="page.icon" placeholder="页面图标"/>
                        </FormItem>
                        <FormItem label="路径">
                            <Input v-model="page.path" placeholder="页面路径"/>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </TabPane>
        <TabPane label="页面代码" name="code">
            <Input type="textarea" v-model="code" placeholder="页面代码"/>
        </TabPane>
        <TabPane label="预览效果" name="preview">
            <div class="card">
                <div class="card-header">
                    <Icon :type="page.icon" size="20" style="margin-right:10px;"></Icon>
                    {{page.title}}
                    <Button type="success" @click="preview">预览</Button>
                </div>
                <div class="card-body" v-html="code">
                </div>
            </div>
        </TabPane>
    </Tabs>
</template>

<script>
export default {

    data(){
        return {
            page:{
                name:'',
                title:'',
                icon:'',
                path:''
            },
            code:JSON.stringify({is:'Button',text:'tangxuke'}),
            els:[]
        }
    },
    methods:{
        preview:function(){
            this.els=JSON.parse(this.code)
        }
    }
};
</script>