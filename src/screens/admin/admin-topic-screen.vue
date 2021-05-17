<template>
    <div>
        <h1>จัดการ Topic</h1>
        <hr>
        <div class="row">
            <div v-for="(each, i) in data.topicList" :key="each.topicPath" class="col-md-4" style="margin-bottom: 20px;">
                <div class="card">
                    <div class="card-body text-center">
                        <h5 class="card-title">ชื่อ Topic</h5>
                        <input type="text" class="form-control" v-model="data.topicList[i].topicName" style="margin-bottom: 15px;">
                        <h5 class="card-title">ลิงค์ Topic</h5>
                        <input type="text" class="form-control" v-model="data.topicList[i].topicPath" style="margin-bottom: 15px;">
                        <button style="color: white;" @click="update(each.entityId, i)" class="btn btn-warning">แก้ไข</button> <button @click="deleteData(each.entityId)" class="btn btn-danger">ลบ</button>
                    </div>
                </div>
            </div>
        </div>
        <br><br>
        <h1>เพิ่ม Topic</h1>
        <hr>
        <div class="card">
            <div class="card-body text-center">
                <h5 class="card-title">ชื่อ Topic</h5>
                <input type="text" class="form-control" v-model="topicName" style="margin-bottom: 15px;">
                <h5 class="card-title">ลิงค์ Topic</h5>
                <input type="text" class="form-control" v-model="topicPath" style="margin-bottom: 15px;">
                <div><button @click="add" class="btn btn-success" style="width: 100%">เพิ่ม</button></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AdminTopic',
    data() {
        return {
            data: {
                topicList: []
            },
            topicName: '',
            topicPath: '',
        }
    },
    async created() {
        const data = await axios.get(require('./../../host') + '/navbar');
        this.data.topicList = data.data; 
    },
    methods: {
        async update(entityId, i) {
            await axios.put(require('./../../host') + '/admin/topic', {
                topicId: entityId,
                topicName: this.data.topicList[i].topicName,
                topicPath: this.data.topicList[i].topicPath
            });
            this.$router.go()
        },
        async deleteData(entityId) {
            await axios.delete(require('./../../host') + '/admin/topic', {
                data: {
                    topicId: entityId
                },
            });
            this.$router.go()
        },
        async add() {
            await axios.post(require('./../../host') + '/admin/topic', {
                topicName: this.topicName,
                topicPath: this.topicPath
            });
            this.$router.go()
        }
    }
}
</script>
