<template>
    <div :key="mainKey">
        <h1>แก้ไขหน้า About Us</h1>
        <hr>
        <div v-if="showInfo" class="alert alert-success alert-dismissible fade show" role="alert">
            แก้ไขข้อมูลสำเร็จ
            <button @click="() => { showInfo = false; }" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <label>หัวข้อ</label>
        <input type="text" class="form-control" v-model="data.header">
        <br>
        <label>คำอธิบายหัวข้อ</label>
        <input type="text" class="form-control" v-model="data.header2">
        <br>
        <label>เนื้อหา</label>
        <textarea class="form-control" v-model="data.content"></textarea>
        <br>
        <button v-if="!isLoad" @click="send" class="btn btn-success" style="width: 100%">อัพเดทข้อมูล</button>
        <hr>
        <br><br>
        <h1>จัดการ Special Thanks</h1>
        <hr>
        <div class="row">
            <div v-for="(person, i) in data.specialThanks" :key="person.personName" class="col-md-4">
                <div class="card">
                    <img :src="person.image" class="card-img-top" alt="...">
                    <div class="card-body text-center">
                        <h5 class="card-title">ชื่อ</h5>
                        <input type="text" class="form-control" v-model="data.specialThanks[i].personName" style="margin-bottom: 15px;">
                        <h5 class="card-title">ลิงค์รูป</h5>
                        <input type="text" class="form-control" v-model="data.specialThanks[i].image" style="margin-bottom: 15px;">
                        <div v-if="!isLoad2"><button style="color: white;" @click="updateSpecialThanks(person.entityId, i)" class="btn btn-warning">แก้ไข</button> <button @click="deleteSpecialThanks(person.entityId)" class="btn btn-danger">ลบ</button></div>
                    </div>
                </div>
            </div>
        </div>
        <br><br>
        <h1>เพิ่ม Special Thanks</h1>
        <hr>
        <div class="card">
            <div class="card-body text-center">
                <h5 class="card-title">ชื่อ</h5>
                <input type="text" class="form-control" v-model="personName" style="margin-bottom: 15px;">
                <h5 class="card-title">ลิงค์รูป</h5>
                <input type="text" class="form-control" v-model="image" style="margin-bottom: 15px;">
                <div v-if="!isLoad3"><button @click="addSpecialThanks" class="btn btn-success" style="width: 100%">เพิ่ม</button></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AdminAboutUs',
    data() {
        return {
            mainKey: 0,
            data: {
                header: '',
                header2: '',
                content: '',
                specialThanks: []
            },
            showInfo: false,
            isLoad: false,
            isLoad2: false,
            isLoad3: false
        }
    },
    async created() {
        const data = await axios.get(require('./../../host') + '/about-us');
        this.data = data.data; 
    },
    methods: {
        async send() {
            this.showInfo = false;  
            this.isLoad = true;
            await axios.put(require('./../../host') + '/admin/about-us', {
                header: this.data.header,
                header2: this.data.header2,
                content: this.data.content
            });
            this.showInfo = true;    
            this.isLoad = false;
        },
        async updateSpecialThanks(entityId, i) {
            this.isLoad2 = true;
            await axios.put(require('./../../host') + '/admin/special-thanks', {
                entityId,
                personName: this.data.specialThanks[i].personName,
                image: this.data.specialThanks[i].image
            });
            this.isLoad2 = false;
            this.$router.go()
        },
        async deleteSpecialThanks(entityId) {
            this.isLoad2 = true;
            await axios.delete(require('./../../host') + '/admin/special-thanks', {
                data: {
                    entityId
                },
            });
            this.isLoad2 = false;
            this.$router.go()
        },
        async addSpecialThanks() {
            this.isLoad3 = true;
            await axios.post(require('./../../host') + '/admin/special-thanks', {
                personName: this.personName,
                image: this.image
            });
            this.isLoad3 = false;
            this.$router.go()
        }
    }
}
</script>
