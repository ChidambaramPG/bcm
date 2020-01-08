<template>
  <section class="p-2">
      <div class="row shadow p-2 ml-0 mt-4">
          <div class="col-md-11">
              <span style="font-weight:600;font-size:12px;color:#161e7a;">{{"Group Email".toUpperCase()}}</span>
          </div>
          <div v-if="!showEmailSection" class="col-md-1" style="text-align:right;">
              <a href="#" @click.prevent="toggleEmailSection">
                  <i class="fas fa-arrow-down fa-sm" style="color:#161e7a"></i>
              </a>
          </div>
          <div v-if="showEmailSection"  class="col-md-1" style="text-align:right;">
              <a href="#" @click.prevent="toggleEmailSection">
                  <i class="fas fa-arrow-up fa-sm" style="color:#161e7a"></i>
              </a>
          </div>
      </div>
      <div class="row ml-0 mt-4" v-if="showEmailSection">
          <div class="col-md-10">
              <form action="">
                  <div class="form-group">
                      <input style="font-size:10px;" type="text" class="form-control" placeholder="Subject"/>
                  </div>
                  <div class="form-group">
                      <textarea style="font-size:10px;" rows="10" type="text" class="form-control" placeholder="Content"/>
                  </div>
              </form>
              
          </div>
          <div class="col-md-2">
              <button style="font-size:10px;" class="btn btn-primary">Send Mail</button>
          </div>
      </div>
      
  </section>
</template>

<script>
export default {
    name:"EmailSeciton",
    data(){
        return{
            showEmailSection:false
        }
    },
    methods:{
        toggleEmailSection(){
            this.showEmailSection = !this.showEmailSection;
        }
    }
}
</script>

<style>

</style>