import axios from "axios"
import qs from "qs"
import { errorAlert } from "./alert"
import store from "../store"
import router from "../router"
import Vue from "vue"
//开发环境使用 8080
let baseUrl = "/aa"
Vue.prototype.$imgPre = "http://localhost:3000"

//生产环境使用 打包
// let baseUrl=""
// Vue.prototype.$imgPre=""

// 当打开token验证的时候需要在响应拦截前引入并设置请求拦截token验证
// 请求拦截  interceptors:拦截  request：需求  authorization：授权
axios.interceptors.request.use(req => {
    if (req.utl != baseUrl + "/api/userlogin") {
        req.headers.authorization = store.state.userInfo.token;
    }
    return req
})


//响应拦截
axios.interceptors.response.use(res => {
    console.log("本次请求地址是：" + res.config.url);
    console.log(res);

    // 13 统一处理失败，组件内只需要处理成功即可 要引进失败方法
    if (res.data.code != 200) {
        errorAlert(res.data.msg)
    }
    if (res.data.msg === "登录已过期或访问权限受限") {
        //掉线了 清除登录信息
        store.dispatch("changeUser", {})
            // 跳转到登录页面
        router.push("/login")
    }
    return res
})

// ===========菜单接口 开始====================

//13.添加
export const reqMenuAdd = (form) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(form)
    })
}

//18.列表交互
export const reqMenuList = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: {
            istree: true
        }
    })
}

// 29.删除
export const reqMenuDel = (id) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 35.获取一条数据
export const reqMenuDetail = (id) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

// 38.修改
export const reqMenuUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(form)
    })
}


// ===========角色接口 开始====================
//  8 角色添加接口
export const reqRoleAdd = (user) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(user)
    })
}

// 18 设置列表接口 19》role
export const reqRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get",

    })
}

//26.删除 27》封装删除方法component里delBtn
export const reqRoleDel = (id) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 33 编号  详情
export const reqRoleDetail = id => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

// 38.修改
export const reqRoleUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(user)
    })
}

// ===========角色接口 结束====================

// ===========管理员接口 开始====================

// 8.添加
export const reqUserAdd = (user) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(user)
    })
}

//18.列表 p={page:1,size:10}
export const reqUserList = (p) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: p
    })
}

//26.删除
export const reqUserDel = (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify({
            uid: uid
        })
    })
}

// 33.详情
export const reqUserDetail = uid => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: {
            uid: uid
        }
    })
}



// 38.修改
export const reqUserUpdate = (user) => {
        return axios({
            url: baseUrl + "/api/useredit",
            method: "post",
            data: qs.stringify(user)
        })
    }
    // 52 总数
export const reqUserCount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get",

    })
}

//1.登录
export const reqLogin = (user) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(user)
    })
}

// ===========管理员接口 结束====================

// ===========分类接口 开始====================

// 添加！接口里有图片 就不能再用qs.stringify  要用ForData
export const reqcateAdd = (cate) => {
    // 假数据 cate = { name:"",img:File,age:20}

    let d = new FormData()
        // 使用ForData的格式
        // d.append("name",12)
        // d.append("img",file)
        // d.append("age",20)
        // cate 是参数 循环一个{}类型 用for...in... key是i，值是cate[i]
    for (let i in cate) {
        d.append(i, cate[i])
    }
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: d
    })
}

// 列表 p={istree:true} p = {pid:1}
export const reqcateList = (p) => {
        return axios({
            url: baseUrl + "/api/catelist",
            method: "get",
            params: p
        })
    }
    // 删除 
export const reqcateDel = (id) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 详情
export const reqcateDetail = id => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//修改文件 
export const reqcateUpdate = (cate) => {
    let d = new FormData()
    for (let i in cate) {
        d.append(i, cate[i])
    }
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: d
    })
}

// ===========分类接口 结束====================
// ===========规格接口 开始====================

//添加
export const reqspecsAdd = (user) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(user)
    })
}

// 列表
export const reqspecsList = (p) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: p
    })
}

//删除
export const reqspecsDel = (id) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 详情
export const reqspecsDetail = id => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//修改文件
export const reqspecsUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(user)
    })
}

export const reqspecsCount = () => {
    return axios({
        url: baseUrl + "/api/specscount",
        method: "get"
    })
}

// ===========规格接口 结束====================

// ===========商品管理接口 开始====================

//添加
export const reqgoodsAdd = (user) => {
    console.log(user);
    let d = new FormData()
    for (let i in user) {
        d.append(i, user[i])
    }

    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: d
    })
}

// 列表
export const reqgoodsList = (p) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: p
    })
}

//删除
export const reqgoodsDel = (id) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 详情
export const reqgoodsDetail = id => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//修改文件
export const reqgoodsUpdate = (user) => {
    let d = new FormData()
    for (let i in user) {
        d.append(i, user[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: d
    })
}


// 商品总数
export const reqgoodsCount = () => {
    return axios({
        url: baseUrl + "/api/goodscount",
        method: "get"
    })
}

// ===========商品管理接口 结束====================

// ===========会员接口 开始====================
//会员管理 开始

//列表
export const reqmemberlist = () => {
        return axios({
            url: baseUrl + "/api/memberlist",
            method: "get",

        })
    }
    //详情
export const reqmemberDetail = uid => {
        return axios({
            url: baseUrl + "/api/memberinfo",
            method: "get",
            params: {
                uid: uid
            }
        })
    }
    //修改
export const reqmemberUpdate = (user) => {

    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data: qs.stringify(user)
    })
}


// ===========会员接口 结束====================

// ===========轮播图  开始====================
// 列表
export const reqBannerList = (p) => {

        return axios({
            url: baseUrl + "/api/bannerlist",
            method: "get",
            params: p
        })
    }
    //详情
export const reqBannerDetail = (id) => {

        return axios({
            url: baseUrl + "/api/bannerinfo",
            method: "get",
            params: {
                id: id
            }
        })
    }
    //更新
export const reqBannerUpdate = (user) => {
    let d = new FormData()
    for (let i in user) {
        d.append(i, user[i])
    }
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: d
    })
}

export const reqBannerDel = (id) => {

    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        params: {
            id: id
        }
    })
}

//添加 文件
export const reqBannerAdd = (user) => {
    console.log(user)
    let d = new FormData()
    for (let i in user) {
        d.append(i, user[i])
    }
    return axios({
        url: baseUrl + '/api/banneradd',
        method: 'post',
        data: d
    })
}

// ===========轮播图 结束====================
// ===========秒杀 开始====================


//列表
export const reqSeckList = () => {
        return axios({
            url: baseUrl + '/api/secklist',
            method: 'get'
        })
    }
    //添加
export const reqSeckAdd = (user) => {
    return axios({
        url: baseUrl + "/api/seckadd",
        method: 'post',
        data: qs.stringify(user)
    })
}

//获取一条数据
export const reqSeckDetail = (id) => {
    return axios({
        url: baseUrl + '/api/seckinfo',
        method: 'get',
        params: {
            id: id
        }
    })
}

//修改
export const reqSeckUpdate = (user) => {
    return axios({
        url: baseUrl + '/api/seckedit',
        method: 'post',
        data: qs.stringify(user)
    })
}

//删除
export const reqSeckDel = (id) => {
    console.log(id)
    return axios({
        url: baseUrl + '/api/seckdelete',
        method: 'post',
        data: qs.stringify({ id })
    })
}

// ===========秒杀 结束====================