<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-tickets"></i> {{$t('auditrecord.icon')}} </el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('auditrecord.icon1')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tag">
      <el-button type="success" @click="queryData('process')">{{$t('auditrecord.process')}}</el-button>
      <el-button type="success" @click="queryData('result')">{{$t('auditrecord.result')}}</el-button>
    </div>
    <el-table :data="data" border style="width: 100%" :row-class-name="tableRowClassName" :class="{ 'class-showA': showA}">
      <el-table-column type="index" :index="indexMethod" :label="$t('auditrecord.num')" width="140"> </el-table-column>
      <el-table-column prop="listingId" label="listingId" width="100"></el-table-column>
      <el-table-column prop="auditName" :label="$t('auditrecord.operator')" width="140"></el-table-column>
      <el-table-column prop="operate" :label="$t('auditrecord.type')" width="140">
        <template slot-scope="scope">
          <div v-if="scope.row.operate=='1'">
            {{$t('auditrecord.tel')}}
          </div>
          <div v-else-if="scope.row.operate=='2'">
            {{$t('auditrecord.dispatch')}}
          </div>
          <div v-else-if="scope.row.operate=='3'">
            {{$t('auditrecord.checkf')}}
          </div>
          <div v-else-if="scope.row.operate=='4'">
            {{$t('auditrecord.checkt')}}
          </div>
          <div v-else-if="scope.row.operate=='5'">
            {{$t('auditrecord.refuse')}}
          </div>
          <div v-else>
            {{$t('auditrecord.other')}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="inserttime" :formatter="timetrans" :label="$t('auditrecord.time')" width="190"></el-table-column>
      <el-table-column prop="auditContent" :label="$t('auditrecord.detail')"></el-table-column>
    </el-table>

    <el-table :data="data1" border style="width: 100%" :row-class-name="tableRowClassName" :class="{ 'class-showB': showB}">
      <el-table-column type="index" :index="indexMethod" :label="$t('auditrecord.num')" width="140"> </el-table-column>
      <el-table-column prop="listingId" label="listingId" width="140"></el-table-column>
      <el-table-column prop="auditName" :label="$t('auditrecord.operator')" width="140"></el-table-column>
      <el-table-column prop="operate" :label="$t('auditrecord.type')" width="140">
        <template slot-scope="scope">
          <div v-if="scope.row.operate=='1'">
            {{$t('auditrecord.tel')}}
          </div>
          <div v-else-if="scope.row.operate=='2'">
            {{$t('auditrecord.dispatch')}}
          </div>
          <div v-else-if="scope.row.operate=='3'">
            {{$t('auditrecord.checkf')}}
          </div>
          <div v-else-if="scope.row.operate=='4'">
            {{$t('auditrecord.checkt')}}
          </div>
          <div v-else-if="scope.row.operate=='5'">
            {{$t('auditrecord.refuse')}}
          </div>
          <div v-else>
            {{$t('auditrecord.other')}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="inserttime" :formatter="timetrans" :label="$t('auditrecord.time')" width="190"></el-table-column>
      <el-table-column prop="auditContent" :label="$t('auditrecord.detail')"></el-table-column>
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
        url: "/backend/IListingAuditFlowLogService/getListingAuditFlowLogList",
        //url: "//172.20.14.33:8080/backend/IListingAuditFlowLogService/getListingAuditFlowLogList",
        username: '',
        AuditData: [],
        LogData: [],
        currentPage: 1,
        totalNum: 0,
        pageSize: 20,
        cur_page: 1,
        showA: true,
        showB: false,
        Type1: 'process'

      };
    },
    components: {
      'verifyPermission': verifyPermission,
    },
    created() {
      this.queryData('process');
    },
    computed: {
      data() {
        const self = this;
        if (self.AuditData === null) {
          return self.AuditData;
        } else {
          return self.AuditData.filter(function (d) {
            return d;
          })
        }
      },
      data1() {
        const self = this;
        if (self.LogData === null) {
          return self.LogData;
        } else {
          return self.LogData.filter(function (d) {
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
        this.queryData(this.Type1)
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

        self.queryData(self.Type1);
      },
      tableRowClassName(row, index) {
        row.index = (index + 1) + (this.cur_page - 1) * this.pageSize;
      },
      queryData(type) {

        let self = this;
        let operateList;
        let userId = this.$route.query.userId;
        let listingId = this.$route.query.listingId;
        self.AuditData = Array();
        self.LogData = Array();
        self.Type1 = type;
        if (type == "process") {

          operateList = [1, 2];
          self.showA = false;
          self.showB = true;

        } else {

          operateList = [3, 4, 5];
          self.showA = true;
          self.showB = false;

        }
        self.$axios.post(self.url, {
          "userId": userId,
          "operateList": operateList,
          "listingId": listingId,
          "startPage": self.cur_page,
          "pageSize": self.pageSize
        }).then((res) => {
          if (res.data.result == "0") {

            if (type == "process") {
              self.AuditData = res.data.content.list;
            } else {
              self.LogData = res.data.content.list;
            }
            self.totalNum = res.data.content.totalCount;
            self.pageSize = res.data.content.pageSize;

          } else if (res.data.result == '-99' || res.data.result == '-999') {
            self.$message.error(res.data.resultMessage);
          } else {
            self.$message.error(res.data.resultMessage);
          }

        })
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
  .class-showB,
  .class-showA {
    display: none;
  }

  .tag {
    margin-bottom: 25px;
  }
</style>