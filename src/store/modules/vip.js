import { reqmemberlist } from "../../utils/http"
const state = {
    list: []
}

const mutations = {
    changeList(state, arr) {
        state.list = arr
    }
}

const actions = {
    //发请求
    reqList(context) {
        reqmemberlist().then(res => {
            context.commit("changeList", res.data.list)
        })
    }
}

const getters = {
    list(state) {
        return state.list
    }
}

export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true
}