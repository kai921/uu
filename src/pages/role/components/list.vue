<template>
  <div>
    <!-- 23.list展示在页面  写在data -->
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="角色编号" sortable></el-table-column>

      <el-table-column prop="rolename" label="角色名称" sortable></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary">启用</el-button>
          
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
           <!-- 32.绑定confirm事件 -->
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqRoleDel } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  // 22.接收list 
  props: ["list"],
    
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
     // 27 删除
    del(id) {
      //删除的请求
      reqRoleDel(id).then(res => {
        if (res.data.code == 200) {
          //成功的弹框
          successAlert(res.data.msg);
          //28.通知父组件刷新list
          this.$emit("init");
        }
      });
    },

// 34 点了编辑 通知父组件点的当前这条id
    edit(id){
this.$emit("edit",id)
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>