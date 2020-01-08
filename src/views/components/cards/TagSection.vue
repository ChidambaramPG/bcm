<template>
  <section style="text-align:center;width:100%;">
    <div v-if="data.length < 1">
      <span class="badge badge-pill" style="backgound-color:#f25e1f;">No Tag Added</span>
      <!-- <span class="badge  badge-pill" style="background-color:#0094ff;font-weight:300;"></span> -->
    </div>
    <div v-else >
      <!-- {{data.slice(0,3)}} -->
      <span
        class="badge badge-pill badge-info tag-pill"
        style="margin-right:2px;font-weight:300;font-size:10px;background-color:#2f973b"
        v-for="(tag, ind) in data.slice(0,2)"
        :key="ind"
        >{{ tag }}</span
      >
      <span class="badge  badge-pill badge-warning" 
      style="margin-left:2px;background-color:#f25e1f;color:white;font-weight:300;font-size:10px;" 
      v-if="data.length>3">{{data.length - 3}} more </span>
      <!-- <span class="badge  badge-pill  badge-info" v-else>{{data.length}} more </span> -->
    </div>
  </section>
</template>

<script>
export default {
    name:'TagSection',
    props:['data','cardId'],
    methods:{
        handleTagRemove(){
            // console.log('removed')
        }
    }
};
</script>

<style></style>
