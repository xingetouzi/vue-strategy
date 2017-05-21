<template>
  <div class="login">
    <h2>大鱼金融</h2>
    <el-form :model="loginForm" ref="loginForm" label-width="80px">
      <el-form-item
              label="用户名"
              prop="username"
              :rules="[{ required: true, message: '用户名不能为空'}]"
      >
        <el-input
                v-model="loginForm.username"
                placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item
              label="密码"
              prop="password"
              :rules="[{ required: true, message: '密码不能为空'}]"
      >
        <el-input
                v-model="loginForm.password"
                placeholder="请输入密码"
                type="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit('loginForm')">提交</el-button>
        <el-button @click="reset('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss">
  .login {
    width: 500px;
    margin-top: 10%;
    margin-left: 50%;
    transform: translate(-50%, 0);
    h2 {
      text-align: center;
    }
  }

</style>

<script type="text/babel">
  import {login} from '../../service/getData'
  export default {
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      submit(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            let res = await login(this.loginForm)
            if (res.data.success === 1) {
              console.log(res, '登录成功！')
              window.location.href = '/home'
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      reset(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }

</script>
