<template>
  <ul class="tags-list list-inline mt-3">
    <li
      class="tag-item list-inline-item "
      v-for="(tag, index) in getAllTags"
      :key="index"
    >
      <md-chip md-clickable :id="index"
        @click="event => hangleTagsSelection(event, tag)"
        v-if="tag.selected == false"
        style="font-size:11px;"
      >{{ tag.gid }}</md-chip>
      <md-chip 
        class="md-primary" md-clickable :id="index"
        @click="event => hangleTagsSelection(event, tag)"
        v-else
      >{{ tag.gid }}</md-chip>
    </li>
    <br>
    <li  class="tag-item list-inline-item">
      <input
        class="form-control custom-tag-cat-input"
        v-model="catName"
        style="font-size:11px;border-radius:10px;margin-top:5px;padding:0px 30px;"
      />
    </li>
    <a href="#" >
      <li class="">
        <md-chip
          class="md-primary"
          @click="() => hangleBulkTagCreation()"
          ><i class="fas fa-plus"></i> Add Tag</md-chip
        >
      </li>
    </a>
    <a href="#" v-if="isItemSelected">
      <li class="tag-item list-inline-item">
        <md-chip
          class="md-accent"
          @click="() => hangleBulkCategoryCreation()"
          ><i class="fas fa-plus"></i> Create Group</md-chip
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
      catName: ""
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
    getCardCategoryList() {
      return store.state.cardCategoryList;
    },
    isItemSelected() {
      return store.state.isItemSelected;
    },
    getAllCards() {
      return store.state.filteredBusinessCards;
    },
    getBulkSelectedCards() {
      return store.state.bulkSelectedCards;
    }
  },
  methods: {
    hangleTagsSelection(event, tag) {
      // store.commit("setLoadingStatus",true)
      store.dispatch("handleRemoteFetchSelectedTagsCards", tag.gid);
      this.tagsSelected.push(tag);
    },
    hangleBulkCategoryCreation() {
      if (this.catName != "") {
        if (this.getBulkSelectedCards.length > 0) {
          // console.log("bulk selectio n");
          let tempGpMembers = [];
          this.getBulkSelectedCards.forEach(item => {
            // if(item.selected){
            tempGpMembers.push(item.cid);
            // }
          });
          // console.log(tempGpMembers);
          firebase
            .firestore()
            .collection("Groups")
            .add({
              items: tempGpMembers,
              name: this.catName,
              addedBy: firebase.auth().currentUser.uid,
              addedOn: new Date(),
              status: "active"
            })
            .then(() => {
              store.commit("setActivePage", "groups");
            });
        } else {
          let tempGpMembers = [];
          this.getAllCards.forEach(item => {
            if (item.selected) {
              tempGpMembers.push(item.cid);
            }
          });
          // console.log('creating group',tempGpMembers)
          firebase
            .firestore()
            .collection("Groups")
            .add({
              items: tempGpMembers,
              name: this.catName,
              addedBy: firebase.auth().currentUser.uid,
              addedOn: new Date(),
              status: "active"
            })
            .then(() => {
              store.commit("setActivePage", "groups");
            });
        }
      } else {
        alert("name is missing");
      }
    },
    hangleBulkTagCreation() {
      if (this.catName != "") {
        
        if (this.getBulkSelectedCards.length > 0) {
          let batch = firebase.firestore().batch();
          let db = firebase.firestore();
          this.getBulkSelectedCards.forEach(item => {
            // if (item.selected) {
              let tempRef = db.collection("Cards").doc(item.cid);
              let tempTags = item.tags;
              tempTags.push(this.catName);
              batch.update(tempRef, {
                tags: tempTags
              });
            // }
          });
          batch.commit().then(() => {
            // console.log(res)
          });
        } else {
          let batch = firebase.firestore().batch();
          let db = firebase.firestore();
          let selectedCount = 0
          this.getAllCards.forEach(item => {
            if (item.selected) {
              selectedCount++
              let tempRef = db.collection("Cards").doc(item.cid);
              let tempTags = item.tags;
              tempTags.push(this.catName);
              batch.update(tempRef, {
                tags: tempTags
              });
            }
          });
          batch.commit().then(() => {
            // console.log(res)
          });

          if(selectedCount == 0){
            db.collection("Tags").doc(this.catName).set({status:'active'})
          }
        }
      } else {
        alert("name is missing");
      }
    }
  }
};
</script>

<style scoped>
li {
  margin-bottom: 5px;
}
.tag-item {
  text-decoration: none;
}
.tags-list {
  padding: 0 3px 10px 3px;
  background-color: rgb(255, 255, 255);
}
.item-name {
  padding: 5px 10px 5px 5px;
  background-color: #eee7e7;
  border-radius: 10px;
  color: white;
  font-size: 10px;
}
.item-name.item-selected {
  padding: 5px 10px 5px 5px;
  background-color: #0094ff;
  border-radius: 10px;
  color: white;
  font-size: 10px;
}
.item-name:hover {
  opacity: 0.8;
}
.close-btn {
  border-width: 1px;
  background-color: white;
  margin-right: 5px;
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
.custom-tag-cat-input {
  font-size: 10px;
}
</style>
