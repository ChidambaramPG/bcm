<template>
  <table class="table table-hover">
    <thead class="table-head">
      <tr>
        <th>Card</th>
        <th>Company Name</th>
        <th>Address</th>
        <th>Contact Person</th>
        <th>Phone No</th>
        <th>Added By</th>
      </tr>
    </thead>
    <tbody>
      
      <category-item-row v-for="(card,index) in getSelectedCategoryItem.items" :key="index" :data="card"/>
      
    </tbody>
  </table>
</template>

<script>
import store from '../../../store/index.js';
import CategoryItemRow from './CategoryItemRow.vue';
export default {
    name:"CategoryTable",
    computed:{
        getSelectedCategoryItem(){
            return store.state.selectedCategory;
        }
    },
    components:{
        CategoryItemRow
    }

};
</script>

<style></style>
