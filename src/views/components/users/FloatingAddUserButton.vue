<template>
  <a href="#" class="float" v-if="getUsersSection == 'table'" @click.prevent="showAddNewUserSection">
    <i class="fa fa-plus my-float"></i>
  </a>
</template>

<script>
import store from '../../../store/index.js';
export default {
    name:"FloatingAddUserButton",
    methods:{
        showAddNewCardModal(){
            store.commit('toggleNewCardModal')
        },
        showAddNewUserSection(){
            store.commit('setUsersSection','add');
        }
    },
    computed:{
        getUsersSection(){
            return store.state.usersSection;
        }
    }
};
</script>

<style scoped>


.float{
	position:fixed;
	width:60px;
	height:60px;
	bottom:40px;
	right:40px;
	background-color:#3dc24c;
	color:#FFF;
	border-radius:50px;
	text-align:center;
	box-shadow: 2px 2px 3px rgba(153, 153, 153, 0.753);
}

.my-float{
	margin-top:22px;
}
</style>
