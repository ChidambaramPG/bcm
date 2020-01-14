<template>
  <div class="col-md-3 shadow p-3 mr-5 mb-3">
    <div class="row">
      <div class="col-md-4" style="text-align:center;margin-top:10px;">
        <img class="rounded-circle" style="width:100%;" :src="user.image" />
      </div>
      <div class="col-md-8 border-left">
        <div class="row">
          <div class="col-md-8">
            <span
              style="text-align:left !important;font-size:10px;font-weight:700;"
              >{{ user.name.toUpperCase() }}</span
            >
          </div>
          <div
            class="col-md-4"
            style="text-align:right !important;font-size:10px;color:#2f973b"
          >
            <span>Active</span>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <span style="text-align:right !important;font-size:10px;">{{
              user.address
            }}</span>
          </div>
        </div>
        <div class="row">
          <div class="col-md-9">
            <span style="text-align:right !important;font-size:10px;">{{
              user.phone
            }}</span>
          </div>
          <div class="col-md-3" v-if="user.phone!=''">
              <a :href="'tel:'+user.phone">
                  <i style="font-size:12px;color:#2f973b" class="fas fa-phone fas-sm"></i>
              </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="col-md-3 mb-2" style="">
    <md-card class="" md-with-hover>
      <md-ripple>
        <md-card-header>
          <div class="md-title">
            <md-avatar class="md-large">
              <img :src="user.image" alt="People">
            </md-avatar>
          </div>
          <div class="md-subhead">{{user.name.toUpperCase()}}</div>
          
        </md-card-header>

        <md-card-content>
          <div class="row">
            <div class="col-md-3">
              <md-icon class="md-primary fas fa-phone fa-sm"></md-icon>
            </div>
            <div class="col-md-9">
              {{user.phone}}
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button class="md-primary">View</md-button>
          <md-button class="md-accent">Delete</md-button>
        </md-card-actions>
      </md-ripple>
    </md-card>
  </div> -->
  
</template>

<script>

export default {
  name: "SingleUser",
  props:['user'],
};
</script>

<style></style>
