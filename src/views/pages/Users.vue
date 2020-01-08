<template>
  <div id="">
    <top-bar />
    <div class="container">
      <!-- <user-header v-if="getUsersSection == 'table'"/> -->
      <user-list class="brochures-table" v-if="getUsersSection == 'table'"/>
      <add-new-user v-if="getUsersSection == 'add'"/>
      <edit-user v-if="getUsersSection == 'edit'"/>
      <floating-add-user-button v-if="getUsersSection == 'table'"/>
    </div>
  </div>
</template>

<script>
import TopBar from "../shared/TopBar.vue";
import UserList from "../components/users/UserList.vue";
// import UserHeader from "../components/users/UserHeader.vue";
import AddNewUser from '../components/users/AddNewUser.vue';
import EditUser from '../components/users/EditUser.vue';
import FloatingAddUserButton from '../components/users/FloatingAddUserButton.vue';
import store from '../../store/index.js';
export default {
  name: "Users",
  components: {
    TopBar,
    // UserHeader,
    UserList,
    AddNewUser,
    EditUser,
    FloatingAddUserButton
  },
  computed:{
    getUsersSection(){
      return store.state.usersSection;
    }
  }
};
</script>
<style scoped>
.brochures-table {
  margin-top: 20px;
}
</style>
