import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
import actions from "./actions"
import { state, mutations, getters } from "./mutations"
import order from "./modules/order"
// 引入cate 
import cate from "./modules/cate"
// 引入specs
import specs from "./modules/specs"
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,

    modules: {
        order,
        cate,
        specs
    }
})