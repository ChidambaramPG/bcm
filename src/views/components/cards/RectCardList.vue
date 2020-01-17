<template>
    <div class="row mb-4">
        <single-card :data="card" v-for="(card, index) in cards" :key="index"/>
    </div>  
</template>

<script>
import SingleCard from "./SingaleCard.vue";
export default {
    name:"RectCardList",
    props:['cards'],
    components:{
        SingleCard
    },
    beforeCreate(){
        console.log("before create")
    },
    created(){
        console.log("create")
    },
    beforeMount(){
        console.log("before mount")
    },
    mounted(){
        console.log("mount")
    },
}
</script>

<style>

</style>