<template>
  <div class="col-md-3 mr-5 mb-4 shadow rounded">
    <div class="row">
      <div class="col-md-3">
        <div class="row" style="text-align:center;">
          <!-- <i style="color:red" class="fas fa-circle" /> -->
          <img
            class="rounded-circle ml-2 mt-2"
            style="width:100%;"
            :src="data.image"
            v-if="data.image != undefined"
          />
          <img
            class="rounded-circle ml-2 mt-2"
            style="height:auto;"
            src="../../../assets/img/card.jpg"
            v-else
          />
        </div>
      </div>
      <div class="col-md-9">
        <div class="row">
          <div class="col-md-9" style="text-align:left;">
            <span
              style="font-size:11px;font-weight:700;"
              v-if="data.cFirstname != ''"
              >{{ data.cFirstname.toUpperCase()
              }}</span
            >
            <span style="font-size:11px;font-weight:700" v-else>{{
              "not added".toLowerCase()
            }}</span>
            <p
              style="font-size:9px;font-weight:300;color:#0094ff;"
              class="m-0"
              v-if="data.cPhone != ''"
            >
              {{ data.cPhone }}
            </p>
            <p
              style="font-size:9px;font-weight:300;color:#0094ff;"
              class="m-0"
              v-else
            >
              {{ "not added".toLowerCase() }}
            </p>
            <p
              style="font-size:9px;font-weight:300;color:#0094ff;"
              class="m-0"
              v-if="data.cEmail != ''"
            >
              {{ data.cEmail }}
            </p>
            <p
              style="font-size:9px;font-weight:300;color:#0094ff;"
              class="m-0"
              v-else
            >
              {{ "not added".toLowerCase() }}
            </p>
          </div>

          <div class="col-md-3 pr-0" style="text-align:right;">
            <div v-if="data.selected" class="card-selector">
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  :id="data.cid"
                  @click="handleSelectedCard"
                  checked
                />
                <label class="custom-control-label" :for="data.cid"></label>
              </div>
            </div>
            <div v-else class="card-selector">
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  :id="data.cid"
                  @click="handleSelectedCard"
                />
                <label class="custom-control-label" :for="data.cid"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row border-top pb-2 mt-2">
      <div class="col-md-8" style="text-align:left;">
        <span
          style="margin-right:2px;font-size:9px;font-weight:300;background-color:#0094ff;color:white"
          class="badge badge-pill"
          v-for="(tag, index) in data.tags.slice(0, 2)"
          :key="index"
          >{{ tag }}</span
        >
        <span
          style="margin-right:2px;font-size:9px;font-weight:300;background-color:#f25e1f;color:white"
          class="badge badge-pill"
          v-if="data.tags.length > 2"
          >{{ data.tags.length - 2 }} more</span
        >
        <span
          v-else-if="data.tags.length < 1"
          style="margin-right:2px;font-size:9px;font-weight:300;color:red"
          >No tags added</span
        >
      </div>
      <div class="col-md-4" style="text-align:right">
        <a
          href="#"
          @click.prevent="() => showEditCard()"
          style="color:#3dc24c;margin-right:5px;"
        >
          <i class="fas fa-pencil-alt fa-xs"></i>
        </a>
        <a href="#" style="color:#f25e1f;" @click="handleCardDelete">
          <i class="fas fa-trash fa-xs"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../../store/index.js";
import firebase from "firebase";
export default {
  name: "SingleCard",
  props: ["data"],
  methods: {
    
    showEditCard() {
      store.commit("setCardsSection", "edit");
      store.commit("setSelectedCard", this.data);
    },
    handleSelectedCard() {
      // console.log(this.data)
      store.commit("setSelectedCardListManually", this.data);
    },
    handleCardDelete(){
      firebase.firestore().collection("Cards").doc(this.data.cid).update({status:"inactive"});
    }
    
  }
};
</script>

<style></style>
