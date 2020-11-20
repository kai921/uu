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
import goods from "./modules/goods"
import vip from "./modules/vip"
import banner from "./modules/banner"
import seckill from "./modules/seckill"
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,

    modules: {
        order,
        cate,
        specs,
        goods,
        vip,
        banner,
        seckill
    }
})