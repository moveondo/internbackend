<template>
  <div class="table">
    <el-form :model="ruleForm" ref="ruleForm" label-width="300px" class="demo-ruleForm">
      <el-form-item :label="$t('collection.title')">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{$t('collection.commit')}}</el-button>
        <el-button @click="resetForm('ruleForm')">{{$t('collection.rest')}}</el-button>
      </el-form-item>
      <div class="mess">{{$t('collection.tips')}}</div>
    </el-form>
    <verifyPermission></verifyPermission>
  </div>
</template>

<script>
  import verifyPermission from '../project/Permission.vue';
  export default {
    data() {
      return {
        // url:"//pengfei.ppdai.com:9080/backend/ICollBackendService/allocateOwner",
        url: "/backend/ICollBackendService/allocateOwner",
        ruleForm: {
          desc: ''
        },
        reload: false
      }
    },
    components: {
      'verifyPermission': verifyPermission,
    },
    computed: {
      locale() {
        return this.$store.state.locale
      }
    },
    watch: {
      locale(val, oldVal) {
        this.reload = true;
      }
    },
    methods: {

      queryData(formName) {
        let self = this;
        let Desc = self.ruleForm.desc;
        if (formName && (Desc == '' || Desc == null)) {
          self.$message.error(this.$t('collection.owner'));
          return false;
        }
        self.$axios.post(self.url, {
          "allocateOwnerList": Desc
        }).then((res) => {

          if (res.data.result == 0) {
            self.$message.success(this.$t('collection.success'));
            self.ruleForm.desc = "";
          } else if (res.data.result == '-99' || res.data.result == '-999') {
            self.$message.error(res.data.resultMessage);
          } else {
            self.$message.error(res.data.resultMessage);
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(valid);

          if (valid) {
            this.queryData(formName);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.ruleForm.desc = '';
        this.$refs[formName].resetFields();
      }

    }
  }
</script>

<style scoped>
  .mess {
    vertical-align: middle;
    font-size: 14px;
    color: #48576a;
    line-height: 1;
    padding: 11px 12px 11px 0;
    box-sizing: border-box;
    margin-left: 300px;
  }

  .el-textarea {
    width: 500px;
  }

  .el-form-item__label {
    width: 300px;
  }
</style>
