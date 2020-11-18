<template>
  <div class="aaa">
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="user.pid" placeholder="顶级分类">
            <el-option :value="0" label="顶级分类"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option> 
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="user.catename" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 添加图片 -->
        <el-form-item label="图片" label-width="120px">
          <div>
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :on-change="changeFile"
              
            >
              <img v-if="imgUrl" :src="imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item>



        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加分类'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import path from "path"
import { mapGetters, mapActions } from "vuex";
import {
  reqRoleList,
  reqcateAdd,
  reqcateDetail,
  reqcateUpdate,
} from "../../../utils/http";
import { errorAlert, successAlert } from "../../../utils/alert";
export default {
  // 3.接收info
  props: ["info"],
  data() {
    return {
      //7.初始化user
      user: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
     
      // 初始化图片
      imgUrl:""
    };
  },
  computed: {
    ...mapGetters({
      cateList:"cate/list"
    }),
  },
  methods: {
    ...mapActions({
      reqList:"cate/reqList"
    }),

    changeFile(e){
      // 获取到文件
      let file = e.raw
      // 文件生成地址
      this.imgUrl=URL.createObjectURL(file)
      // 文件赋值
      this.user.img = file
      // 判断文件大小 file.size B,1M=1024KB 1KB=1024B
      if(file.size>2*1024*1024){
        errorAlert("文件大小不能超过2M")
        return
      }

      // 判断文件类型 
      let extname = path.extname(file.name);
      let arr = [".jpg",".img",".png",".gif",".jpeg"]
      if(!arr.includes(extname)){
        errorAlert("请上传正确的图片格式")
        return
      }

      //URL.createObjextURl(file) 将一个文件生成一个URL地址
      this.imgUrl=URL.createObjectURL(file) 
    },



    //6.点了取消
    cancel() {
      this.info.isshow = false;
    },
    //17.清空数据
    empty() {
      this.user = {
       pid: "",
        catename: "",
        img: null,
        status: 1,
      };
      this.imgUrl =""
    },
    //10.点了添加按钮
    add() {
      //16.ajax
      reqcateAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          //弹成功
          successAlert("添加成功");
          //弹框消失
          this.cancel();
          //数据清空
          this.empty();
          //24 刷新list
          this.reqList()
        }
      });
    },
    //37 获取详情
    getOne(id) {
      reqcateDetail(id).then((res) => {
        
        this.user = res.data.list;
        //处理密码
        this.imgUrl = this.$imgPre + this.user.img;

        //补id
        this.user.id = id;
      });
    },
    //39 修改
    update() {
      reqcateUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          //弹成功
          successAlert("修改成功");
          //弹框消失
          this.cancel();
          //数据清空
          this.empty();
          //刷新list
          this.reqList()
        }
      });
    },
    //41.处理消失
    closed() {
      if (this.info.title === "编辑分类") {
        this.empty();
      }
    },
    
  },
  mounted() {
    //   12.一进来，先获取菜单列表数据
    reqRoleList().then((res) => {
      if (res.data.code == 200) {
        this.roleList = res.data.list;
      }
    });
  },
};
</script>
<style scoped lang="stylus">
.aaa >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>