<template>
    <div>
        <div>
            <h1>แก้ไขหน้า Home</h1>
            <hr>
            <div v-if="showInfo" class="alert alert-success alert-dismissible fade show" role="alert">
                แก้ไขข้อมูลสำเร็จ
                <button @click="() => { showInfo = false; }" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <label>Embed URL ของคลิป</label>
            <br>
            <p>หาได้จาก</p>
            <p>1) เข้าไปที่ https://streamable.com/upload-video แล้วอัพโหลด Video</p>
            <p>2) เมื่อ Upload เสร็จแล้วกดปุ่ม Embed</p>
            <img :src="require('@/assets/1.png')" width="300">
            <p>3) ตั้งค่าตามในภาพ แล้วกด Copy Embed URL</p>
            <img :src="require('@/assets/2.png')" width="300">
            <p>4) กดวางที่กล่อง Embed URL ข้างล่างนี้ แล้วกดอัพเดทข้อมูล</p>
            <label>Embed URL</label>
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
        <br><br><br>
        <div>
            <h1>แก้ไขกราฟิก</h1>
            <hr>
            <div v-for="(graphicKey, i) in graphicKeyList" :key="i">
                <br>
                <br>
                <Uploader :previewImage="graphic[graphicKey[0]]" :labelName="graphicKey[1]" :onChangeCallback="(e) => { processFile(e, graphicKey[0]) }" />
                <br>
                <br>
                <br>
            </div>
            <button class="btn btn-success" style="width: 100%" :onClick="() => { upload() }">อัพโหลด</button>
        </div>
    </div>
</template>

<script>
import Uploader from './../../components/uploader.vue';
import axios from 'axios';

export default {
    name: 'AdminHome',
    components: {
        Uploader
    },
    data() {
        return {
            data: {
                mediaClip: '',
                header: '',
                content: ''
            },
            graphicKeyList: [
                ['logo', 'ภาพ Logo'],
                ['welcome', 'พื้นหลังหน้าแรกสุดของเว็บ'],
                ['home', 'พื้นหลังหน้า Home'],
                ['anim', 'พื้นหลังหน้า Animation'],
                ['ins', 'พื้นหลังหน้า Installation'],
                ['ci', 'พื้นหลังหน้า Corperate & Brand Identity'],
                ['ca', 'พื้นหลังหน้า Campaign'],
                ['int', 'พื้นหลังหน้า Interactive'],
                ['aboutus', 'พื้นหลังหน้า About Us'],
                ['works', 'พื้นหลังเวลากดเข้าไปดูผลงาน'],
                ['college', 'College of Social Communication Innovation Logo'],
                ['iamd', 'IAMD Logo'],
                ['intlogo', 'Interactive & Multimedia Design Logo'],
                ['facebook', 'รูป Icon Facebook'],
                ['letsgo', 'ปุ่ม Let\'s Go'],
            ],
            files: {},
            graphic: {},
            showInfo: false,
            isLoad: false
        }
    },
    async created() {
        const data = await axios.get(require('./../../host') + '/home');
        this.data = data.data; 
        const graphic = await axios.get(require('./../../host') + '/graphic');
        this.graphic = graphic.data;
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
        },
        processFile(e, name) {
            this.files[name] = e.target.files[0];
        },
        async upload() {

            document.body.style.cursor='wait';

            for (let i = 0 ; i < Object.keys(this.files).length ; ++i) {
                
                const eachKey = Object.keys(this.files)[i];

                const name = eachKey;
                const file = this.files[name];

                if (file == undefined)
                    continue;

                let extension = '';

                if (file['type'] == 'image/jpeg') {
                    extension = '.jpg';
                } else if (file['type'] == 'image/png') {
                    extension = '.png';
                } else {
                    return;
                }

                const imageOutput = await axios.post('https://k5lbovr518.execute-api.ap-southeast-1.amazonaws.com/admin/image', {
                    extension
                });

                await fetch(imageOutput.data.url, { method: 'PUT', body: file });

                await axios.post('https://k5lbovr518.execute-api.ap-southeast-1.amazonaws.com/admin/graphic', {
                    key: name,
                    value: imageOutput.data.outputUrl
                });
            }

            window.location.reload();
        }
    }
}
</script>
