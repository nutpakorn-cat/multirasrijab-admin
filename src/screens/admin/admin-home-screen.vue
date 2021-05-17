<template>
    <div>
        <h1>แก้ไขหน้า Home</h1>
        <hr>
        <div v-if="showInfo" class="alert alert-success alert-dismissible fade show" role="alert">
            แก้ไขข้อมูลสำเร็จ
            <button @click="() => { showInfo = false; }" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <label>URL ของคลิป</label>
        <input type="text" class="form-control" v-model="data.mediaClip">
        <br>
        <label>หัวข้อ</label>
        <input type="text" class="form-control" v-model="data.header">
        <br>
        <label>เนื้อหา</label>
        <textarea class="form-control" v-model="data.content"></textarea>
        <br>
        <button v-if="!isLoad" @click="send" class="btn btn-success" style="width: 100%">อัพเดทข้อมูล</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AdminHome',
    data() {
        return {
            data: {
                mediaClip: '',
                header: '',
                content: ''
            },
            showInfo: false,
            isLoad: false
        }
    },
    async created() {
        const data = await axios.get(require('./../../host') + '/home');
        this.data = data.data; 
    },
    methods: {
        async send() {
            this.isLoad = true;
            await axios.put(require('./../../host') + '/admin/home', {
                mediaClip: this.data.mediaClip,
                header: this.data.header,
                content: this.data.content
            });
            this.showInfo = true;    
            this.isLoad = false;
        }
    }
}
</script>
