<template>
  <nav class="navbar navbar-expand-lg navbar-light border-bottom">
    <a class="navbar-brand" href="#"><h5>BCM</h5></a>
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
  height: 80px;
  background-color: white;
  /* background-color: #f95473 !important; */
  /* color:white; */
}

.svg-inline--fa {
  color: #f95473;
}
</style>
