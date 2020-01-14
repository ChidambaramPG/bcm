<template>
  <div
    class="dropdown-menu dropdown-menu-right"
    aria-labelledby="navbarDropdown"
  >
    <a
      class="dropdown-item"
      href="#"
      @click.prevent="() => setContentLayout('profile')"
      ><i class="fas fa-pencil-alt"></i> Profile</a
    >
    <a class="dropdown-item" href="#"
    @click.prevent="() => setContentLayout('settings')"
      ><i
        class="fas fa-cogs"
        
      ></i> 
      Settings</a
    >
    <a class="dropdown-item" href="#"
    @click.prevent="() => importExcelData()"
      ><i
        class="fas fa-arrow-down"
        
      ></i> 
      Import excel</a
    >
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#"
      @click.prevent="handleAdminSignout"><i class="fas fa-sign-out-alt"></i> Signout</a
    >
  </div>
</template>

<script>
import store from "../../store/index.js";
import firebase from "firebase";
import router from '../../router/index.js';
export default {
  name: "ProfileDropdown",
  methods: {
    setContentLayout: page => {
      store.commit("setActivePage", page);
    },
    handleAdminSignout(){
      firebase.auth().signOut().then(function() {
        router.push('/login')
      }).catch(function(error) {
        alert(error)
      });

    },
    importExcelData(){
      // var newwindow=window.open("url of .xls","window2","");
      // console.log(newwindow)
    }
  }
};
</script>

<style scoped>

a{
  /* color:white; */
  font-size:12px;
  color:grey;
}

svg{
  margin-right:5px;
}

</style>
