<template>
  <div id="">
    <top-bar />
    <div class="container">
      <overview/>
      <!-- <brochures class="brochure-table"/> -->
    </div>
  </div>
</template>

<script>
import TopBar from "../shared/TopBar.vue";
import Overview from '../shared/Overview.vue';
// import Brochures from '../components/dashboard/Brochures.vue';
import store from "../../store/index.js"
export default {
  name: "Dashboard",
  components: {
    TopBar,
    Overview,
    // Brochures
  },
  created(){
    store.dispatch("fetchAllBusinessCards");
    store.dispatch("fetchAllUsers");
    store.dispatch("fetchCategoriesList");
    store.dispatch("fetchAllTags");
  }
};
</script>
<style scoped>
.brochure-table{
  margin-top:100px;
}
</style>
