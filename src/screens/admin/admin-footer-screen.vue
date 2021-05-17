<template>
    <div>
        <h1>แก้ไขหน้า Home</h1>
        <hr>
        <div v-if="showInfo" class="alert alert-success alert-dismissible fade show" role="alert">
            แก้ไขข้อมูลสำเร็จ
            <button @click="() => { showInfo = false; }" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <label>Facebook</label>
        <input type="text" class="form-control" v-model="data.facebook">
        <br>
        <label>Copyright</label>
        <input type="text" class="form-control" v-model="data.copyright">
        <br>
        <button v-if="!isLoad" @click="send" class="btn btn-success" style="width: 100%">อัพเดทข้อมูล</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AdminFooter',
    data() {
        return {
            data: {
                facebook: '',
	            copyright: ''
            },
            showInfo: false,
            isLoad: false
        }
    },
    async created() {
        const data = await axios.get(require('./../../host') + '/footer');
        this.data = data.data; 
    },
    methods: {
        async send() {
            this.isLoad = true;
            await axios.put(require('./../../host') + '/admin/footer', {
                facebook: this.data.facebook,
                copyright: this.data.copyright
            });
            this.showInfo = true;    
            this.isLoad = false;
        }
    }
}
</script>
