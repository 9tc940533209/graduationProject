import Vue from 'vue'
import vuex from 'vuex'

import dialog from './modules/dialog'


Vue.use(vuex)

export default new vuex.Store({
  state:{
    opean: 0,
    comid: 0
  },
  mutations:{
    changeadd(state,id){
      state.opean = 1
      state.comid = id
    },
    changeder(state){
      state.opean = 0
    },
  },
	modules: {
    dialog,  
  }
})
