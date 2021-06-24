<template>
    <div class="row" style="margin-top: 100px;">
        <div class="col-md-4"></div>
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Login</h5>
                    <hr>
                    <input type="text" class="form-control" placeholder="username" style="margin-bottom: 8px;" v-model="username" required>
                    <input type="password" class="form-control" placeholder="password" style="margin-bottom: 8px;" v-model="password" required>
                    <button @click="login" class="btn btn-success" style="width: 100%">Login</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginScreen',
  data() {
      return {
          username: '',
          password: ''
      };
  },
  components: {
  },
  created() {
      if (localStorage.getItem('isLogin'))
        this.$router.push('/admin/home');
  },
  methods: {
      async login() {
          const result = await axios.post('https://k5lbovr518.execute-api.ap-southeast-1.amazonaws.com/login', {
                username: this.username,
                password: this.password
            });
            console.log(result.data)
          if (result.data) {
              localStorage.setItem('isLogin', true);
              this.$router.push('/admin/home');
          }
      }
  }
}
</script>
