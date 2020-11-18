<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <!-- 2. 开始赋值 -->
      <el-form :model="user">
        <el-form-item label="一级分类" label-width="120px" prop="first_cateid">
          <el-select v-model="user.first_cateid">
            <el-option label="请选择一级分类" v-for="item in cateList" :key="item.id"  :value="item.id"></el-option>
            
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" label-width="120px" prop="second_cateid">
          <el-select>
            <el-option label="请选择二级分类" v-for="item in cateList" :key="item.id"  :value="item.id"></el-option>
           
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" label-width="120px"  prop="goodsname">
          <el-input v-model="user.goodsname" placeholder="请输入商品名称"></el-input>
        </el-form-item>

        <el-form-item label="价格" label-width="120px"  prop="price">
          <el-input v-model="user.goodsname" placeholder="请输入价格"></el-input>
        </el-form-item>

        <el-form-item label="市场价格" label-width="120px"  prop="market_price">
          <el-input placeholder="请输入市场价格"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="120px" >
          <div class="myupload">
            <h3>+</h3>
            <img class="img" v-if="imgUrl" :src="imgUrl" alt />

            <input v-if="info.isshow" type="file" class="ipt" @change="changeFile" />
          </div>
        </el-form-item>

        <el-form-item label="商品规格" label-width="120px" prop="specsid">
          <el-select placeholder="请选择商品规格">
            <el-option label="家用电器"></el-option>
            <el-option label="美妆护肤"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" label-width="120px" prop="specsattr">
          <el-select>
            <el-option label="家用电器"></el-option>
            <el-option label="美妆护肤"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" label-width="120px" >
          <el-radio :label="1" v-model="user.isnew">是</el-radio>
          <el-radio :label="2" v-model="user.isnew">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" label-width="120px">
          <el-radio :label="1" v-model="user.ishot">是</el-radio>
          <el-radio :label="2" v-model="user.ishot">否</el-radio>
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
      // 1 先设置默认初始值
      user: {
        first_cateid: "",
        second_cateid: "",
        goodsname:"",
        price:"",
        market_price:"",
        img:null,
        description:"",
        specsid:"",
        specsattr:[],//此时是数组，后端要的是 "[]"
        isnew:"",
        ishot:"",
        status: 1,
      },
      
    };
  },
  computed: {
    // 3. 商品管理管理的是分类里数据 引入一级分类 一级分类数据在cate模块里
    ...mapGetters({
      cateList:"cate/list"
    }),
  },
  methods: {
    ...mapActions({
       // 4.请求一级分类list
      reqCateList: "cate/reqList",
      reqList: "specs/reqList",
      reqCount: "specs/reqCount",
    }),
    // 5. 根据一级分类id 获取二级分类list
    changeFirst(){
      // 二级分类的id 重置
      this.user.second_cateid = "";
      this.getSecondList();
    },
    getSecondList(){
      // 获取二级分类的list
      reqcateList({pid: this.user.first_cateid }).then((res)=>{
        this.secondCateList = res.data.list;
      })
    },
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
          this.reqCount();
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
.myupload {
  width: 100px;
  height: 100px;
  border: 1px dashed #ccc;
  border-radius: 5px;
  position: relative;
}
.myupload h3 {
  width: 100%;
  height: 100%;
  font-size: 30px;
  text-align: center;
  line-height: 100px;
  color: #666;
  font-weight: 100;
}
.myupload .ipt {
  position: absolute;
  top: 0;
left: 0;
width: 100px;
  height: 100px;
opacity: 0;
}
.myupload img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100px;
  height: 100px;

}
</style>