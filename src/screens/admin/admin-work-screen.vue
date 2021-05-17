<template>
    <div>
        <h1>จัดการข้อมูลงานนักศึกษา</h1>
        <hr>
        <h3>หัวข้อ Topic</h3>
        <select @change="onChangeData" v-model="selectedTopicId" class="form-select">
            <option v-for="eachTopic in data.topicList" :key="eachTopic.entityId" :value="eachTopic.entityId">{{eachTopic.topicName}}</option>
        </select>
        <br><br>
        <h1>เพิ่มงานนักศึกษา</h1>
        <hr>
        <div class="card">
            <div class="card-body text-center">
                <p class="card-title">หมายเลขผลงาน</p>
                <input type="text" class="form-control" v-model="workId" style="margin-bottom: 15px;" required>
                <p class="card-title">ชื่อผลงาน</p>
                <input type="text" class="form-control" v-model="workName" style="margin-bottom: 15px;" required>
                <p class="card-title">คำอธิบายโดยย่อ</p>
                <input type="text" class="form-control" v-model="workText" style="margin-bottom: 15px;" required>
                <p class="card-title">รูปผลงาน</p>
                <input type="text" class="form-control" v-model="workImage" style="margin-bottom: 15px;" required>
                <p class="card-title">รหัสประจำตัวเจ้าของผลงาน</p>
                <input type="text" class="form-control" v-model="workOwnerId" style="margin-bottom: 15px;" required>
                <p class="card-title">รูปเจ้าของผลงาน</p>
                <input type="text" class="form-control" v-model="workOwnerImage" style="margin-bottom: 15px;" required>
                <p class="card-title">ชื่อเจ้าของผลงาน</p>
                <input type="text" class="form-control" v-model="workOwnerName" style="margin-bottom: 15px;" required>
                <p class="card-title">Journal link</p>
                <input type="text" class="form-control" v-model="workOwnerJournal" style="margin-bottom: 15px;" required>
                <p class="card-title">Facebook</p>
                <input type="text" class="form-control" v-model="workOwnerFacebook" style="margin-bottom: 15px;" required>
                <p class="card-title">Instagram</p>
                <input type="text" class="form-control" v-model="workOwnerInstagram" style="margin-bottom: 15px;" required>
                <p class="card-title">Email</p>
                <input type="text" class="form-control" v-model="workOwnerEmail" style="margin-bottom: 15px;" required>
                <p class="card-title">คำอธิบายผลงาน</p>
                <textarea class="form-control" v-model="workDescription" required></textarea>
                <br>
                <div><button @click="add" class="btn btn-success" style="width: 100%">เพิ่ม</button></div>
            </div>
        </div>
        <br><br>
        <div class="row">
            <div v-for="(each, i) in data.workList" :key="each.entityId" class="col-md-4" style="margin-bottom: 20px;">
                <div class="card">
                    <img :src="each.workImage" class="card-img-top" alt="...">
                    <div class="card-body text-center">
                        <p class="card-title">หมายเลขผลงาน</p>
                        <input type="text" class="form-control" v-model="data.workList[i].workId" style="margin-bottom: 15px;" required>
                        <p class="card-title">ชื่อผลงาน</p>
                        <input type="text" class="form-control" v-model="data.workList[i].workName" style="margin-bottom: 15px;" required>
                        <p class="card-title">คำอธิบายโดยย่อ</p>
                        <input type="text" class="form-control" v-model="data.workList[i].workText" style="margin-bottom: 15px;" required>
                        <p class="card-title">รูปผลงาน</p>
                        <input type="text" class="form-control" v-model="data.workList[i].workImage" style="margin-bottom: 15px;" required>
                        <p class="card-title">รหัสประจำตัวเจ้าของผลงาน</p>
                        <input type="text" class="form-control" v-model="data.workList[i].workOwnerId" style="margin-bottom: 15px;" required>
                        <p class="card-title">รูปเจ้าของผลงาน</p>
                        <input type="text" class="form-control" v-model="data.workList[i].workOwnerImage" style="margin-bottom: 15px;" required>
                        <p class="card-title">ชื่อเจ้าของผลงาน</p>
                        <input type="text" class="form-control" v-model="data.workList[i].workOwnerName" style="margin-bottom: 15px;" required>
                        <p class="card-title">Journal link</p>
                        <input type="text" class="form-control" v-model="data.workList[i].workOwnerJournal" style="margin-bottom: 15px;" required>
                        <p class="card-title">Facebook</p>
                        <input type="text" class="form-control" v-model="data.workList[i].workOwnerFacebook" style="margin-bottom: 15px;" required>
                        <p class="card-title">Instagram</p>
                        <input type="text" class="form-control" v-model="data.workList[i].workOwnerInstagram" style="margin-bottom: 15px;" required>
                        <p class="card-title">Email</p>
                        <input type="text" class="form-control" v-model="data.workList[i].workOwnerEmail" style="margin-bottom: 15px;" required>
                        <p class="card-title">คำอธิบายผลงาน</p>
                        <textarea class="form-control" v-model="data.workList[i].workDescription" required></textarea>
                        <button style="color: white;" @click="update(each.entityId, i)" class="btn btn-warning">แก้ไข</button> <button @click="deleteData(each.entityId)" class="btn btn-danger">ลบ</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AdminWork',
    data() {
        return {
            data: {
                workList: [],
                topicList: []
            },
            selectedTopicId: '',
            workId: '',
            workName: '',
            workText: '',
            workImage: '',
            workOwnerId: '',
            workOwnerImage: '',
            workOwnerName: '',
            workOwnerJournal: '',
            workOwnerFacebook: '',
            workOwnerInstagram: '',
            workOwnerEmail: '',
            workDescription: ''
        }
    },
    created() {
        this.fetchData(true);
    },
    methods: {
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
        },
        async onChangeData() {
            const data2 = await axios.get(require('./../../host') + '/work', {
                params: {
                    topicId: this.selectedTopicId
                }
            });
            this.data.workList = data2.data;
        },
        async update(entityId, i) {
            await axios.put(require('./../../host') + '/admin/work', {
                entityId,
                topicId: this.selectedTopicId,
                workId: this.data.workList[i].workId,
                workName: this.data.workList[i].workName,
                workText: this.data.workList[i].workText,
                workImage: this.data.workList[i].workImage,
                workOwnerId: this.data.workList[i].workOwnerId,
                workOwnerImage: this.data.workList[i].workOwnerImage,
                workOwnerName: this.data.workList[i].workOwnerName,
                workOwnerJournal: this.data.workList[i].workOwnerJournal,
                workOwnerFacebook: this.data.workList[i].workOwnerFacebook,
                workOwnerInstagram: this.data.workList[i].workOwnerInstagram,
                workOwnerEmail: this.data.workList[i].workOwnerEmail,
                workDescription: this.data.workList[i].workDescription
            });
            this.fetchData(false);
        },
        async deleteData(entityId) {
            await axios.delete(require('./../../host') + '/admin/work', {
                data: {
                    entityId: entityId
                },
            });
            this.fetchData(false);
        },
        async add() {
            await axios.post(require('./../../host') + '/admin/work', {
                topicId: this.selectedTopicId,
                workId: this.workId,
                workName: this.workName,
                workText: this.workText,
                workImage: this.workImage,
                workOwnerId: this.workOwnerId,
                workOwnerImage: this.workOwnerImage,
                workOwnerName: this.workOwnerName,
                workOwnerJournal: this.workOwnerJournal,
                workOwnerFacebook: this.workOwnerFacebook,
                workOwnerInstagram: this.workOwnerInstagram,
                workOwnerEmail: this.workOwnerEmail,
                workDescription: this.workDescription
            });
            this.fetchData(false);
        }
    }
}
</script>
