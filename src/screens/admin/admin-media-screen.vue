<template>
    <div>
        <h1>จัดการข้อมูลงานเพิ่มเติมนักศึกษา</h1>
        <hr>
        <h3>หัวข้อ Topic</h3>
        <select @change="onChangeData" v-model="selectedTopicId" class="form-select">
            <option v-for="eachTopic in data.topicList" :key="eachTopic.entityId" :value="eachTopic.entityId">{{eachTopic.topicName}}</option>
        </select>
        <h3>ชื่อนักศึกษา</h3>
        <select @change="onChangeData2" v-model="selectedWorkOwnerId" class="form-select">
            <option v-for="eachWork in data.workList" :key="eachWork.entityId" :value="eachWork.workOwnerId">{{eachWork.workId}} - {{eachWork.workName}} - {{eachWork.workOwnerName}}</option>
        </select>
        <br><br>
        <h1>เพิ่มข้อมูลงานเพิ่มเติม</h1>
        <hr>
        <div class="card">
            <div class="card-body text-center">
                <p class="card-title">ประเภทผลงาน</p>
                <select class="form-select" v-model="mediaType">
                    <option value="image">รูปภาพ</option>
                    <option value="youtube">วิดิโอ</option>
                </select>
                <div v-if="mediaType == 'youtube'">
                    <p class="card-title">URL ผลงาน (กดปุ่ม SHARE ใน Youtube แล้วจะได้ลิงค์แบบนี้มา เช่น https://youtu.be/ABCDEF-GHI)</p>
                    <input type="text" class="form-control" v-model="mediaData" style="margin-bottom: 15px;">
                </div>
                <div v-else>
                    <p class="card-title">ภาพผลงาน</p>
                    <Uploader :onChangeCallback="processFile" />
                </div>
                <br>
                <div><button @click="addData" class="btn btn-success" style="width: 100%">เพิ่ม</button></div>
            </div>
        </div>
        <br><br>
        <div class="row">
            <div v-for="(each, i) in data.mediaList" :key="each.entityId" class="col-md-4" style="margin-bottom: 20px;">
                <div class="card">
                    <img v-if="data.mediaList[i].mediaType != 'youtube'" :src="each.mediaPath" class="card-img-top" alt="...">
                    <div class="card-body text-center">
                        <p class="card-title">ประเภทผลงาน</p>
                        <select class="form-select" v-model="data.mediaList[i].mediaType">
                            <option value="image">รูปภาพ</option>
                            <option value="youtube">วิดิโอ</option>
                        </select>
                        <div v-if="data.mediaList[i].mediaType == 'image'">
                            <p class="card-title">ผลงาน</p>
                            <Uploader :onChangeCallback="(e) => { processFiles(e, each.entityId) }" />
                        </div>
                        <div v-if="data.mediaList[i].mediaType == 'youtube'">
                            <p class="card-title">URL ผลงาน</p>
                            <input type="text" class="form-control" v-model="data.mediaList[i].mediaClip" style="margin-bottom: 15px;">
                        </div>
                        <button style="color: white;" @click="update(each.entityId, i)" class="btn btn-warning">แก้ไข</button> <button @click="deleteData(each.entityId)" class="btn btn-danger">ลบ</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Uploader from './../../components/uploader.vue';
import axios from 'axios';

export default {
    name: 'AdminMedia',
    components: {
        Uploader
    },
    data() {
        return {
            data: {
                workList: [],
                topicList: [],
                mediaList: []
            },
            selectedTopicId: '',
            selectedWorkOwnerId: '',
            mediaType: 'image',
            mediaData: '',
            file: undefined,
            files: {}
        }
    },
    created() {
        this.fetchData(true);
    },
    methods: {
        processFile(e) {
            this.file = e.target.files[0];
        },
        processFiles(e, id) {
            this.files[id] = e.target.files[0];
        },
        async fetchData(isCreated) {
            const data = await axios.get(require('./../../host') + '/navbar');
            this.data.topicList = data.data;
            
            if (isCreated)
                this.selectedTopicId = this.data.topicList[0].entityId;

            const data2 = await axios.get(require('./../../host') + '/work', {
                params: {
                    topicId: this.selectedTopicId
                }
            });
            this.data.workList = data2.data;

            if (isCreated)
                this.selectedWorkOwnerId = this.data.workList[0].workOwnerId;

            const data3 = await axios.post(require('./../../host') + '/media', {
                workOwnerId: this.selectedWorkOwnerId
            });
            this.data.mediaList = data3.data;
        },
        async onChangeData() {
            const data2 = await axios.get(require('./../../host') + '/work', {
                params: {
                    topicId: this.selectedTopicId
                }
            });
            this.data.workList = data2.data;
            this.selectedWorkOwnerId = this.data.workList[0].workOwnerId;

            const data3 = await axios.post(require('./../../host') + '/media', {
                workOwnerId: this.selectedWorkOwnerId
            });
            this.data.mediaList = data3.data;
        },
        async onChangeData2() {
            const data3 = await axios.post(require('./../../host') + '/media', {
                workOwnerId: this.selectedWorkOwnerId
            });
            this.data.mediaList = data3.data;
        },
        async update(entityId, i) {

            if (!(('mediaClip') in this.data.mediaList[i]))
                this.data.mediaList[i].mediaClip = '';

            if (!(('mediaPath') in this.data.mediaList[i]))
                this.data.mediaList[i].mediaPath = '';

            if (this.data.mediaList[i].mediaType == 'image') {
                const file = this.files[entityId];

                if (file == undefined) {
                    return;
                }

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
                await axios.put(require('./../../host') + '/admin/media', {
                    entityId,
                    mediaType: this.data.mediaList[i].mediaType,
                    mediaClip: this.data.mediaList[i].mediaClip.replace('youtu.be/', 'youtube.com/embed/'),
                    mediaPath: imageOutput.data.outputUrl
                });
            } else {
                await axios.put(require('./../../host') + '/admin/media', {
                    entityId,
                    mediaType: this.data.mediaList[i].mediaType,
                    mediaClip: this.data.mediaList[i].mediaClip.replace('youtu.be/', 'youtube.com/embed/'),
                    mediaPath: this.data.mediaList[i].mediaPath
                });
            }
            alert('แก้ไขข้อมูลสำเร็จ');
            this.fetchData(false);
        },
        async deleteData(entityId) {
            await axios.delete(require('./../../host') + '/admin/media', {
                data: {
                    entityId
                },
            });
            alert('ลบข้อมูลสำเร็จ');
            this.fetchData(false);
        },
        async addData() {
            if (this.mediaType == 'image') {

                const file = this.file;

                if (file == undefined) {
                    return;
                }

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

                await axios.post(require('./../../host') + '/admin/media', {
                    mediaType: this.mediaType,
                    mediaPath: imageOutput.data.outputUrl,
                    workOwnerId: this.selectedWorkOwnerId
                });
            } else
                await axios.post(require('./../../host') + '/admin/media', {
                    mediaType: this.mediaType,
                    mediaClip: this.mediaData.replace('youtu.be/', 'youtube.com/embed/'),
                    mediaPath: 'https://yt3.ggpht.com/ytc/AAUvwnjDwLJeWs_jcgoVvQpC7YZxWMwP-N__UH-98dxGyw=s900-c-k-c0x00ffffff-no-rj',
                    workOwnerId: this.selectedWorkOwnerId
                });
            alert('เพิ่มข้อมูลสำเร็จ');
            this.fetchData(false);
        }
    }
}
</script>
