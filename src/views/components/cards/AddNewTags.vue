<template>
  <section class="tags-section" >
      <label>Add Tags</label>
    <div class="row">
        
      <div class="col-md-8"> 
        <md-field>
          <!-- <label>Initial Value</label> -->
          <md-input 
            type="text"
            placeholder="personal,events,etc.."
            id="tag"
            name="tag"
          ></md-input>
          <md-button class="md-raised md-primary" @click.prevent="handleAddTag">Add New Tag</md-button>
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
      <!-- <div class="col-md-4" style="padding:0">
        <button
          style="font-size:10px;background-color:#0094ff;"
          class="btn btn-block rounded btn-new"
          @click.prevent="handleAddTag"
        >
          <span>Add</span>
        </button>
      </div> -->
    </div>
    <div class="row">
      <div class="col-md-12 ">
        <span             
          style="background-color:#3578e5;font-size:13px;margin:5px;font-weight:300;padding:5px;"      
          class="badge badge-info tag-pills"
          v-for="(tag, indx) in selectedTags"
          :key="indx+tag"
          @click="() => addTagToCard(tag)"
          >{{ tag }}</span
        >
        <span
          style="background-color:#e9ebee;font-size:13px;color:#4b4f56;margin:5px;font-weight:300;padding:5px;" 
          class="badge badge-info tag-pills"
          v-for="(tag, index) in unselectedTags"
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
import firebase from "firebase";
export default {
  name: "AddNewTags",
  data(){
    return{
      allTags:[],
      selectedTags:[],
      unselectedTags:[]
    }
  },
  created(){
    firebase.firestore().collection('Tags')
      .onSnapshot(resp => {
        // temp = [];
        let temp = [];
        // console.log("fetched again")
        resp.forEach(item => {
          temp.push({...item.data(),gid:item.id,selected:false})
        })
        // console.log("fetched tags:",temp)
        this.allTags = temp;
        this.unselectedTags = temp;
      })

  },
  methods: {
    handleAddTag() {
      let tag = document.getElementById("tag").value;
      if(tag.length > 3 ){        
        store.commit("addTagsToCard", tag);
        document.getElementById("tag").value = "";
      }
      
    },
    addTagToCard(gid){
      
      if(this.selectedTags.length < 1){
        this.selectedTags.push(gid)
        // console.log(this.selectedTags)
      }else{
        let itemFound = false;
        this.selectedTags.forEach(item => {
          if(item == gid){
            itemFound = true;
          }
        })
        if(itemFound){
          this.selectedTags = this.selectedTags.filter(item2 => {
            return item2 != gid;
          })
        }else{
          this.selectedTags.push(gid)
        }
        // console.log(this.selectedTags)
        
      }

      this.unselectedTags = this.unselectedTags.filter(item3=> {
        return item3.gid != gid;
      })

      store.commit("addTagsToCard", gid);
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
