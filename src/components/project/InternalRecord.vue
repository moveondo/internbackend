<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-tickets"></i> {{$t('internalrecord.icon')}} </el-breadcrumb-item>
        <el-breadcrumb-item> {{$t('internalrecord.icon1')}} </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="select">

      <el-form-item label="user">
        {{username}}
      </el-form-item>
      <el-form-item :label="$t('internalrecord.choice')">
        <el-select v-model="ruleForm.value2" :placeholder="$t('internalrecord.choice')">
          <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('internalrecord.content')">
        <el-input type="textarea" v-model="ruleForm.desc" @input="descInput"></el-input>
        <span class="remnant">{{remnant}}/500</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{$t('internalrecord.commit')}}</el-button>
        <el-button @click="resetForm('ruleForm')">{{$t('internalrecord.reset')}}</el-button>
      </el-form-item>
    </el-form>

    <div class="title"> {{$t('internalrecord.inner')}}:</div>
    <el-table :data="data" border style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column type="index" :index="indexMethod" :label="$t('internalrecord.num')" width="140"> </el-table-column>
      <el-table-column prop="operatorName" :label="$t('internalrecord.operator')" width="140"></el-table-column>
      <el-table-column prop="category" :label="$t('internalrecord.type')" width="140">
        <template slot-scope="scope">
          <div v-if="scope.row.category=='1'">
            {{$t('internalrecord.list')}}
          </div>
          <div v-else>
            {{$t('internalrecord.other')}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="inserttime" :formatter="timetrans" :label="$t('internalrecord.time')" width="190"></el-table-column>
      <el-table-column prop="content" :label="$t('internalrecord.detail')"></el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize"
        layout="total, prev, pager, next" :total="totalNum">
      </el-pagination>
    </div>
    <verifyPermission></verifyPermission>

  </div>
</template>

<script>
  import verifyPermission from './Permission.vue';
  export default {
    data() {
      return {
        url: "/backend/IUserAuthService/saveUserInternalRecord",
        url1: "/backend/IUserAuthService/getUserInternalRecordList",
        //url:"//172.20.14.33:8080/backend/IUserAuthService/saveUserInternalRecord",
        //url1:"//172.20.14.33:8080/backend/IUserAuthService/getUserInternalRecordList",
        username: '',
        tableData: [],
        options1: [{
          value: '1',
          label: 'internalrecord.list'
        }, {
          value: '99',
          label: 'internalrecord.other'
        }],
        ruleForm: {
          value2: '',
          desc: ''
        },
        remnant: 500,
        currentPage: 1,
        totalNum: 0,
        pageSize: 20,
        cur_page: 1,
        rules: {
          region: [{
            required: true,
            message: this.$t('internalrecord.choice'),
            trigger: 'change'
          }],
          desc: [{
            required: true,
            message: this.$t('internalrecord.write'),
            trigger: 'blur'
          }]
        }
      };
    },
    components: {
      'verifyPermission': verifyPermission,
    },
    created() {

      let userId = this.$route.query.userId;
      this.username = this.$route.query.userName;;
      this.queryData(userId);

    },
    computed: {
      data() {
        const self = this;
        if (self.tableData === null) {
          return self.tableData;
        } else {
          return self.tableData.filter(function (d) {
            return d;
          })
        }
      },
      locale() {
        return this.$store.state.locale
      }
    },
    watch: {
      locale() {
        this.queryData(this.$route.query.userId)
      }
    },
    methods: {
      indexMethod(index) {
        return (index + 1) + (this.cur_page - 1) * this.pageSize;
      },
      handleSizeChange(val) {

        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        let self = this;
        this.cur_page = val;
        let userId = this.$route.query.userId;
        self.queryData(userId);
      },
      tableRowClassName(row, index) {
        row.index = (index + 1) + (this.cur_page - 1) * this.pageSize;
      },
      descInput() {
        let self = this;
        var txtVal = this.ruleForm.desc.length;
        self.remnant = 500 - txtVal;
        if (self.remnant < 0) {
          self.$message.error(this.$t('internalrecord.max'));
        }
      },
      queryData(userId) {
        let self = this;
        self.tableData = Array();
        self.$axios.post(self.url1, {
          "userId": userId,
          "startPage": self.cur_page,
          "pageSize": self.pageSize
        }).then((res) => {
          if (res.data.result == "0") {

            self.tableData = res.data.content.list;
            self.totalNum = res.data.content.totalCount;
            self.pageSize = res.data.content.pageSize;

          } else if (res.data.result == '-99' || res.data.result == '-999') {
            self.$message.error(res.data.resultMessage);
          } else {
            self.$message.error(res.data.resultMessage);
          }

        })
      },
      submitData() {
        let self = this;
        let userId = this.$route.query.userId;
        let category = self.ruleForm.value2;
        let content = self.ruleForm.desc;
        let operatorName = localStorage.getItem('ms_username');
        if (category == '' || category == null) {
          self.$message.error(this.$t('internalrecord.choice'));
          return false;
        }
        if (content == '' || content == null) {
          self.$message.error(this.$t('internalrecord.write'));
          return false;
        }
        if (self.remnant < 0) {
          self.$message.error(this.$t('internalrecord.max'));
          return false;
        }

        self.$axios.post(self.url, {
          "userId": userId,
          "category": category,
          "content": content,
          "operatorName": operatorName
        }).then((res) => {

          if (res.data.result == 0) {

            self.$message.success(this.$t('internalrecord.success'));
            self.ruleForm.value2 = '';
            self.ruleForm.desc = '';

            self.queryData(userId);


          } else if (res.data.result == '-99' || res.data.result == '-999') {
            self.$message.error(res.data.resultMessage);
          } else {
            self.$message.error(res.data.resultMessage);
          }


        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.remnant = 500;
            this.submitData();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.ruleForm.value2 = ''
        this.ruleForm.desc = ''
      },
      timetrans: function (row, column) {
        var date = row[column.property];
        var date = new Date(date); //如果date为13位不需要乘1000
        if (date == undefined) {
          return "";
        }
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y + M + D + h + m + s;
      }
    }
  }
</script>

<style scoped>
  .remnant {
    float: right;
  }

  .el-form-item__error {
    top: 63%;
  }
</style>
