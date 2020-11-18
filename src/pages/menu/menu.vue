<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>

    <!-- 列表页面 -->
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>

    <!-- 弹框页面 -->
    <!-- 3.将弹框方法 传递给form -->
    <v-form :info="info" :list="list" @init="init" ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqMenuList } from "../../utils/http";
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
export default {
  data() {
    return {
      info: {
        // 1. 定义一个状态
        isshow: false,
        title:"添加菜单"
      },
      //16.列表数据
      list: [],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    // 2.设置方法 点击弹出弹框
    willAdd() {
      this.info.isshow = true;
      this.info.title = "添加菜单"
    }, 
    
    //26 处理
    init() {
      reqMenuList().then((res) => {
        this.list = res.data.list;
      });
    },

    edit(id) {
      //弹框出现
      this.info.isshow = true;
      // 34.给info补了一个字段，用来判断是添加还是编辑打开的弹框
      this.info.title = "编辑菜单";
      //37.父组件调用子组件 form.vue 的getOne()
      this.$refs.form.getOne(id);
    },
  },


  mounted() {
    //17.一进来就要请求数据
    this.init();
  },
  //33.处理编辑

  components: {
    vList,
    vForm,
  },
};
</script>
<style scoped>
</style>