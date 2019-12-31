<template>
    <div class="row header-row">
        
        <div class="col-md-2" v-if="getCardsSection == 'table'">
            <button class="btn btn-block rounded btn-new" @click="showAddNewCardSection">
                <i class="fas fa-plus-circle"></i><span> Add New</span>
            </button>
            
        </div>
        
        
    </div>

</template>
<script>
import store from '../../../store/index.js';
export default {
    name:'CardsHeader',
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
}
</script>
<style scoped>
    .header-row{
        margin-top:10px;
    }
    .btn-new{
        background-color:#f95473;
        color:white;
    }
</style>