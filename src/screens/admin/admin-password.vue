<template>
    <div>
        <h1>แก้ไข username password สำหรับเข้าหน้า admin</h1>
        <hr>
        <label>Username</label>
        <input type="text" placeholder="Username" v-model="username" class="form-control">
        <label>Password</label>
        <input type="password" placeholder="Password" v-model="password" class="form-control">
        <label>ยืนยัน Password</label>
        <input type="password" placeholder="ยืนยัน Username" v-model="repassword" class="form-control">
        <br>
        <button @click="changePassword" class="btn btn-warning" style="width: 100%;color: white;" :disabled="(password != repassword) || (password == '') || repassword == ''">แก้ไข</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AdminPassword',
    data() {
        return {
            username: '',
            password: '',
            repassword: ''
        }
    },
    methods: {
        async changePassword() {
            await axios.post(require('./../../host') + '/change-password', {
                username: this.username,
                password: this.password
            });
            alert('แก้ไขข้อมูลสำเร็จ');
            this.$router.go()
        },
    }
}
</script>
