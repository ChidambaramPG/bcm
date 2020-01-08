<template>
  <section class="mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="filter-header">
          <h5
            class="table-title shadow-sm mb-4 p-3"
            style="font-weight:600;font-size:12px;color:#161e7a;"
          >
            {{ "Lists".toUpperCase() }}
          </h5>
          <groups-filter />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import store from "../../../store/index.js";
import GroupsFilter from "./GroupsFIlter.vue";

export default {
  name: "GroupsList",
  components: {
    GroupsFilter
  },
  data() {
    return {
      categoryListFetched: false,
      businessCardsFetched: false
    };
  },
  created() {
    if (!this.businessCardsFetched) {
      store.dispatch("fetchAllBusinessCards");
      this.businessCardsFetched = true;
    }
    if (!this.categoryListFetched) {
      store.dispatch("fetchCategoriesList");
      this.categoryListFetched = true;
    }
  },
  methods: {
    convertName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
    setCategoriesTable() {
      store.commit("setSelectedCategory", this.index);
    }
  },
  props: ["name", "index"],
  computed: {
    activeCategory() {
      return store.state.categorySubTag;
    },
    getSelectedCategory() {
      return store.state.selectedCategory;
    },
    getAllGroups() {
      return store.state.categoriesList;
    }
  }
};
</script>

<style></style>
