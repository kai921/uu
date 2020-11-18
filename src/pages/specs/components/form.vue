<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="user">
        <el-form-item label="规格名称" label-width="120px">
          <el-input v-model="user.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="规格属性" label-width="120px" v-for="(item,index) in attrArr" :key="index">
          <div class="line">
            <el-input v-model="item.value" autocomplete="off"></el-input>
            <el-button type="primary" v-if="index===0" @click="addAttr">添加规格属性</el-button>
            <el-button type="danger" v-else @click="delAttr(index)">删除按钮</el-button>
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加规格'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert } from "../../../utils/alert";
import {
  reqspecsAdd,
  reqspecsDetail,
  reqspecsUpdate,
} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      // 属性值
      attrArr: [{ value: "" }],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqCount: "specs/reqCount",
    }),
    cancel() {
      this.info.isshow = false;
    },
    // 新增一条规格属性
    addAttr() {
      this.attrArr.push({
        value: "",
      });
    },
    // 删除一条规格属性 用splice（）
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },
    empty() {
      this.user = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      // 属性值
      this.attrArr = [{ value: "" }];
    },
    // 点击添加
    add() {
      // console.log(this.user);
      // attrs: ""
      // catename: "32"
      // specsname: ""
      // status: 1
      // console.log(this.attrArr);
      // value: "wer"
      // 这个的user的atters等于这个的自定义空数组的每一条value值 map循环遍历 输出一个新的数组
      this.user.attrs = JSON.stringify(this.attrArr.map((item) => item.value));

      console.log(this.user);
      reqspecsAdd(this.user).then((res) => {
        if (res.data.code === 200) {
          // 添加弹框
          successAlert("添加成功");
          // 弹框消失
          this.cancel();
          // 数据清空
          this.empty();
          // 刷新list
          this.reqList();
          this.reqCount()
        }
      });
    },

    // 获取详情
    getOne(id) {
      reqspecsDetail(id).then((res) => {
        this.user = res.data.list[0];
        this.attrArr = JSON.parse(this.user.attrs).map((item) => {
          return {
            value: item,
          };
        });
      });
    },

    //更新
    update() {
      this.user.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      reqspecsUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert("更新成功");
          this.cancel();
          this.empty();
          this.reqList();
        }
      });
    },
    closed() {
      if (this.info.title == "编辑规格") {
        this.empty();
      }
    },
  },
  mounted() {},
};
</script>
<style scoped>
.line {
  display: flex;
}
.line .el-input {
  flex: 1;
}
.line .el-button {
  width: auto;
}
</style>