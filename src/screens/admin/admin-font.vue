<template>
    <div>
        <h1>แก้ไข Font และขนาด Font</h1>
        <hr>
        <h4 class="text-center">Font</h4>
        <p class="text-center">รองรับ .ttf เท่านั้น</p>
        <h5>Font ขนาด Text</h5>
        <input type="file" @change="(e) => {onChangeFile(e, 'text')}">
        <br><br>
        <h5>Font ขนาด Medium</h5>
        <input type="file" @change="(e) => {onChangeFile(e, 'medium')}">
        <br><br>
        <h5>Font ขนาด Bold</h5>
        <input type="file" @change="(e) => {onChangeFile(e, 'bold')}">
        <br><br>
        <button class="btn btn-success" style="width: 100%" @click="uploadFont">อัพโหลด font</button>
        <br><br><br>
        <h4 class="text-center">ขนาด Font ในหน้า Home</h4>
        <img :src="require('@/assets/home.png')" style="width: 100%;">
        <label>ขนาดหัวข้อ</label>
        <input type="text" class="form-control" placeholder="ขนาดหัวข้อ" v-model="home.header1">
        <br>
        <label>ขนาดคำอธิบาย</label>
        <input type="text" class="form-control" placeholder="ขนาดคำอธิบาย" v-model="home.des1">
        <br>
        <button class="btn btn-success" style="width: 100%" @click="setHome">แก้ไข font หน้า home</button>
        <br><br><br>

        <h4 class="text-center">ขนาด Font ในหน้า Topic</h4>
        <img :src="require('@/assets/topic.png')" style="width: 100%;">
        <br><br>
        <label>ขนาดชื่อ Project</label>
        <input type="text" class="form-control" placeholder="ขนาดชื่อ Project" v-model="topic.project1">
        <br>
        <label>ขนาดคำอธิบาย</label>
        <input type="text" class="form-control" placeholder="ขนาดคำอธิบาย" v-model="topic.text1">
        <br>
        <label>ขนาดชื่อเจ้าของผลงาน</label>
        <input type="text" class="form-control" placeholder="ขนาดชื่อเจ้าของผลงาน" v-model="topic.name1">
        <br>
        <label>id เจ้าของผลงาน</label>
        <input type="text" class="form-control" placeholder="id เจ้าของผลงาน" v-model="topic.id1">
        <br>
        <button class="btn btn-success" style="width: 100%" @click="setTopic">แก้ไข font หน้า topic</button>
        <br><br><br>

        <h4 class="text-center">ขนาด Font ในหน้าผลงาน</h4>
        <img :src="require('@/assets/work.png')" style="width: 100%;">
        <br><br>
        <label>ขนาดชื่อ Topic</label>
        <input type="text" class="form-control" placeholder="ขนาดชื่อ Topic" v-model="work.topic1">
        <br>
        <label>ขนาดชื่อผลงาน</label>
        <input type="text" class="form-control" placeholder="ขนาดชื่อผลงาน" v-model="work.name1">
        <br>
        <label>ขนาดชื่อและ id เจ้าของผลงาน</label>
        <input type="text" class="form-control" placeholder="ขนาดชื่อและ id เจ้าของผลงาน" v-model="work.owner1">
        <br>
        <button class="btn btn-success" style="width: 100%" @click="setWork">แก้ไข font หน้า topic</button>
        <br><br><br>

        <h4 class="text-center">ขนาด Font ในหน้า About Us</h4>
        <img :src="require('@/assets/about.png')" style="width: 100%;">
        <br><br>
        <label>ขนาดชื่อหัวข้อ</label>
        <input type="text" class="form-control" placeholder="ขนาดชื่อหัวข้อ" v-model="about.header1">
        <br>
        <label>ขนาดคำอธิบาย</label>
        <input type="text" class="form-control" placeholder="ขนาดคำอธิบาย" v-model="about.content1">
        <br>
        <label>ขนาดคำอธิบายด้านขวา</label>
        <input type="text" class="form-control" placeholder="ขนาดคำอธิบายด้านขวา" v-model="about.right1">
        <br>
        <img :src="require('@/assets/special.png')" style="width: 100%;">
        <br><br>
        <label>ขนาดหัวข้อ Special Thanks</label>
        <input type="text" class="form-control" placeholder="ขนาดหัวข้อ Special Thanks" v-model="about.special1">
        <br>
        <label>ขนาดชื่อ</label>
        <input type="text" class="form-control" placeholder="ขนาดชื่อ" v-model="about.name1">
        <br>
        <button class="btn btn-success" style="width: 100%" @click="setAboutUs">แก้ไข font หน้า about us</button>
        <br><br><br>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AdminFont',
    data() {
        return {
            home: {},
            topic: {},
            work: {},
            about: {},
            files: {}
        }
    },
    async created() {
        const home = await axios.post(require('./../../host') + '/setting', {
            tableName: 'homeSetting'
        });
        this.home = home.data;
        const topic = await axios.post(require('./../../host') + '/setting', {
            tableName: 'topicSetting'
        });
        this.topic = topic.data;
        const work = await axios.post(require('./../../host') + '/setting', {
            tableName: 'workSetting'
        });
        this.work = work.data;
        const about = await axios.post(require('./../../host') + '/setting', {
            tableName: 'aboutSetting'
        });
        this.about = about.data;
    },
    methods: {
        onChangeFile(e, type) {
            this.files[type] = e.target.files[0];
        },
        async uploadFont() {
            if (this.files['text'] != undefined) {
                const fontUrl = await axios.post(require('./../../host') + '/admin/upload-font', {
                    font: 'text.ttf'
                });

                await fetch(fontUrl.data.url, { method: 'PUT', body: this.files['text'] });
            }

            if (this.files['medium'] != undefined) {
                const fontUrl = await axios.post(require('./../../host') + '/admin/upload-font', {
                    font: 'medium.ttf'
                });

                await fetch(fontUrl.data.url, { method: 'PUT', body: this.files['medium'] });
            }

            if (this.files['bold'] != undefined) {
                const fontUrl = await axios.post(require('./../../host') + '/admin/upload-font', {
                    font: 'bold.ttf'
                });

                await fetch(fontUrl.data.url, { method: 'PUT', body: this.files['bold'] });
            }

            alert('แก้ไขข้อมูลเสร็จสิ้น');
        },
        async setHome() {
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'homeSetting',
                key: 'header1',
                value: this.home.header1
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'homeSetting',
                key: 'des1',
                value: this.home.des1
            });
            alert('แก้ไขข้อมูลเสร็จสิ้น');
            
        },
        async setTopic() {
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'topicSetting',
                key: 'project1',
                value: this.topic.project1
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'topicSetting',
                key: 'text1',
                value: this.topic.text1
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'topicSetting',
                key: 'name1',
                value: this.topic.name1
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'topicSetting',
                key: 'id1',
                value: this.topic.id1
            });
            alert('แก้ไขข้อมูลเสร็จสิ้น');
            
        },
        async setWork() {
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'workSetting',
                key: 'topic1',
                value: this.work.topic1
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'workSetting',
                key: 'owner1',
                value: this.work.owner1
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'workSetting',
                key: 'name1',
                value: this.work.name1
            });
            alert('แก้ไขข้อมูลเสร็จสิ้น');
            
        },
        async setAboutUs() {
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'aboutSetting',
                key: 'header1',
                value: this.about.header1
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'aboutSetting',
                key: 'content1',
                value: this.about.content1
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'aboutSetting',
                key: 'right1',
                value: this.about.right1
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'aboutSetting',
                key: 'special1',
                value: this.about.special1
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'aboutSetting',
                key: 'name1',
                value: this.about.name1
            });
            alert('แก้ไขข้อมูลเสร็จสิ้น');
            
        }
    }
}
</script>
