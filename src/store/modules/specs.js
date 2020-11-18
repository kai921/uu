import { reqspecsList, reqspecsCount } from "../../utils/http"
const state = {
    // 分类list
    list: [],
    //总数
    total: 0,
    size: 2,
    page: 1,
}

const mutations = {
    //修改
    changeList(state, arr) {
        state.list = arr
    },
    changeTotal(state, num) {
        state.total = num;
    },
    changePage(state, page) {
        state.page = page;
    }
}

const actions = {
    // 发起请求
    reqList(context) {
        //一进来就发请求，成功之后修改list 因为是个分页 所以用到 page和 size
        reqspecsList({ page: context.state.page, size: context.state.size }).then(res => {
            // 成功之后进来判断list是否存在 存着就输出 不存在就是个空数组
            let list = res.data.list ? res.data.list : []
                // 请求到的list是字符串格式的数组，需要转一下 atters JSON.parse()  item里的每一条数据都要进行转换 

            if (list.length == 0 && context.state.page > 1) {
                context.commit("changePage", context.state.page - 1)
                context.dispatch("reqList");
                return;
            }

            //attrs JSON.parse()
            list.forEach(item => {
                item.attrs = JSON.parse(item.attrs)
            })
            context.commit("changeList", list)
        })
    },


    //请总数
    reqCount(context) {
        reqspecsCount().then(res => {
            context.commit("changeTotal", res.data.list[0].total)
        })
    },
    //修改页码
    changePage(context, page) {
        //修改页码
        context.commit("changePage", page)
            //从新请求数据
        context.dispatch("reqList")
    }

}

const getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state) {
        return state.size
    },
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}