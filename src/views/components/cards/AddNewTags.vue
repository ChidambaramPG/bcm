<template>
  <section class="tags-section" style="font-size:10px;font-family:Lato">
      <label>Add Tags</label>
    <div class="row">
        
      <div class="col-md-8"> 
        <input
        style="font-size:10px;margin-bottom:10px;"
          type="text"
          class="form-control"
          placeholder="personal,events,etc.."
          id="tag"
          name="tag"
        />
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
          style="font-size:10px;font-weight:300;margin-bottom:10px;padding:5px;background-color:grey;"
          class="badge badge-info tag-pills"
          v-for="(tag, index) in getAllTags"
          :key="index"
          @click="() => addTagToCard(tag.gid)"
          >{{ tag.gid }}</span
        >
      </div>
    </div>
  </section>
</template>

<script>
import store from "../../../store/index.js";
export default {
  name: "AddNewTags",
  methods: {
    handleAddTag() {

      let tag = document.getElementById("tag").value;
      store.commit("addTagsToCard", tag);
      document.getElementById("tag").value = "";
    },
    addTagToCard(){

    }
  },
  computed: {
    getAddedTags() {
      return store.state.selectedCardTags;
    },
    getAllTags(){
      return store.state.allTags
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
