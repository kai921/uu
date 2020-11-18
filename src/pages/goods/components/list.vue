<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="商品编号" sortable></el-table-column>
      <el-table-column prop="specsname" label="商品名称" sortable></el-table-column>
      <el-table-column prop="specsname" label="商品价格" sortable></el-table-column>
      <el-table-column prop="specsname" label="市场价格" sortable></el-table-column>
      <el-table-column prop="specsname" label="图片" sortable></el-table-column>
      <el-table-column prop="specsname" label="是否新品" sortable>
        <el-button type="danger">否</el-button>
      </el-table-column>
      <el-table-column prop="specsname" label="是否热卖" sortable>
        <el-button type="primary">是</el-button>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
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

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert } from "../../../utils/alert";
import { reqspecsDel } from "../../../utils/http";
export default {
  computed: {
    ...mapGetters({
      // 用数据
      list: "specs/list",
      total: "specs/total",
      size: "specs/size",
    }),
  },
  methods: {
    //用方法
    ...mapActions({
      reqList: "specs/reqList",
      reqCount: "specs/reqCount",
      changePage: "specs/changePage",
    }),
    //删除
    del(id) {
      reqspecsDel(id).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          this.reqList();
          this.reqCount();
        }
      });
      console.log(111);
    },
    //编辑
    edit(id) {
      // 通知父组件该编辑了
      this.$emit("edit", id);
    },
  },
  mounted() {
    // 一进页面就发请求
    this.reqList();
    this.reqCount();
  },
};
</script>
<style scoped>
</style>