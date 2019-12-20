<template>
  <tr>
    <td>
      <img
        class="card-img img-responsive"
        :src="card.image"
      />
    </td>
    <td>
      {{card.name}}
    </td>
    <td>{{card.address}}</td>
    <td>{{card.cName}}</td>
    <td>{{card.cPhone}}</td>
    <td>Administrator</td>
    
  </tr>
</template>

<script>
import firebase from "firebase";
export default {
  name: "CategoryItemRow",
  props:["data"],
  data(){
      return{
          card:[]
      }
  },
  computed:{
      
    
  },
  created(){
    firebase.firestore().collection('Cards').doc(this.data).get().then(resp => {
        this.card = resp.data();
    })
  }
};
</script>

<style></style>
