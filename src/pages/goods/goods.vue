<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list @edit="edit"></v-list>

    <v-form :info="info" ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";
export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "添加商品",
      },
    };
  },
  components: {
    vList,
    vForm,
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    willAdd() {
      this.info = {
        isshow: true,
        title: "添加商品",
      };
    },

    //父组件收到编辑
    edit(id) {
      // 受限让弹框先出来
      this.info = {
        isshow: true,
        title: "编辑商品",
      };
      this.$refs.form.getOne(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>