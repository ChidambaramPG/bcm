<template>
    <div class="row header-row">
        
        <div class="col-md-2">
            <button class="btn btn-block rounded btn-new" @click="showAddNewBrochureModal">
                <i class="fas fa-plus-circle"></i><span> Add New</span>
            </button>
            
        </div>
        
    </div>

</template>
<script>
import store from '../../../store/index.js';
export default {
    name:'BrochureHeader',
    methods:{
        showAddNewBrochureModal(){
            store.commit('toggleNewBrochureModal')
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