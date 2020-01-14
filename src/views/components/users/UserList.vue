<template>
  <div class="">
    <div class="">
      <div class="row">
        <div class="col-md-12 shadow p-2">
          <span style="font-weight:600;font-size:12px;color:#161e7a;">{{"Employees".toUpperCase()}}</span>
        </div>
      </div>
      <div class="row mt-3"  style="overflow:none">  
        <single-user v-for="(user,index) in getUsers" :key="index" :user="user" /> 
      </div>
    </div>
  </div>
</template>
<script>
import store from '../../../store/index.js';
import SingleUser from "./SingleUser.vue";
export default {
  name: "UserList",
  components:{
    SingleUser
  },
  methods:{
    showEditCardsModal(){
      store.commit('toggleEditCardModal')
    },
    showDeleteCardsModal(){
      store.commit('toggleDeleteCardModal')
    },

  },
  computed:{
    getUsers(){
      return store.state.allUsers;
    }
  },
  created(){
    store.dispatch('fetchAllUsers')
  }
};
</script>
<style scoped>
table {
  border-top: none;
  font-size: 14px;
}

th {
  font-weight: 400;
}
.table-title {
  padding: 10px;
}
.card-box {
  /* padding: 20px; */
  border: 2px solid #f3f3f3;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  /* margin-top: 100px; */
  margin-bottom: 20px;
  background-color: #ffffff;
}
.table-head {
  background-color: #f95473;
  color: white;
}
.pagination-row{
  padding-top:10px;
  
}
nav{
  width:100%;
}

li.page-item>a{
  color:#f95473;
  background-color:white;
}
li.page-item.active>a{
  color:#f95473;
  background-color: #212b5e;
  border-color: transparent;
}
.card-img{
  width:50px;
  height:50px;
}
</style>
