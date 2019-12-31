<template>
  <section>
    <td v-if="data.length < 1">
      <span class="badge  badge-pill  badge-warning">No Tag Added</span>
      <span class="badge  badge-pill  badge-info"> <a @click.prevent="handleAddTag"> <i class="fas fa-plus"/></a></span>
    </td>
    <td v-else>
      <span
        class="badge badge-pill badge-info tag-pill"
        v-for="(tag, ind) in data"
        :key="ind"
        >{{ tag }} <a @click.prevent="handleTagRemove"><i class="fas fa-times"/></a></span
      >
      <span class="badge  badge-pill  badge-info"> <a @click.prevent="handleAddTag"> <i class="fas fa-plus"/></a></span>
    </td>
  </section>
</template>

<script>
export default {
    name:'TagSection',
    props:['data','cardId'],
    methods:{
        handleTagRemove(){
            console.log('removed')
        }
    }
};
</script>

<style></style>
