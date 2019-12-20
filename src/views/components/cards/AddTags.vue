<template>
  <section class="tags-section">
      <label>Add Tags</label>
    <div class="row">
        
      <div class="col-md-10"> 
        <input
          type="text"
          class="form-control"
          placeholder="personal,events,etc.."
          id="tag"
          name="tag"
        />
      </div>
      <div class="col-md-2">
        <button
          class="btn btn-block rounded btn-new"
          @click.prevent="handleAddTag"
        >
          <span>Add</span>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-10 ">
        <span
          class="badge badge-info tag-pills"
          v-for="(tag, index) in getAddedTags"
          :key="index"
          >{{ tag }}</span
        >
      </div>
    </div>
  </section>
</template>

<script>
import store from "../../../store/index.js";
export default {
  name: "AddTags",
  methods: {
    handleAddTag() {
      let tag = document.getElementById("tag").value;
      store.commit("addTagsToCard", tag);
      document.getElementById("tag").value = "";
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
