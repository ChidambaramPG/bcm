<template>
  <ul class="tags-list list-inline">
    <li
      class="tag-item list-inline-item "
      v-for="(group, index) in getAllGroups"
      :key="index"
    >
      <span
        class="item-name pl-2"
        :id="index"
        @click="event => hangleGroupsSelection(event, group)"
        v-if="group.selected == false"
        style="color:#37323e;"
        >{{ group.name }}</span
      >
      <span
        class="item-name item-selected pl-2"

        :id="index"
        @click="event => hangleGroupsSelection(event, group)"
        v-else
        > {{ group.gid }}</span
      >
    </li>

    <!-- <li v-if="isItemSelected" class="tag-item list-inline-item">
      <input class="form-control custom-tag-cat-input" 
      v-model="catName"
      style="font-size:8px;border-radius:10px;margin-top:5px;"
      />

    </li> -->
    <a href="#" v-if="isItemSelected">
      <li class="tag-item list-inline-item">
        <span
          class="item-name create-group"
          style="margin-right:5px;background-color:#2f973b"
          @click="() => hangleBulkTagCreation()"
          ><i class="fas fa-plus"></i> Remove Group</span
        >
      </li>
    </a>     
    <a href="#" v-if="isItemSelected">
      <li class="tag-item list-inline-item">
        <span
          class="item-name create-group"
          style="margin-right:5px;background-color:#f25e1f"
          @click="() => hangleBulkCategoryCreation()"
          ><i class="fas fa-plus"></i> Send Email</span
        >
      </li>
    </a>
    
  </ul>
</template>

<script>
import store from "../../../store/index.js";
// import firebase from "firebase";
export default {
  name: "GroupsFilter",
  data() {
    return {
      groupsFetched: false,
      tagsSelected: [],
      catName:'',
      isItemSelected:false
    };
  },
  created() {
    if (this.getAllGroups.length < 1 && !this.groupsFetched) {
      store.dispatch("fetchAllTags");
      this.groupsFetched = true;
    }
  },
  computed: {
    getAllGroups() {
      return store.state.categoriesList;
    },
    

  },
  methods: {
    hangleTagsSelection(event, tag) {
      store.commit("setSelectedTags", tag.gid);
      this.tagsSelected.push(tag);
    },
    hangleGroupsSelection(event,group){
        console.log(group)
        store.commit('setSelectedGroup',group)
    },
  }
};
</script>

<style scoped>
li{
  margin-bottom:5px;
}
.tag-item {
  text-decoration: none;
}
.tags-list {
  padding: 0 3px 10px 3px;
  background-color:rgb(255, 255, 255);
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
.item-name:hover{
  opacity:0.8;
}
.close-btn {
  border-width: 1px;
  background-color: white;
  margin-right:5px;
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
