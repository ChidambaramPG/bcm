<template>
  <div class="home">
    <div class="row" v-if="showSidebar">
      <div class="col-md-10 page-content border-left">
        <dashboard  v-if="activePage === 'dashboard'" />
        <brochure v-else-if="activePage === 'brochures'" />
        <cards v-else-if="activePage === 'cards'" />
        <users v-else-if="activePage === 'users'" />
        <categories v-else-if="activePage === 'category'" />
        <profile v-else-if="activePage == 'profile'"/>
        <settings v-else-if="activePage == 'settings'"/>
        <groups v-else-if="activePage == 'lists'"/>
      </div>
    </div>
    <div class="row" v-else>
      <div  class="col-md-12 page-content border-left">
        <dashboard v-if="activePage === 'dashboard'" />
        <brochure v-else-if="activePage === 'brochures'" />
        <cards v-else-if="activePage === 'cards'" />
        <users v-else-if="activePage === 'users'" />
        <categories v-else-if="activePage === 'category'" />
        <profile v-else-if="activePage == 'profile'"/>
        <settings v-else-if="activePage == 'settings'"/>
        <groups v-else-if="activePage == 'lists'"/>
      </div>
    </div>
    <!-- <div class="row">
      <all-modals />
    </div> -->
  </div>
</template>

<script>
import Sidebar from "./shared/Sidebar.vue";
import Dashboard from "./pages/Dashboard.vue";
import Brochure from "./pages/Brochures.vue";
import Cards from "./pages/Cards.vue";
import Users from "./pages/Users.vue";
import Categories from "./pages/Categories.vue";
import Profile from './pages/Profile.vue';
import Settings from './pages/Settings.vue';
import Groups from "./pages/Groups.vue";

import AllModals from "./shared/AllModals.vue";
import store from "../store/index.js";
import router from "../router/index.js";
import firebase from "firebase";
export default {
  name: "home",
  components: {
    Sidebar,
    Dashboard,
    Brochure,
    AllModals,
    Cards,
    Users,
    Categories,
    Profile,
    Settings,
    Groups
  },
  computed: {
    showSidebar() {
      return store.state.sidebarVisible;
    },
    activePage() {
      return store.state.activePage;
    }
  },
  beforeCreate(){
    let user = firebase.auth().currentUser;
    firebase.firestore().collection("Admin").doc(user.uid).get().then(resp => {
      // console.log(resp.data())
      if(resp.data() == null){
        router.replace('/login')
      }
    })
  }
};
</script>

<style scoped>
.home{
  z-index:9998;
}
.page-content {
  padding: 0px;
}

.sidebar-content {
  padding: 0px;
}
</style>
