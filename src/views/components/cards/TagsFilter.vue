<template>
  <ul class="tags-list list-inline">
    <li
      class="tag-item list-inline-item"
      v-for="(tag, index) in getAllTags"
      :key="index"
    >
      <span
        class="item-name"
        :id="index"
        @click="event => hangleTagsSelection(event, tag)"
        v-if="tag.selected == false"
        ><i class="fas fa-times close-btn"></i> {{ tag.gid }}</span
      >
      <span
        class="item-name item-selected"
        :id="index"
        @click="event => hangleTagsSelection(event, tag)"
        v-else
        ><i class="fas fa-times close-btn"></i> {{ tag.gid }}</span
      >
    </li>

    <li v-if="isItemSelected" class="tag-item list-inline-item">
      <input class="form-control custom-tag-cat-input" v-model="catName"/>

    </li>    
    <a href="#" v-if="isItemSelected">
      <li class="tag-item list-inline-item">
        <span
          class="item-name create-group"
          @click="event => hangleBulkCategoryCreation(event, tag)"
          ><i class="fas fa-plus"></i> Create Group</span
        >
      </li>
    </a>
    <a href="#" v-if="isItemSelected">
      <li class="tag-item list-inline-item">
        <span
          class="item-name create-group"
          @click="event => hangleBulkTagCreation(event, tag)"
          ><i class="fas fa-plus"></i> Add Tag</span
        >
      </li>
    </a>  
  </ul>
</template>

<script>
import store from "../../../store/index.js";
import firebase from "firebase";
export default {
  name: "TagsFilter",
  data() {
    return {
      tagsFetched: false,
      tagsSelected: [],
      catName:''
    };
  },
  created() {
    if (this.getAllTags.length < 1 && !this.tagsFetched) {
      store.dispatch("fetchAllTags");
      this.tagsFetched = true;
    }
  },
  computed: {
    getAllTags() {
      return store.state.allTags;
    },
    getCardCategoryList(){
      return store.state.cardCategoryList;
    },
    isItemSelected(){
      return store.state.isItemSelected;
    },
    getAllCards() {
      return store.state.filteredBusinessCards;
    },

  },
  methods: {
    hangleTagsSelection(event, tag) {
      store.commit("setSelectedTags", tag.gid);
      this.tagsSelected.push(tag);
    },
    hangleBulkCategoryCreation(){
      if(this.catName != ''){
        let tempGpMembers = []
        this.getAllCards.forEach(item=> {
          if(item.selected){
            tempGpMembers.push(item.cid)            
          }
        })
        firebase.firestore().collection('Groups').add({
           items:tempGpMembers,
          name:this.catName,
          addedBy:firebase.auth().currentUser.uid,
          addedOn:(new Date()),
          status:'active'
        })
      } else{
        alert("name is missing")
      } 
    },
    hangleBulkTagCreation(){
      if(this.catName != ''){
        var batch = firebase.firestore().batch();
        var db = firebase.firestore();
        this.getAllCards.forEach(item=> {
          if(item.selected){
            let tempRef = db.collection('Cards').doc(item.cid);
            let tempTags = item.tags;
            tempTags.push(this.catName)
            batch.update(tempRef,{
              tags:tempTags
            })
          }
        })
        batch.commit().then(res => {
          console.log(res)
        })
      }else{
        alert("name is missing")
      }
    }
  }
};
</script>

<style scoped>
.tag-item {
  text-decoration: none;
}
.tags-list {
  margin-left: 20px;
}
.item-name {
  padding: 5px 10px 5px 5px;
  background-color: #eee7e7;
  border-radius: 10px;
  color: #3d3b3b;
  font-size: 10px;
}
.item-name.item-selected {
  padding: 5px 10px 5px 5px;
  background-color: #205ad6;
  border-radius: 10px;
  color: white;
  font-size: 10px;
}

.close-btn {
  border-width: 1px;
  background-color: #3d3b3b;
  border-radius: 10px;
  padding: 5px;
}

.item-selected .close-btn {
  border-width: 1px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 5px;
}

.create-group {
  padding: 5px 10px 5px 5px;
  background-color: #f52552;
  border-radius: 10px;
  color: white;
  font-size: 10px;
}

.create-group .close-btn {
  border-width: 1px;
  background-color: #ffffff;
  color: #f52552;
  border-radius: 10px;
}
.custom-tag-cat-input{
  font-size:10px;
}
</style>
