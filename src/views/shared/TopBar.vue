<template>
  <nav class="navbar navbar-expand-lg navbar-light border-bottom shadow fixed-top">
    <router-link class="navbar-brand" to="/" style="color:white;">BCM</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <main-menu/>
    </div>
    
    
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
             style="color:white;"
          >
            <i class="fas fa-user"></i> Mahesh
          </a>
          <profile-dropdown />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import store from "../../store/index.js";
import ProfileDropdown from "../shared/ProfileDropdown.vue";
import MainMenu from '../components/topbar/MainMenu.vue';
export default {
  name: "TopBar",
  components: {
    ProfileDropdown,
    MainMenu
  },
  methods: {
    toggleSidebar() {
      store.commit("toggleSidebar");
    },
    convertName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  },
  computed: {
    actvePage() {
      return store.state.activePage;
    },
    toggleStat() {
      return store.state.sidebarVisible;
    }
  }
};
</script>

<style scoped>
.navbar {
  width: 100% !important;
  height: 50px;
  z-index:9999;
  background-color:#3578e5;
  
  /* background-color: grey; */
  /* background-color: #f95473 !important; */
  /* color:white; */
  /* background: rgb(67,70,73); */
  /* background: linear-gradient(90deg, rgba(67,70,73,1) 0%, rgba(41,38,39,1) 100%);  */
}

.svg-inline--fa {
  color: white;
  margin-right:5px;
}

.navbar-brand{
  /* color:#de3c4b */
  color:white;
}

.nav-item.dropdown a{
  color:white !important; 
  font-size:12px;
}
</style>
