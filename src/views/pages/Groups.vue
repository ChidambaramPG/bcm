<template>
  <div id="">
    <top-bar />
    <div class="container">
        <div class="row">
            <div class="col-md-2">
                <groups-list />
            </div>
            <div class="col-md-10">
                <group-items />
                <email-section />
            </div>
        </div>
        
      
    </div>
  </div>
</template>

<script>
import TopBar from "../shared/TopBar.vue";
import GroupsList from "../components/groups/GroupsList.vue";
import GroupItems from "../components/groups/GroupItems.vue";
import EmailSection from "../components/groups/EmailSection.vue";

import store from '../../store/index.js'
export default {
  name: "Groups",
  components: {
    TopBar,
    GroupsList,
    GroupItems,
    EmailSection
  },
  computed:{
    getCategorySection(){
      return store.state.categorySection;
    }
  }
};
</script>
<style scoped>
.brochures-table {
  margin-top: 20px;
}
</style>
