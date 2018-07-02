<template>
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <slot></slot>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-if="dismissible">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</template>
<script>
export default {
  name: "alert",
  props:{
      dismissible:{
          type:Boolean,
          default:false
      }
  }
};
</script>
