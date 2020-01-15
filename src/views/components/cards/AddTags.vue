<template>
  <section class="tags-section" style="font-size:10px;font-family:Lato">
      <label>Add Tags</label>
    <div class="row">
        
      <div class="col-md-8"> 
        <md-field>
          <label>Initial Value</label>
          <md-input 
            type="text"
            placeholder="personal,events,etc.."
            id="tag"
            name="tag"
          ></md-input>
        </md-field>
        <!-- <input
        style="font-size:10px;margin-bottom:10px;"
          type="text"
          class="form-control"
          placeholder="personal,events,etc.."
          id="tag"
          name="tag"
        /> -->
      </div>
      <div class="col-md-4" style="padding:0">
        <button
          style="font-size:10px;background-color:#0094ff;"
          class="btn btn-block rounded btn-new"
          @click.prevent="handleAddTag"
        >
          <span>Add</span>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 ">
        <span
          style="font-size:10px;font-weight:300;margin-bottom:10px;padding:5px;background-color:#2f973b;"
          class="badge badge-info tag-pills"
          v-for="(tag, index) in getAddedTags"
          :key="index"
          >{{ tag }} <a href="#" @click="() => handleTagRemove(tag)" style="color:white;item-decorations:none">
            <i class="fa fa-times" style="margin-left:5px;" /></a></span
        >
      </div>
    </div>
  </section>
</template>

<script>
import store from "../../../store/index.js";
export default {
  name: "AddTags",
  data(){
    return{
      selectedTags:[],
    }
  },
  methods: {
    handleAddTag() {
      
      let tag = document.getElementById("tag").value;
      if(tag.length > 3){
        store.commit("addTagsToCard", tag);
        document.getElementById("tag").value = "";
      }
      
    },
    handleTagRemove(tag){
      
      // console.l og(tag)
      store.dispatch("removeTagfromItem",tag)

    }
  },
  computed: {
    getAddedTags() {
      return store.state.selectedCardTags;
    }
  }
};
</script>

<style scoped>
.tags-section{
    margin-top:20px;
}
.tag-pills{
    margin-right:10px;
}
</style>
