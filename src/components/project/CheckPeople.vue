<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-document"></i> {{$t('checkpeople.icon')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('checkpeople.icon1')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="handle-box">
      <el-select v-model="region" :placeholder="$t('checkpeople.choice')">
        <el-option key="bbk" label="userid" value="1"></el-option>
        <el-option key="xtc" :label="$t('checkpeople.tel')" value="2"></el-option>
      </el-select>
      <el-input v-model="userIdORphone" :placeholder="$t('checkpeople.empty')" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="search" @click="search">{{$t('checkpeople.search')}}</el-button>
    </div>

    <div class="presonMessage">
      <div class="title text">{{$t('checkpeople.info')}}</div>
      <div class="Order">
        <div class="text">userId: {{basics.userId}} </div>
        <div class="text">{{$t('checkpeople.phone')}}: {{basics.mobile}} </div>
      </div>
      <div class="">
        <el-tag>
          <router-link target="_blank" :to="{ path: '/internalrecord',query:{userId:this.basics.userId}}">{{$t('checkpeople.inner')}}</router-link>
        </el-tag>
        <el-tag>
          <router-link target="_blank" :to="{ path: '/auditrecord',query:{userId:this.basics.userId}}">{{$t('checkpeople.list')}}</router-link>
        </el-tag>
      </div>
      <hr />
      <div class="ktpInfo" :model="ktpInfo">
        <div class="Order">
          <div class="text">Nama KTP: {{ktpInfo.ktpName}} </div>
          <div class="text">Nomor KTP: {{ktpInfo.ktpNumber}} </div>
        </div>
        <div class="Order">
          <div class="text">Foto KTP:
            <img v-bind:src="ktpInfo.ktpPhotoUrl" /> </div>
          <div class="text">Foto Anda bersama KTP:
            <img v-bind:src="ktpInfo.ktpSelfPhotoUrl" />
          </div>
        </div>
        <div class="Order">
          <div class="text">{{$t('checkpeople.ktp')}}:{{ktpInfo.AuthState}}
            <span class="status" v-if="ktpInfo.authState=='1' || ktpInfo.authState=='-1' ">
              <el-button type="success" @click="CheckStatus('ktp')">{{message}}</el-button>
            </span>
          </div>
        </div>
        <div class="Order">
          <div class="text">advance message: {{KTPMEESSAGE}} </div>
          <div class="text"></div>
        </div>
      </div>
      <hr/>
      <div class="ktpInfo">
        <div class="Order">
          <div class="text">{{$t('checkpeople.foto')}}:
            <img v-bind:src="liveDetectPhotoUrl" /> </div>
        </div>
        <div class="Order">
          <div class="text">{{$t('checkpeople.fotor')}}:{{detectFlag}} </div>
        </div>
      </div>
      <hr/>
      <div class="ktpInfo" :model="personalInfo">
        <div class="Order">
          <div class="text">{{$t('checkpeople.mar')}}:{{personalInfo.maritalStatus}} </div>
          <div class="text">{{$t('checkpeople.loan')}}: {{personalInfo.loanPurpose}} </div>
        </div>
        <div class="Order">
          <div class="text">{{$t('checkpeople.borth')}}: {{personalInfo.bornDate}} </div>

          <div class="text">{{$t('checkpeople.login')}}: {{personalInfo.religion}}</div>
        </div>
        <div class="Order">
          <div class="text">{{$t('checkpeople.edu')}}: {{personalInfo.educationLevel}} </div>
          <div class="text">{{$t('checkpeople.pro')}}: {{personalInfo.province}}</div>
        </div>
        <div class="Order">
          <div class="text">{{$t('checkpeople.city')}}: {{personalInfo.city}}</div>
          <div class="text">{{$t('checkpeople.qu')}}: {{personalInfo.area}}</div>
        </div>
        <div class="Order">
          <div class="text"> {{$t('checkpeople.address')}}: {{personalInfo.address}}</div>
        </div>
      </div>
      <hr/>
      <div class="ktpInfo" :model="workInfo">
        <div class="Order">
          <div class="text">{{$t('checkpeople.pos')}}: {{workInfo.industry}}</div>
          <div class="text">{{$t('checkpeople.com')}}: {{workInfo.workAddress}}</div>
        </div>
        <div class="Order">
          <div class="text">{{$t('checkpeople.comname')}}:{{workInfo.companyName}} </div>
          <div class="text">{{$t('checkpeople.position')}}: {{workInfo.workPosition}} </div>
        </div>

        <div class="Order">
          <div class="text">{{$t('checkpeople.comtel')}}: {{workInfo.companyTel}} </div>
          <div class="text"> {{$t('checkpeople.much')}}: {{workInfo.workAge}}</div>
        </div>
        <div class="Order">
          <div class="text">{{$t('checkpeople.month')}}: {{workInfo.monthlyIncome}} </div>
        </div>
      </div>
      <hr/>
      <div class="ktpInfo" :model="emergencyContact">
        <div class="Order">
          <div class="text">{{$t('checkpeople.con1')}}: {{emergencyContact.contactName1}} </div>
          <div class="text">{{$t('checkpeople.contel1')}}: {{emergencyContact.contactMobile1}} </div>
        </div>
        <div class="Order">
          <div class="text">{{$t('checkpeople.relation1')}}: {{emergencyContact.relation1}} </div>

          <div class="text">{{$t('checkpeople.con2')}}: {{emergencyContact.contactName2}}</div>
        </div>
        <div class="Order">
          <div class="text">{{$t('checkpeople.contel2')}}: {{emergencyContact.contactMobile2}} </div>
          <div class="text">{{$t('checkpeople.relation2')}}: {{emergencyContact.relation2}}</div>
        </div>
      </div>
      <hr/>
      <div class="ktpInfo" :model="bankInfo">
        <div class="Order">
          <div class="text">{{$t('checkpeople.bank')}}: {{bankInfo.bankCode}} </div>
          <div class="text">{{$t('checkpeople.shu')}}: {{bankInfo.bankName}} </div>
        </div>
        <div class="Order">
          <div class="text">{{$t('checkpeople.bankcode')}}: {{bankInfo.bankNum}}</div>
          <div class="text">{{$t('checkpeople.name')}}: {{bankInfo.holder}} </div>
        </div>
        <div class="Order">
          <div class="text">{{$t('checkpeople.banks')}}:{{bankInfo.bankStatus}}
            <span class="status" v-if=" bankInfo.status=='-1' || bankInfo.status=='1'  ">
              <el-button type="success" @click="CheckStatus('bank')">{{bankmessage}}</el-button>
            </span>
          </div>
        </div>
      </div>
      <hr/>


    </div>
    <div>{{$t('checkpeople.listing')}}</div>
    <el-table :data="data" border style="width: 100%" :row-class-name="tableRowClassName" ref="multipleTable" v-loading="loading"
      :element-loading-text="$t('checkpeople.load')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-table-column type="index" :label="$t('checkpeople.num')" width="100"> </el-table-column>
      <el-table-column prop="id" label="listingid "></el-table-column>
      <el-table-column prop="amount" :label="$t('checkpeople.loannum')"></el-table-column>
      <el-table-column prop="statusName" :label="$t('checkpeople.listId')"></el-table-column>
      <el-table-column prop="periodNo" :label="$t('checkpeople.pri')"></el-table-column>
      <el-table-column prop="termQuantity" :label="$t('checkpeople.pernum')"></el-table-column>
      <el-table-column prop="termUnit" :label="$t('checkpeople.unit')"></el-table-column>
      <el-table-column prop="riskPassTime" :label="$t('checkpeople.tan')" :formatter="timetrans"></el-table-column>
      <!-- <el-table-column prop="fullBidTime" label="满标时间(Waktu standar penuh)"   :formatter="timetrans"></el-table-column>
            <el-table-column prop="failBidTime" label="流标时间(Waktu transaksi gagal)"  :formatter="timetrans"></el-table-column> -->
      <el-table-column prop="inserttime" :label="$t('checkpeople.wak')" :formatter="timetrans"></el-table-column>

    </el-table>
    <div>{{$t('checkpeople.eduinfo')}}</div>
    <el-table :data="data1" border style="width: 100%" :row-class-name="tableRowClassName" ref="multipleTable" v-loading="loading"
      :element-loading-text="$t('checkpeople.load')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <!-- <el-table-column  prop="index"  label="序号(Nomor urutan)"  width="100" >  </el-table-column> -->
      <el-table-column prop="totalAmount" :label="$t('checkpeople.total')"></el-table-column>
      <el-table-column prop="availAmount" :label="$t('checkpeople.rela')"></el-table-column>
      <el-table-column prop="pdlOccupiedAmount" :label="$t('checkpeople.dai')"></el-table-column>
      <el-table-column prop="installmentOccupiedAmount" :label="$t('checkpeople.daicash')"></el-table-column>
    </el-table>

    <dialogEE v-bind:dialogVisible="dialogVisible"></dialogEE>
    <verifyPermission></verifyPermission>
  </div>
</template>

<script>
  import dialogEE from './Dialog.vue';
  import verifyPermission from './Permission.vue';
  import PCity from './../../assets/indonesia.json';
  export default {
    data() {
      return {
        // url:"http://172.20.15.13:2020/backend/IUserAuthService/getUserDetailInfo",
        // url2:"http://172.20.15.13:2020/backend/IUserAuthService/getUserDictionary",
        // url1:"http://172.20.15.13:2020/backend/IThirdAuthService/ktpAuth",
        // url3:"http://172.20.15.13:2020/backend/IUserAuthService/queryBankCardVerifyInfo",
        // url4:"http://172.20.15.13:2020/backend/IListingService/queryLoanList",
        // url5:"http://172.20.15.13:2020/backend/IAmountService/queryAllLimitByUserId",
        url: "/backend/IUserAuthService/getUserDetailInfo",
        url2: "/backend/IUserAuthService/getUserDictionary",
        url1: "/backend/IThirdAuthService/ktpAuth",
        url3: "/backend/IUserAuthService/queryBankCardVerifyInfo",
        url4: "/backend/IListingService/queryLoanList",
        url5: "/backend/IAmountService/queryAllLimitByUserId",
        url6: "/backend/IUserAuthService/queryLiveDetect",
        userIdORphone: '',
        region: '',
        is_search: false,
        dialogVisible: false,
        loading: false,
        tableData: [],
        tableData1: [],
        ThisuserId: '',
        userId: '',
        KTPMEESSAGE: 'no message',
        message: this.$t('checkpeople.dian'),
        bankmessage: this.$t("checkpeople.update"),
        basics: {
          userId: '',
          mobile: ''
        },
        ktpInfo: {
          ktpName: '',
          ktpNumber: '',
          ktpPhotoUrl: '',
          ktpSelfPhotoUrl: '',
          authState: '',
          AuthState: ''
        },
        personalInfo: {
          maritalStatus: '',
          loanPurpose: '',
          bornDate: '',
          religion: '',
          educationLevel: '',
          province: '',
          city: '',
          area: '',
          address: "",
        },
        workInfo: {
          companyName: '',
          workPosition: '',
          companyTel: '',
          workAddress: '',
          monthlyIncome: '',
          workAge: '',
          industry: ''
        },
        emergencyContact: {
          contactName1: '',
          contactMobile1: '',
          relation1: '',
          contactName2: '',
          contactMobile2: '',
          relation2: ''
        },
        bankInfo: {
          bankCode: '',
          bankName: '',
          bankNum: '',
          holder: '',
          status: ''
        },
        marriedList: Array(),
        industryList: Array(),
        eduList: Array(),
        religionList: Array(),
        loanUseList: Array(),
        workAgeList: Array(),
        relationShipList: Array(),
        detectFlag: '',
        liveDetectPhotoUrl: ''
      }
    },
    components: {
      'dialogEE': dialogEE,
      'verifyPermission': verifyPermission,
    },
    created() {
      const self = this;
      self.GetUserDictionary();

      let userId = self.$route.query.userId;
      self.userId = userId;
      if (userId) {
        self.GetUserDictionary();
        let mobile = "";
        self.queryData(userId, mobile);
        self.LoanData(userId);
        self.queryAllLimit(userId);
        self.queryLiveDetect(userId, mobile);
      }

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
      data1() {
        const self = this;
        if (self.tableData1 === null) {
          return self.tableData1;
        } else {
          return self.tableData1.filter(function (d) {
            return d;
          })
        }
      },
      locale() {
        return this.$store.state.locale
      }
    },
    watch: {
      locale(val, oldVal) {
        this.message = this.$t('checkpeople.dian');
        this.bankmessage = this.$t("checkpeople.update");

        // 切换语言重新拉数据
        if (this.userIdORphone !== '') {
          this.search()
        }
      }
    },
    methods: {
      tableRowClassName(row, index) {
        //把每一行的索引放进row
        row.index = index + 1;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.cur_page = val;
      },
      queryLiveDetect(userId, mobile) {
        let self = this;
        self.liveDetectPhotoUrl = "";
        self.detectFlag = "";
        self.$axios.post(self.url6, {
          "userId": userId,
          "mobileNo": mobile
        }).then((res) => {
          if (res.data.result == 0) {
            let detectFlagR = res.data.content.detectFlag;
            let liveDetectPhotoUrlR = res.data.content.liveDetectPhotoUrl;
            // 认证成功
            if (detectFlagR === true) {
              self.detectFlag = this.$t('checkpeople.ss');
              self.liveDetectPhotoUrl = res.data.content.liveDetectPhotoUrl;
              // 认证失败
            } else if (detectFlagR === false && liveDetectPhotoUrlR !== '') {
              self.detectFlag = this.$t('checkpeople.gg');
              // 未认证
            } else {
              self.detectFlag = this.$t('checkpeople.tb');
            }

          } else if (res.data.result == '-99' || res.data.result == '-999') {
            self.$message.error(res.data.resultMessage);
          } else {
            self.$message.error(res.data.resultMessage);
          }
        })
      },
      queryData(userId, mobile) {
        let self = this;
        self.clearValue();
        self.$axios.post(self.url, {
          "userId": userId,
          "mobile": mobile
        }).then((res) => {

          if (res.data.result == 0) {

            self.basics.userId = res.data.content.userId;
            self.basics.mobile = res.data.content.mobile;
            if (self.basics.userId) {
              self.LoanData(self.basics.userId);
              self.queryAllLimit(self.basics.userId);
            }


            if (res.data.content.personalInfo != null) {

              if (res.data.content.personalInfo.address != null) {
                self.personalInfo.address = res.data.content.personalInfo.address;
              }

              self.personalInfo.maritalStatus = self.marriedList[res.data.content.personalInfo.maritalStatus];

              self.personalInfo.area = res.data.content.personalInfo.area;
              self.personalInfo.loanPurpose = self.loanUseList[res.data.content.personalInfo.loanPurpose];
              self.personalInfo.bornDate = res.data.content.personalInfo.bornDate;
              self.personalInfo.religion = self.religionList[res.data.content.personalInfo.religion];


              self.personalInfo.educationLevel = self.eduList[res.data.content.personalInfo.educationLevel];
              self.personalInfo.province = PCity[1][res.data.content.personalInfo.province];
              self.personalInfo.city = PCity[res.data.content.personalInfo.province][res.data.content.personalInfo.city];
              self.personalInfo.area = PCity[res.data.content.personalInfo.city][res.data.content.personalInfo.area];

            } else {
              self.personalInfo.address = "";
              self.personalInfo.maritalStatus = '';
              self.personalInfo.area = '';
              self.personalInfo.loanPurpose = '';
              self.personalInfo.bornDate = '';
              self.personalInfo.religion = '';
              self.personalInfo.educationLevel = '';
              self.personalInfo.province = '';
              self.personalInfo.city = '';
              self.personalInfo.area = '';
            }

            if (res.data.content.ktpInfo !== null) {
              self.ktpInfo.ktpName = res.data.content.ktpInfo.ktpName;
              self.ktpInfo.ktpNumber = res.data.content.ktpInfo.ktpNumber;
              self.ktpInfo.ktpPhotoUrl = res.data.content.ktpInfo.ktpPhotoUrl;
              self.ktpInfo.ktpSelfPhotoUrl = res.data.content.ktpInfo.ktpSelfPhotoUrl;
              if (res.data.content.ktpInfo.authStateMsg && res.data.content.ktpInfo.authStateMsg != '') {
                let group_json = JSON.parse(res.data.content.ktpInfo.authStateMsg);
                if (group_json.code == "SUCCESS") {
                  var advanceName = "KTPName：" + group_json.data.name + ",KTPNumber:" + group_json.data.idNumber;
                  self.KTPMEESSAGE = advanceName;
                }
              }



              if (res.data.content.ktpInfo.authState !== null) {

                self.ktpInfo.authState = res.data.content.ktpInfo.authState;

                var AuthState = self.CheckCode(res.data.content.ktpInfo.authState);
                self.ktpInfo.AuthState = AuthState;
              }

            } else {
              self.ktpInfo.ktpName = '';
              self.ktpInfo.ktpNumber = '';
              self.ktpInfo.ktpPhotoUrl = '';
              self.ktpInfo.ktpSelfPhotoUrl = '';
              self.ktpInfo.authState = '';
            }

            if (res.data.content.bankInfo !== null) {
              if (res.data.content.bankInfo.bankCode !== null) {
                self.bankInfo.bankCode = res.data.content.bankInfo.bankCode;
              }
              self.bankInfo.bankName = res.data.content.bankInfo.bankName;
              self.bankInfo.bankNum = res.data.content.bankInfo.bankNum;
              self.bankInfo.holder = res.data.content.bankInfo.holder;
              self.bankInfo.status = res.data.content.bankInfo.status;
              var bankS = self.CheckCode(res.data.content.bankInfo.status);
              self.bankInfo.bankStatus = bankS;
            } else {
              self.bankInfo.bankCode = '';
              self.bankInfo.bankName = '';
              self.bankInfo.bankNum = '';
              self.bankInfo.holder = '';
              self.bankInfo.status = '';
            }

            if (res.data.content.emergencyContact !== null) {
              self.emergencyContact.contactMobile1 = res.data.content.emergencyContact.contactMobile1;
              self.emergencyContact.contactMobile2 = res.data.content.emergencyContact.contactMobile2;
              self.emergencyContact.contactName1 = res.data.content.emergencyContact.contactName1;
              self.emergencyContact.contactName2 = res.data.content.emergencyContact.contactName2;
              self.emergencyContact.relation1 = self.relationShipList[res.data.content.emergencyContact.relation1];
              self.emergencyContact.relation2 = self.relationShipList[res.data.content.emergencyContact.relation2];
            } else {
              self.emergencyContact.contactMobile1 = '';
              self.emergencyContact.contactMobile2 = '';
              self.emergencyContact.contactName1 = '';
              self.emergencyContact.contactName2 = '';
              self.emergencyContact.relation1 = '';
              self.emergencyContact.relation2 = '';
            }

            if (res.data.content.workInfo !== null) {
              self.workInfo.companyName = res.data.content.workInfo.companyName;
              self.workInfo.companyTel = res.data.content.workInfo.companyTel;
              self.workInfo.industry = self.industryList[res.data.content.workInfo.industry];
              self.workInfo.monthlyIncome = res.data.content.workInfo.monthlyIncome;
              self.workInfo.workAddress = res.data.content.workInfo.workAddress;
              self.workInfo.workAge = self.workAgeList[res.data.content.workInfo.workAge];
              self.workInfo.workPosition = res.data.content.workInfo.workPosition;
            } else {
              self.workInfo.companyName = '';
              self.workInfo.companyTel = '';
              self.workInfo.industry = '';
              self.workInfo.monthlyIncome = '';
              self.workInfo.workAddress = '';
              self.workInfo.workAge = '';
              self.workInfo.workPosition = '';
            }

            self.userId = userId;

          } else if (res.data.result == '-99' || res.data.result == '-999') {
            self.$message.error(res.data.resultMessage);
          } else {
            self.$message.error(res.data.resultMessage);
          }

        })
      },
      search() {
        let self = this;
        self.is_search = true;
        let userIdORphone = self.userIdORphone;
        let region = self.region;

        if (userIdORphone == '') {
          self.$message.error(this.$t('checkpeople.empty'));
          return false;
        }
        if (region == 1) {
          var userId = self.userIdORphone;
          var mobile = "";
        }
        if (region == 2) {
          var mobile = self.userIdORphone;
          var userId = "";
        }

        self.GetUserDictionary();
        self.queryData(userId, mobile);

        self.queryLiveDetect(userId, mobile)
      },
      LoanData(borrowerId) {
        let self = this;
        let axiosDate = new Date();
        self.loading = true;
        self.tableData = Array();
        self.$axios.post(self.url4, {
          "borrowerId": borrowerId,
          "startPage": 1,
          "pageSize": 1000
        }).then((res) => {
          if (res.data.result == 0) {

            let oDate = new Date()
            let time = oDate.getTime() - axiosDate.getTime()
            if (time < 500) time = 500
            setTimeout(() => {
              self.loading = false;
            }, time);
            self.tableData = res.data.content.list;

          } else if (res.data.result == '-99' || res.data.result == '-999') {
            self.$message.error(res.data.resultMessage);
          } else {
            self.$message.error(res.data.resultMessage);
          }
        })
      },
      queryAllLimit(userId) {
        let self = this;
        let axiosDate = new Date();
        self.loading = true;
        self.tableData1 = Array();
        self.$axios.post(self.url5, {
          "userId": userId
        }).then((res) => {
          if (res.data.result == 0) {
            let oDate = new Date()
            let time = oDate.getTime() - axiosDate.getTime()
            if (time < 500) time = 500
            setTimeout(() => {
              self.loading = false;
            }, time);

            self.tableData1.push({
              "totalAmount": res.data.content.totalAmount,
              "availAmount": res.data.content.availAmount,
              "pdlOccupiedAmount": res.data.content.pdlOccupiedAmount,
              "installmentOccupiedAmount": res.data.content.installmentOccupiedAmount
            });
          } else if (res.data.result == '-99' || res.data.result == '-999') {
            self.$message.error(res.data.resultMessage);
          } else {
            self.$message.error(res.data.resultMessage);
          }
        })
      },
      CheckCode(type) {
        var statusName;

        if (type == 1) {
          statusName = this.$t('checkpeople.menu');
        } else if (type == 0) {
          statusName = this.$t('checkpeople.sukses');
        } else if (type == "-1") {
          statusName = this.$t('checkpeople.gagal');
        }
        return statusName;

      },
      CheckStatus(type) {
        let self = this;
        let userId = self.basics.userId;
        var bankCardNo = self.bankInfo.bankNum;
        var bankCode = self.bankInfo.bankCode;
        var ownerName = self.ktpInfo.ktpName;
        var receptionHolderName = self.bankInfo.holder;

        if (type == "bank") {
          self.$axios.post(self.url3, {
            "userId": userId,
            "bankCardNo": bankCardNo,
            "bankCode": bankCode,
            "ownerName": ownerName,
            "receptionHolderName": receptionHolderName
          }).then((res) => {
            if (res.data.result == 0 && res.data.content.status == 0) {
              self.message = this.$t('checkpeople.us');;
              self.$message.success(this.$t('checkpeople.us'));
            } else if (res.data.content.status == "-1") {
              self.message = this.$t('checkpeople.ug');;
              self.$message.error(this.$t('checkpeople.ug'));
            } else if (res.data.result == '-99' || res.data.result == '-999') {
              self.$message.error(res.data.resultMessage);
            } else {
              self.$message.error(res.data.resultMessage);
            }

          }).catch(function (err) {
            console.log("调用失败", err)
          })
        }
        var KtpNo = self.ktpInfo.ktpNumber;
        var ktpName = self.ktpInfo.ktpName;

        if (type == "ktp") {
          self.$axios.post(self.url1, {
            "userId": userId,
            "idNumber": KtpNo,
            "name": ktpName
          }).then((res) => {
            if (res.data.result == 0 && res.data.content == 10) {
              self.message = this.$t('checkpeople.sukses');
              self.$message.success(this.$t('checkpeople.sukses'));
            } else if (res.data.content == 11) {
              self.message = this.$t('checkpeople.gagal');
              self.$message.error(this.$t('checkpeople.gagal'));
            } else if (res.data.content == 12) {
              self.message = this.$t('checkpeople.sg');
              self.$message.error(this.$t('checkpeople.sg'));
            } else if (res.data.result == '-99' || res.data.result == '-999') {
              self.$message.error(res.data.resultMessage);
            } else {
              self.$message.error(res.data.resultMessage);
            }

          }).catch(function (err) {
            console.log("调用失败", err)
          })
        }
      },
      GetUserDictionary() {
        let self = this;
        self.$axios.post(self.url2).then((res) => {
          if (res.data.result == 0) {

            var ll = res.data.content.industryList.length;

            for (let i = 0; i < ll; i++) {
              self.industryList[res.data.content.industryList[i].code] = res.data.content.industryList[i].codeDesc;
            }
            var llist = res.data.content.loanUseList.length;
            for (let i = 0; i < llist; i++) {
              self.loanUseList[res.data.content.loanUseList[i].code] = res.data.content.loanUseList[i].codeDesc;
            }
            var mlist = res.data.content.marriedList.length;
            for (let i = 0; i < mlist; i++) {
              self.marriedList[res.data.content.marriedList[i].code] = res.data.content.marriedList[i].codeDesc;
            }
            var Rlist = res.data.content.relationShipList.length;
            for (let i = 0; i < Rlist; i++) {
              self.relationShipList[res.data.content.relationShipList[i].code] = res.data.content.relationShipList[
                i].codeDesc;
            }
            var relist = res.data.content.religionList.length;
            for (let i = 0; i < relist; i++) {
              self.religionList[res.data.content.religionList[i].code] = res.data.content.religionList[i].codeDesc;
            }

            var wlist = res.data.content.workAgeList.length;
            for (let i = 0; i < wlist; i++) {
              self.workAgeList[res.data.content.workAgeList[i].code] = res.data.content.workAgeList[i].codeDesc;
            }

            var eduL = res.data.content.eduList.length;
            for (let i = 0; i < eduL; i++) {
              self.eduList[res.data.content.eduList[i].code] = res.data.content.eduList[i].codeDesc;
            }


          } else if (res.data.result == '-99' || res.data.result == '-999') {
            self.$message.error(res.data.resultMessage);
          } else {
            self.$message.error(res.data.resultMessage);
          }

        }).catch(function (err) {
          console.log("调用失败", err)
        })
      },
      timetrans: function (row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        var date = new Date(date); //如果date为13位不需要乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y + M + D + h + m + s;
      },
      clearValue() {
        let self = this;
        self.personalInfo.address = "";
        self.personalInfo.maritalStatus = '';
        self.personalInfo.area = '';
        self.personalInfo.loanPurpose = '';
        self.personalInfo.bornDate = '';
        self.personalInfo.religion = '';
        self.personalInfo.educationLevel = '';
        self.personalInfo.province = '';
        self.personalInfo.city = '';
        self.personalInfo.area = '';

        self.ktpInfo.ktpName = '';
        self.ktpInfo.ktpNumber = '';
        self.ktpInfo.ktpPhotoUrl = '';
        self.ktpInfo.ktpSelfPhotoUrl = '';
        self.ktpInfo.authState = '';

        self.bankInfo.bankCode = '';
        self.bankInfo.bankName = '';
        self.bankInfo.bankNum = '';
        self.bankInfo.holder = '';
        self.bankInfo.status = '';

        self.emergencyContact.contactMobile1 = '';
        self.emergencyContact.contactMobile2 = '';
        self.emergencyContact.contactName1 = '';
        self.emergencyContact.contactName2 = '';
        self.emergencyContact.relation1 = '';
        self.emergencyContact.relation2 = '';

        self.workInfo.companyName = '';
        self.workInfo.companyTel = '';
        self.workInfo.industry = '';
        self.workInfo.monthlyIncome = '';
        self.workInfo.workAddress = '';
        self.workInfo.workAge = '';
        self.workInfo.workPosition = '';
      }
    }
  }
</script>

<style scoped>
  .handle-input {
    width: 150px;
    display: inline-block;
  }

  .presonMessage {
    width: 860px;
    margin: 10px 0;
  }

  hr {
    height: 2px;
    border: none;
    border-top: 1px solid #555555;
    margin: 10px 0;
    opacity: 0.5;
  }

  .status {
    margin-left: 50px;
  }

  .ktpInfo {
    line-height: 20px;
    /* display: flex;
        justify-content:space-evenly; */
  }

  .ktpInfo img {
    width: 100px;
    height: 100px;
  }

  .Order {
    display: flex;
    justify-content: space-between;
  }

  .text {
    vertical-align: middle;
    font-size: 15px;
    color: #48576a;
    line-height: 1;
    padding: 11px 12px 11px 0;
    box-sizing: border-box;
  }
</style>
