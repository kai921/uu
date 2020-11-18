<template>
  <div>
    <!-- 4 将自定义变量绑定到数据模板 -- 40 绑定closed -->
    <el-dialog title="添加角色" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="角色名称" label-width="120px">
          <!-- 9 通过v-model将 rolename绑定到user表单上 -->
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="120px">
          <!-- 树形控件
            data:数据
            :props="{children:'哪个字段是代表有下一个子节点',label:'展示在页面的字段'}"
            :default-expanded-keys="[2, 3]" 默认展开的数据 
            :default-checked-keys="[5]" 默认选中的几号
            this.$refs.tree.getCheckedNodes() 可以取到选中的节点对应的整条数据，拼成的数组
            this.$refs.tree.getCheckedKeys() 可以取到选中节点的key拼成的数组
            this.$refs.tree.setCheckedKeys([10,11,12]); 给树设置值
          -->

          <!-- 10这里的data 需要的数据应该是来自菜单管理的数据  -->
          <!-- 14.将menuList 绑定到tree,配置props children对应的是子组件  label对应的是名称-->
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{children: 'children',label: 'title'}"
          ></el-tree>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加角色'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

// 菜单列表的数据接口
import { reqMenuList, reqRoleAdd,reqRoleDetail, reqRoleUpdate } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  // 3 form 接收info
  props: ["info"],
  data() {
    return {
      // 7 初始化变量，更改第5行model变量 8>http.js
      user: {
        rolename: "",
        menus: "",
        status: 1,
      },

      // 11 初始化树形控件的数据->引进菜单列表数据接口
      menuList: [],
    };
  },

  computed: {
    ...mapGetters({}),
  },

  methods: {
    ...mapActions({}),
    // 6 点击取消进行操作
    cancel() {
      this.info.isshow = false;
    },
    add() {
      // 15.将树形控件的数据取出，通过JSON.stringify()变成字符串数组，赋值给user.menus
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      // 16 发送ajax 请求
      reqRoleAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          //弹成功
          successAlert("添加成功");
          //弹框消失
          this.cancel();
          //数据清空
          this.empty();
          //24 通知父组件刷新list
          this.$emit("init");
        }
      });
    },
    // 17 清空数据
    empty() {
      this.user = {
        rolename: "",
        menus: "",
        status: 1,
      };
      //顺便把树清空 用的是element-ui 里的方法 18》http.js
      this.$refs.tree.setCheckedKeys([]);
    },
    //37 获取详情
    getOne(id) {
      reqRoleDetail(id).then((res) => {
        //此刻user没有id
        this.user = res.data.list;

        //处理树形控件的数据
        this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus));

        // 补id
        this.user.id = id;
      });
    },

    //39 修改
    update() {
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          //弹成功
          successAlert("修改成功");reqRoleDetail
          //弹框消失
          this.cancel();
          //数据清空
          this.empty();
          //刷新list
          this.$emit("init");
        }
      });
    },

      //41.处理消失
    closed() {
      if (this.info.title === "编辑角色") {
        this.empty();
      }
    },
  },

  mounted() {
    // 12 一进来就先获取菜单列表的数据接口
    reqMenuList().then((res) => {
      if (res.data.code == 200) {
        this.menuList = res.data.list;
      }
    });
  },
};
</script>
<style scoped>
</style>