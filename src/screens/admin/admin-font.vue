<template>
    <div>
        <h1>แก้ไข Font สีและขนาด Font</h1>
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
        <label>สีหัวข้อ</label>
        <input v-if="home.headerColor != undefined" class="form-control" type="color" style="height: 100px;" v-model="home.headerColor">
        <br>
        <label>Opacity หัวข้อ (กรอกเป็นทศนิยมช่วง 0.1 ถึง 1)</label>
        <input class="form-control" type="text" v-model="home.headerOpacity">
        <br>
        <label>ขนาดคำอธิบาย</label>
        <input type="text" class="form-control" placeholder="ขนาดคำอธิบาย" v-model="home.des1">
        <br>
        <label>สีคำอธิบาย</label>
        <input class="form-control" type="color" style="height: 100px;" v-model="home.desColor">
        <br>
        <label>Opacity คำอธิบาย (กรอกเป็นทศนิยมช่วง 0.1 ถึง 1)</label>
        <input class="form-control" type="text" v-model="home.desOpacity">
        <br>
        <button class="btn btn-success" style="width: 100%" @click="setHome">แก้ไข font หน้า home</button>
        <br><br><br>

        <h4 class="text-center">ขนาด Font ในหน้า Topic</h4>
        <img :src="require('@/assets/topic.png')" style="width: 100%;">
        <br><br>
        <label>ขนาดชื่อ Project</label>
        <input type="text" class="form-control" placeholder="ขนาดชื่อ Project" v-model="topic.project1">
        <br>
        <label>สีชื่อ Project</label>
        <input class="form-control" type="color" style="height: 100px;" v-model="topic.projectColor">
        <br>
        <label>Opacity ชื่อ Project (กรอกเป็นทศนิยมช่วง 0.1 ถึง 1)</label>
        <input class="form-control" type="text" v-model="topic.projectOpacity">
        <br>
        <label>ขนาดคำอธิบาย</label>
        <input type="text" class="form-control" placeholder="ขนาดคำอธิบาย" v-model="topic.text1">
        <br>
        <label>สีคำอธิบาย</label>
        <input class="form-control" type="color" style="height: 100px;" v-model="topic.textColor">
        <br>
        <label>Opacity คำอธิบาย (กรอกเป็นทศนิยมช่วง 0.1 ถึง 1)</label>
        <input class="form-control" type="text" v-model="topic.textOpacity">
        <br>
        <label>ขนาดชื่อเจ้าของผลงาน</label>
        <input type="text" class="form-control" placeholder="ขนาดชื่อเจ้าของผลงาน" v-model="topic.name1">
        <br>
        <label>สีชื่อเจ้าของผลงาน</label>
        <input class="form-control" type="color" style="height: 100px;" v-model="topic.nameColor">
        <br>
        <label>Opacity ชื่อเจ้าของผลงาน (กรอกเป็นทศนิยมช่วง 0.1 ถึง 1)</label>
        <input class="form-control" type="text" v-model="topic.nameOpacity">
        <br>
        <label>id เจ้าของผลงาน</label>
        <input type="text" class="form-control" placeholder="id เจ้าของผลงาน" v-model="topic.id1">
        <br>
        <label>สี id เจ้าของผลงาน</label>
        <input class="form-control" type="color" style="height: 100px;" v-model="topic.idColor">
        <br>
        <label>Opacity id เจ้าของผลงาน (กรอกเป็นทศนิยมช่วง 0.1 ถึง 1)</label>
        <input class="form-control" type="text" v-model="topic.idOpacity">
        <br>
        <button class="btn btn-success" style="width: 100%" @click="setTopic">แก้ไข font หน้า topic</button>
        <br><br><br>

        <h4 class="text-center">ขนาด Font ในหน้าผลงาน</h4>
        <img :src="require('@/assets/work.png')" style="width: 100%;">
        <br><br>
        <label>ขนาดชื่อ Topic</label>
        <input type="text" class="form-control" placeholder="ขนาดชื่อ Topic" v-model="work.topic1">
        <br>
        <label>สีชื่อ Topic</label>
        <input class="form-control" type="color" style="height: 100px;" v-model="work.topicColor">
        <br>
        <label>Opacity สีชื่อ Topic (กรอกเป็นทศนิยมช่วง 0.1 ถึง 1)</label>
        <input class="form-control" type="text" v-model="work.topicOpacity">
        <br>
        <label>ขนาดชื่อผลงาน</label>
        <input type="text" class="form-control" placeholder="ขนาดชื่อผลงาน" v-model="work.name1">
        <br>
        <label>สีชื่อผลงาน</label>
        <input class="form-control" type="color" style="height: 100px;" v-model="work.nameColor">
        <br>
        <label>Opacity ชื่อผลงาน (กรอกเป็นทศนิยมช่วง 0.1 ถึง 1)</label>
        <input class="form-control" type="text" v-model="work.nameOpacity">
        <br>
        <label>ขนาดชื่อและ id เจ้าของผลงาน</label>
        <input type="text" class="form-control" placeholder="ขนาดชื่อและ id เจ้าของผลงาน" v-model="work.owner1">
        <br>
        <label>สีชื่อและ id เจ้าของผลงาน</label>
        <input class="form-control" type="color" style="height: 100px;" v-model="work.ownerColor">
        <br>
        <label>Opacity สีชื่อและ id เจ้าของผลงาน (กรอกเป็นทศนิยมช่วง 0.1 ถึง 1)</label>
        <input class="form-control" type="text" v-model="work.ownerOpacity">
        <br>
        <button class="btn btn-success" style="width: 100%" @click="setWork">แก้ไข font หน้า topic</button>
        <br><br><br>

        <h4 class="text-center">ขนาด Font ในหน้า About Us</h4>
        <img :src="require('@/assets/about.png')" style="width: 100%;">
        <br><br>
        <label>ขนาดชื่อหัวข้อ</label>
        <input type="text" class="form-control" placeholder="ขนาดชื่อหัวข้อ" v-model="about.header1">
        <br>
        <label>สีชื่อหัวข้อ</label>
        <input class="form-control" type="color" style="height: 100px;" v-model="about.headerColor">
        <br>
        <label>Opacity ชื่อหัวข้อ (กรอกเป็นทศนิยมช่วง 0.1 ถึง 1)</label>
        <input class="form-control" type="text" v-model="about.headerOpacity">
        <br>
        <label>ขนาดคำอธิบาย</label>
        <input type="text" class="form-control" placeholder="ขนาดคำอธิบาย" v-model="about.content1">
        <br>
        <label>สีคำอธิบาย</label>
        <input class="form-control" type="color" style="height: 100px;" v-model="about.contentColor">
        <br>
        <label>Opacity คำอธิบาย (กรอกเป็นทศนิยมช่วง 0.1 ถึง 1)</label>
        <input class="form-control" type="text" v-model="about.contentOpacity">
        <br>
        <label>ขนาดคำอธิบายด้านขวา</label>
        <input type="text" class="form-control" placeholder="ขนาดคำอธิบายด้านขวา" v-model="about.right1">
        <br>
        <label>สีคำอธิบายด้านขวา</label>
        <input class="form-control" type="color" style="height: 100px;" v-model="about.rightColor">
        <br>
        <label>Opacity คำอธิบายด้านขวา (กรอกเป็นทศนิยมช่วง 0.1 ถึง 1)</label>
        <input class="form-control" type="text" v-model="about.rightOpacity">
        <br>
        <img :src="require('@/assets/special.png')" style="width: 100%;">
        <br><br>
        <label>ขนาดหัวข้อ Special Thanks</label>
        <input type="text" class="form-control" placeholder="ขนาดหัวข้อ Special Thanks" v-model="about.special1">
        <br>
        <label>สีหัวข้อ Special Thanks</label>
        <input class="form-control" type="color" style="height: 100px;" v-model="about.specialColor">
        <br>
        <label>Opacity หัวข้อ Special Thanks (กรอกเป็นทศนิยมช่วง 0.1 ถึง 1)</label>
        <input class="form-control" type="text" v-model="about.specialOpacity">
        <br>
        <label>ขนาดชื่อ</label>
        <input type="text" class="form-control" placeholder="ขนาดชื่อ" v-model="about.name1">
        <br>
        <label>สีชื่อ</label>
        <input class="form-control" type="color" style="height: 100px;" v-model="about.nameColor">
        <br>
        <label>Opacity ชื่อ (กรอกเป็นทศนิยมช่วง 0.1 ถึง 1)</label>
        <input class="form-control" type="text" v-model="about.nameOpacity">
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
        console.log(this.home);
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
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'homeSetting',
                key: 'headerColor',
                value: this.home.headerColor
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'homeSetting',
                key: 'headerOpacity',
                value: this.home.headerOpacity
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'homeSetting',
                key: 'des1',
                value: this.home.des1
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'homeSetting',
                key: 'desColor',
                value: this.home.desColor
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'homeSetting',
                key: 'desOpacity',
                value: this.home.desOpacity
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
                key: 'projectColor',
                value: this.topic.projectColor
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'topicSetting',
                key: 'projectOpacity',
                value: this.topic.projectOpacity
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'topicSetting',
                key: 'text1',
                value: this.topic.text1
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'topicSetting',
                key: 'textColor',
                value: this.topic.textColor
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'topicSetting',
                key: 'textOpacity',
                value: this.topic.textOpacity
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'topicSetting',
                key: 'name1',
                value: this.topic.name1
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'topicSetting',
                key: 'nameColor',
                value: this.topic.nameColor
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'topicSetting',
                key: 'nameOpacity',
                value: this.topic.nameOpacity
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'topicSetting',
                key: 'id1',
                value: this.topic.id1
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'topicSetting',
                key: 'idColor',
                value: this.topic.idColor
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'topicSetting',
                key: 'idOpacity',
                value: this.topic.idOpacity
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
                key: 'topicColor',
                value: this.work.topicColor
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'workSetting',
                key: 'topicOpacity',
                value: this.work.topicOpacity
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'workSetting',
                key: 'owner1',
                value: this.work.owner1
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'workSetting',
                key: 'ownerColor',
                value: this.work.ownerColor
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'workSetting',
                key: 'ownerOpacity',
                value: this.work.ownerOpacity
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'workSetting',
                key: 'name1',
                value: this.work.name1
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'workSetting',
                key: 'nameColor',
                value: this.work.nameColor
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'workSetting',
                key: 'nameOpacity',
                value: this.work.nameOpacity
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
                key: 'headerColor',
                value: this.about.headerColor
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'aboutSetting',
                key: 'headerOpacity',
                value: this.about.headerOpacity
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'aboutSetting',
                key: 'content1',
                value: this.about.content1
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'aboutSetting',
                key: 'contentColor',
                value: this.about.contentColor
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'aboutSetting',
                key: 'contentOpacity',
                value: this.about.contentOpacity
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'aboutSetting',
                key: 'right1',
                value: this.about.right1
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'aboutSetting',
                key: 'rightColor',
                value: this.about.rightColor
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'aboutSetting',
                key: 'rightOpacity',
                value: this.about.rightOpacity
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'aboutSetting',
                key: 'special1',
                value: this.about.special1
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'aboutSetting',
                key: 'specialColor',
                value: this.about.specialColor
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'aboutSetting',
                key: 'specialOpacity',
                value: this.about.specialOpacity
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'aboutSetting',
                key: 'name1',
                value: this.about.name1
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'aboutSetting',
                key: 'nameColor',
                value: this.about.nameColor
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'aboutSetting',
                key: 'nameOpacity',
                value: this.about.nameOpacity
            });
            alert('แก้ไขข้อมูลเสร็จสิ้น');
            
        }
    }
}
</script>
