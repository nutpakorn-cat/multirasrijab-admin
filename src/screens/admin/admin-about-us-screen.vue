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
                        <h5 class="card-title">รูป</h5>
                        <Uploader :onChangeCallback="(e) => { processFiles(e, person.entityId) }" />
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
                <h5 class="card-title">รูป</h5>
                <Uploader :onChangeCallback="processFile" />
                <div v-if="!isLoad3"><button @click="addSpecialThanks" class="btn btn-success" style="width: 100%">เพิ่ม</button></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Uploader from './../../components/uploader.vue';

export default {
    name: 'AdminAboutUs',
    components: {
        Uploader
    },
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
            isLoad3: false,
            file: undefined,
            files: {},
            image: ''
        }
    },
    async created() {
        const data = await axios.get(require('./../../host') + '/about-us');
        this.data = data.data; 
    },
    methods: {
        processFile(e) {
            this.file = e.target.files[0];
        },
        processFiles(e, id) {
            this.files[id] = e.target.files[0];
        },
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

            const file = this.files[entityId];

            if (file != undefined && file != null && file != '') {
                console.log(file)
                let extension = '';

                if (file['type'] == 'image/jpeg') {
                    extension = '.jpg';
                } else if (file['type'] == 'image/png') {
                    extension = '.png';
                } else {
                    this.isLoad2 = false;
                    return;
                }

                const imageOutput = await axios.post('https://k5lbovr518.execute-api.ap-southeast-1.amazonaws.com/admin/image', {
                    extension
                });

                await fetch(imageOutput.data.url, { method: 'PUT', body: file });

                await axios.put(require('./../../host') + '/admin/special-thanks', {
                    entityId,
                    personName: this.data.specialThanks[i].personName,
                    image: imageOutput.data.outputUrl
                });
            } else {
                console.log('Without image url');
                await axios.put(require('./../../host') + '/admin/special-thanks', {
                    entityId,
                    personName: this.data.specialThanks[i].personName,
                    image: this.data.specialThanks[i].image
                });
            }
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

            const file = this.file;

            if (file == undefined) {
                this.isLoad3 = false;
                return;
            }

            let extension = '';

            if (file['type'] == 'image/jpeg') {
                extension = '.jpg';
            } else if (file['type'] == 'image/png') {
                extension = '.png';
            } else {
                this.isLoad3 = false;
                return;
            }

            const imageOutput = await axios.post('https://k5lbovr518.execute-api.ap-southeast-1.amazonaws.com/admin/image', {
                extension
            });

            await fetch(imageOutput.data.url, { method: 'PUT', body: file });

            await axios.post(require('./../../host') + '/admin/special-thanks', {
                personName: this.personName,
                image: imageOutput.data.outputUrl
            });
            this.isLoad3 = false;
            this.$router.go()
        }
    }
}
</script>
