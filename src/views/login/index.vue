<template>
  <div class="login-view">
    <el-row>
      <el-col :span="6"></el-col>
      <el-col :span="12" class="right">
        <div>
          <div class="mb-40 title-text">👋🏻 Welcome to {{ systemName }}</div>
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" autocomplete="on">
            <el-form-item label="用户名" prop="username">
              <el-input clearable v-model="loginForm.username" placeholder="用户名"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input clearable v-model="loginForm.password" :type="passwordType"
                        placeholder="密码">
                <template #suffix v-if="loginForm.password">
                  <Icon :size="15">
                    <Eye v-if="!showPassword" @click.native="showPassword = true"/>
                    <EyeOff v-else @click.native="showPassword = false"/>
                  </Icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="mt-40" style="display: block; width: 100%"
                         :loading="loading" @click="fetchLogin('loginForm')">登陆
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<script>
import {Eye, EyeOff} from '@v2icons/ionicons5'

export default {
  name: "indexView",
  components: {
    Eye, EyeOff
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      systemName: '管理系统',
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur', validation: validatePassword},
        ]
      },
      showPassword: false,
      loading: false
    }
  },
  computed: {
    passwordType() {
      return this.showPassword ? "text" : "password"
    }
  },
  methods: {
    fetchLogin(formName) {
      this.loading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/Login', this.loginForm).then(() => {
            this.$router.push('/')
          })
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.login-view {


  .xicon {
    transition: all .25s;

    &:hover {
      color: #919399
    }
  }

  .el-row, .el-col {
    height: 100vh;
  }

  .title-text {
    font-size: 1.3rem;
    color: $--color-primary;
    text-align: center;
  }

  .mb-40 {
    margin-bottom: 40px;
  }

  .mt-40 {
    margin-top: 40px;
  }

  .left {
    background-color: $--color-primary;
  }

  .right {
    padding: 128px;
  }
}
</style>
