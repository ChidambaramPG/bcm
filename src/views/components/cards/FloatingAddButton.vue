<template>
  <a href="#" class="float" v-if="getCardsSection == 'table'" @click.prevent="showAddNewCardSection">
    <i class="fa fa-plus my-float" ></i>
  </a>
</template>

<script>
import store from '../../../store/index.js';
export default {
    name:"FloatingAddButton",
    methods:{
        showAddNewCardModal(){
            store.commit('toggleNewCardModal')
        },
        showAddNewCardSection(){
            store.commit('setCardsSection','add');
        }
    },
    computed:{
        getCardsSection(){
            return store.state.cardsSecton;
        }
    }
};
</script>

<style scoped>

svg{
    color:white;
}


.float{
	position:fixed;
	width:60px;
	height:60px;
	bottom:40px;
	right:40px;
	background-color:#3578e5;
	color:#FFF;
	border-radius:50px;
	text-align:center;
	box-shadow: 2px 2px 3px rgba(153, 153, 153, 0.753);
}

.my-float{
	margin-top:22px;
}
</style>
