<template>
  <div>
    <v-list :list="list" @edit="edit"></v-list>
    <v-form :info="info"  ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vForm from "./component/form.vue"
import vList from "./component/list.vue"
export default {
  components:{
    vList,
    vForm
  },
  data(){
    return {
      info:{
        isshow:false,
        title:"编辑会员"
      },
      list:[]
    }
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
  
    edit(uid){
      this.info={
        isshow:true,
        title:"编辑会员"
      }
      this.$refs.form.getOne(uid)
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>