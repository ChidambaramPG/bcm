<template>
  <button 
    class="list-group-item active-section"
    @click.prevent="() => setCategoriesTable(name)"
    v-if="activeCategory == name"
  >
    {{ convertName(name) }}
  </button>
  <button 
    class="list-group-item list-group-item-action"
    @click.prevent="() => setCategoriesTable(name)"
    v-else
  >
    {{ convertName(name) }}
  </button>
</template>
<script>
import store from '../../../store/index.js';
export default {
  name: "CategoriesSidebarMenu",
  methods: {
    
    convertName(name){
      return name.charAt(0).toUpperCase()+name.slice(1)
    },
    setCategoriesTable(){
      store.commit('setSelectedCategory',this.index)
    }
  },
  props: ["name","index"],
  computed:{
      activeCategory(){
          return store.state.categorySubTag;
      },
      getSelectedCategory(){
        return store.state.selectedCategory
      }
  }
};
</script>
<style scoped>
.active-section {
  background-color: #f95473;
  color: white;
  text-align:right;
}
</style>
