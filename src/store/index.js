import Vue from "vue";
import Vuex from "vuex";
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    brochureCount:150,
    businessCardsCount:100,
    categoriesCount:40,
    usersCount:20,
    brochures:[],
    businessCards:[],
    categories:[],
    allUsers:[],
    categoriesList:[],

    sidebarVisible:true,

    // page views
    activePage:'dashboard',
    categorySubTag:'all',
    cardsSecton:'table',
    usersSection:'table',
    categorySection:'table',

    // modal views
    newBrochureModalVisible:false,
    editBrochureModalVisible:false,
    deleteBrochureModalVisible:false,
    newCardsModalVisible:false,
    editCardsModalVisible:false,
    deleteCardsModalVisible:false,
    newCategoryModalVisible:false,
    
    // pagnation
    cardsListPage:1,

    // selected items
    selectedCard:[],
    selectedCardTags:[],
    selectedCategory:[]
    


  },
  mutations: {
    setActivePage: (state,payload) => {
      state.activePage = payload;
    },
    toggleNewBrochureModal: state=>{
      state.newBrochureModalVisible = !state.newBrochureModalVisible;
    },
    toggleNewCardModal: state => {
      state.newCardsModalVisible = !state.newCardsModalVisible;
    },
    toggleEditBrochureModal: state => {
      state.editBrochureModalVisible = !state.editBrochureModalVisible;
    },
    toggleDeleteBrochureModal: state => {
      state.deleteBrochureModalVisible = !state.deleteBrochureModalVisible;
    },
    toggleEditCardModal: state => {
      state.editCardsModalVisible = !state.editCardsModalVisible;
    },
    toggleDeleteCardModal: state => {
      state.deleteCardsModalVisible = !state.deleteCardsModalVisible;
    },
    toggleNewCategoryModal: state => {
      state.newCategoryModalVisible = !state.newCategoryModalVisible;
    },
    toggleNewCardSection: state => {
      state.cardsSecton = 'add'
    },
    toggleEditCard: state => {
      state.cardsSecton = 'edit'
    },
    setCardsSection: (state,payload) => {
      state.cardsSecton = payload;
    },
    setUsersSection:(state,payload) => {
      state.usersSection = payload;
    },
    setCategorySection: (state,payload) => {
      state.categorySection = payload;
    },
    setBusinessCards:(state,payload) => {
      // state.businessCards;
      state.businessCards = payload;
    },
    setSelectedCard:(state,payload)=> {
      state.selectedCard = payload;
      state.selectedCardTags = [];
      state.selectedCardTags = payload.tags;  
    },
    addTagsToCard: (state,payload) => {
      state.selectedCardTags.push(payload);
    },
    setCategoriesList:(state,payload) => {
      state.categoriesList = payload;
    },
    setSelectedCategory: (state,payload) => {
      state.selectedCategory = state.categoriesList[payload];
      state.categorySubTag = state.selectedCategory.name; 
    }
  },
  actions: {
    fetchAllBusinessCards:({state}) => {
      
      firebase.firestore().collection("Cards").onSnapshot(resp => {
        // console.log(resp)
        let cards = [];
        resp.forEach(item => {
          cards.push({...item.data(),cid:item.id})
        });
        state.businessCards = cards;
      })
    },
    fetchAllUsers: ({state}) => {
      firebase.firestore().collection("Users").onSnapshot(resp => {
        let users = [];
        resp.forEach(item => {
          users.push({...item.data(),uid:item.id})
        });
        state.allUsers = users;
      })
    },

    fetchCategoriesList:({commit}) => {
      let temp = [];
      firebase.firestore().collection('Groups').where('addedBy','==',firebase.auth().currentUser.uid)
      .get().then( resp => {
        
        resp.forEach(item => {
          temp.push({...item.data(),gid:item.id})
        })
      })
      commit('setCategoriesList',temp)
    }

  },
  modules: {

  },  
});
