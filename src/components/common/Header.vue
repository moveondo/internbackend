<template>
  <div class="header">
    <div class="logo">{{$t('system.title')}}</div>

    <div class="user-info">
      <div class="switchChange">
        <el-switch style="display: block" v-model="onOff" active-color="#13ce66" inactive-color="#ff4949" @change="switchChange(onOff)"
          active-text="中印双语" inactive-text="Bahasa indonesia">
        </el-switch>
      </div>
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <img class="user-logo" src="../../../static/img/logo.png"> {{username}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">{{$t('system.out')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        url: "/backend/ILoginService/login",
        name: '',
        onOff: true,
        lang: 'in',
        locale: '',
      }
    },
    created() {
      let locale = localStorage.getItem('cookie-language')
      this.$store.commit('changeLocale', locale)
      this.onOff = locale === 'zh' ? true : false
    },

    computed: {
      username() {
        let username = localStorage.getItem('ms_username');
        return username ? username : this.name;
      }
    },
    methods: {
      switchChange(value) {
        // debugger
        if (value == true) {
          this.locale = "zh";
          localStorage.setItem("cookie-language", "zh");
        } else {
          this.locale = "in";
          localStorage.setItem("cookie-language", "in");
        }
        this.$i18n.locale = this.locale;
        console.log(`locale is ${this.locale}`)
        // 更新 store 语言标记
        this.$store.dispatch('changeLocale', this.locale)
        this.updateLanguage();
      },
      handleCommand(command) {
        if (command == 'logout') {
          localStorage.clear()
          this.$i18n.locale = 'in'
          this.$store.dispatch('changeLocale', 'in')
          this.$router.replace('/login');
        }
      },
      updateLanguage() {
        const self = this;
        let mobile = localStorage.getItem('ms_mobile');
        let password = localStorage.getItem('ms_password');
        let FunctionUrl = [];

        self.$axios.post(self.url, {
          "mobile": mobile,
          "password": password,
        }).then((res) => {
          if (res.data.result == 0) {

            var Length = res.data.content.functionList.length;
            if (Length > 0) {

              for (let i = 0; i < Length; i++) {
                // console.log(res.data.content.functionList[i]);
                FunctionUrl.push(res.data.content.functionList[i]);
              }
            }
            // 更新侧边栏的数组值
            self.$store.commit('setFunctionList', res.data.content.functionList)
            localStorage.setItem("FunctionUrl", JSON.stringify(FunctionUrl));

          } else {
            self.$message.error(res.data.resultMessage);
          }

        }).catch(function (err) {
          console.log("调用失败", err)
        })
      },
    }
  }
</script>
<style scoped>
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    line-height: 70px;
    color: #fff;
  }

  .header .logo {
    float: left;
    width: 320px;
    text-align: center;
  }

  .user-info {
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #fff;
    display: flex;
  }

  .user-info .switchChange {
    margin-top: 28px;
    margin-right: 20px;
  }

  .user-info .el-dropdown-link {
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
  }

  .user-info .user-logo {
    position: absolute;
    left: 0;
    top: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }
</style>
