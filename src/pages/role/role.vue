<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- 21.传递list数据 给list组件  29 绑定自定义事件init  35绑定edit事件-->
    <v-list :list="list" @init="init" @edit="edit"></v-list>

    <!-- 2 传递info 给form  -->
     <!-- 25.绑定自定义事件init 26》设置删除接口 http里  ref 父调子组件的方法-->  
    <v-form  :info="info" @init="init" ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list.vue";
import vForm from "./components/form.vue";

// 引入列表数据接口
import { reqRoleList } from "../../utils/http";
export default {
  components: {
    vList,
    vForm,
  },
  data() {
    return {
      // 1 点击添加让弹框出来
      info: {
        isshow: false,
        title: "添加角色",
      },
      //19.列表数据初始值
      list: [],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    // 5 点击添加进行操作
    willAdd() {
      this.info = {
        isshow: true,
        title: "添加角色",
      };
    },

    // 同步20 发送请求
    init(){
      reqRoleList().then(res=>{
        this.list=res.data.list
      })
    },
    // 36 编辑方法
    edit(id){
      // 点击了之后先让弹框出来
      this.info={
        isshow :true,
        title:"编辑角色"
      }
      this.$refs.form.getOne(id)
    }
  },




  mounted() {
    // 20 一进来就要发请求 先引入列表数据接口
    this.init();
  },
};
</script>
<style scoped>
</style>