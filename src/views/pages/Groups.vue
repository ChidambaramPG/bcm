<template>
  <div id="">
    <top-bar />
    <div class="container"  style="margin-top:50px">
        <div class="row">
            <div class="col-md-2">
                <groups-list />
            </div>
            <div class="col-md-10">
                <group-items />
                <email-section />
                <export-list />
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
import ExportList from "../components/groups/ExportList.vue";

import store from '../../store/index.js'
export default {
  name: "Groups",
  components: {
    TopBar,
    GroupsList,
    GroupItems,
    EmailSection,
    ExportList
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
