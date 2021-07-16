<template>
    <div>
        <h1>แก้ไขสีของระบบ</h1>
        <hr>
        <h4 class="text-center">แก้สีแถบ</h4>
        <img :src="require('@/assets/color.png')" style="width: 100%;">
        <br><br>
        <label>สีแถบ</label>
        <input class="form-control" type="color" style="height: 100px;" v-model="this.color">
        <br>
        <button class="btn btn-success" style="width: 100%" @click="onClick">แก้ไขสีแถบ</button>
        <br><br><br>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AdminColor',
    data() {
        return {
            color: '#000000'
        }
    },
    async created() {
        const data = await axios.post(require('./../../host') + '/setting', {
            tableName: 'navbarSetting'
        });
        this.color = data.data.color;
    },
    methods: {
        async onClick() {
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'navbarSetting',
                key: 'color',
                value: this.color
            });
            alert('แก้ไขข้อมูลเสร็จสิ้น');
            
        },
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
