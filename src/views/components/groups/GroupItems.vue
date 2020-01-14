<template>
  <section class="mt-5" style="">
    <div class="row">
      <div class="col-md-12">
        <div class="row shadow ml-2 p-3">
          <div class="col-md-10">
            <h5
              class="table-title "
              style="font-weight:600;font-size:12px;color:#161e7a;"
            >
              {{ "Members".toUpperCase() }}
            </h5>
          </div>
          <div class="col-md-2" style="text-align:right;" v-if="!isAddMemberOn">
            <a href="#" @click.prevent="addMembers">
              <i style="color:#161e7a;" class="fas fa-plus fa-sm"></i>
            </a>
          </div>
          <div class="col-md-2" style="text-align:right;" v-if="isAddMemberOn">
            <a href="#" @click.prevent="cancelAddMemberMethod">
              <i
                style="color:#161e7a;margin-left:5px;"
                class="fas fa-times fa-sm"
              ></i>
            </a>
            <a href="#" @click.prevent="saveMembers">
              <i
                style="color:#161e7a;margin-left:5px;color:green"
                class="fas fa-check fa-sm"
              ></i>
            </a>
          </div>
        </div>
        <!-- <div class="filter-header">
          <h5
            class="table-title shadow-sm mb-4 p-3"
            style="font-weight:600;font-size:12px;color:#161e7a;width:80%"
          >
            {{ "Members".toUpperCase() }}

            
          </h5>
          
          
        </div> -->
      </div>
    </div>
    <div class="row pl-3 mt-3" v-if="!isAddMemberOn">
      <single-card
        :data="card"
        v-for="(card, index) in getGroupItems"
        :key="index"
      />
    </div>
    <div class="row pl-3 " v-if="isAddMemberOn">
      <single-card
        :data="card"
        v-for="(card, index) in allCards"
        :key="index"
      />
    </div>
  </section>
</template>

<script>
import store from "../../../store/index.js";
import SingleCard from "./SingleCard.vue";
import firebase from "firebase";
export default {
  name: "GroupItems",
  data() {
    return {
      isAddMemberOn: false,
      allCards:[]
    };
  },
  components: {
    SingleCard
  },
  computed: {
    getGroupItems() {
      return store.state.selectedcardGroupItems;
    },
    getAllItems(){
      return store.state.businessCards;
    }
  },
  methods: {
    addMembers() {
      this.isAddMemberOn = true;
      let allCards = store.state.businessCards;
      let groupCards = this.getGroupItems;
      // console.log(groupCards)
      let temp = []
      allCards.forEach(card => {
        let tempItem = {...card};
        groupCards.forEach(gCard => {
          // console.log(card.cid,gCard.cid)
          if(tempItem.cid == gCard.cid){
            tempItem.selected = true;
          }
         
        })
        temp.push(tempItem)
        
      })

      
      this.allCards = temp;
    },
    cancelAddMemberMethod() {
      this.isAddMemberOn = false;
      this.allCards = [];
      
    },
    saveMembers() {
      this.isAddMemberOn = false;
      this.allCards = []
      let gid = store.state.selectedGroupId;
      let cList = store.state.selectedcardGroupItems;

      if(gid != ''){
        let tempGpMembers = []
        cList.forEach(item=> {
          tempGpMembers.push(item.cid)
        })
        firebase.firestore().collection('Groups').doc(gid).update({
          items:tempGpMembers,
        }).then(() => {
          store.commit("setActivePage", 'lists');
        })
      } else{
        alert("name is missing")
      } 
    },

  }
};
</script>

<style></style>
