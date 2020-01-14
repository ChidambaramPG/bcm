<template>
  <section class="p-2">
      <div class="row shadow p-2 ml-0 mt-4">
          <div class="col-md-11">
              <span style="font-weight:600;font-size:12px;color:#161e7a;">{{"Export Group".toUpperCase()}}</span>
          </div>
          <div v-if="!showExporSection" class="col-md-1" style="text-align:right;">
              <a href="#" @click.prevent="toggleExportSection">
                  <i class="fas fa-arrow-down fa-sm" style="color:#161e7a"></i>
              </a>
          </div>
          <div v-if="showExporSection"  class="col-md-1" style="text-align:right;">
              <a href="#" @click.prevent="toggleExportSection">
                  <i class="fas fa-arrow-up fa-sm" style="color:#161e7a"></i>
              </a>
          </div>
      </div>
      <div class="row ml-0 mt-4" v-if="showExporSection">
          <div class="col-md-3">
              <button style="font-size:10px;" class="btn btn-primary" @click="() => exportGroup('csv')">Export As CSV</button>
          </div>
          <div class="col-md-3">
              <button style="font-size:10px;" class="btn btn-primary">Export As PDF</button>
          </div>
          <div class="col-md-3">
              <button style="font-size:10px;" class="btn btn-primary">Export As Excel</button>
          </div>
          
      </div>
      
  </section>
</template>

<script>
import store from "../../../store/index.js";
export default {
    name:'ExportList',
    data(){
        return{
            showExporSection:false
        }
    },
    methods:{
        toggleExportSection(){
            this.showExporSection = !this.showExporSection;
        },
        exportGroup(type){
            store.commit('exportSelectedGroup',type)
        }
    },
    
}
</script>

<style>

</style>