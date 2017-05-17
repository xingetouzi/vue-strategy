<template>
  <div class="login">
    <h2>大鱼金融</h2>
    <el-form ref="loginForm" :model="form" label-width="80px">
      <el-form-item
              label="用户名"
              :rules="[{ required: true, message: '用户名不能为空'}]"
      >
        <el-input
                v-model="form.username"
                placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item
              label="密码"
              :rules="[{ required: true, message: '密码不能为空'}]"
      >
        <el-input
                v-model="form.password"
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
  export default {
    data() {
      return {
        form: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      submit(formName) {
        console.log('submit', formName, this.$refs[formName].validate)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            window.alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      reset(formName) {
        console.log('reset', this.form)
        this.$refs[formName].resetFields()
      }
    }
  }

</script>
