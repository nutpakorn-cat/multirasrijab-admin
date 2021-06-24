<template>
    <div>
        <!-- <div v-if="showInfo" class="alert alert-success alert-dismissible fade show" role="alert">
            แก้ไขข้อมูลสำเร็จ
            <button @click="() => { showInfo = false; }" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div> -->
        <label>{{labelName}}</label>
        <div v-if="previewImage != null && previewImage != undefined && previewImage != ''">
            <br>
            <img style="margin-left: auto;margin-right:auto;display:block" :src="previewImage" width="200">
            <br>
        </div>
        <input ref="fileInput" type="file" @change="onChangeInput" class="form-control">
        <p>ต้องเป็น .png, .jpg หรือ .jpeg เท่านั้น ขนาดห้ามเกิน 3MB</p>

        <!-- <button v-if="!isLoad" @click="upload('logo')" class="btn btn-success" style="width: 100%">อัพเดท Logo</button> -->
    </div>
        
</template>

<script>
export default {
    name: 'Uploader',
    props: ['labelName', 'previewImage', 'onChangeCallback'],
    data() {
        return {

        };
    },
    methods: {
        onChangeInput(e) {
            if (e.target.files[0] == undefined) {
                this.onChangeCallback(e)
                return;
            }

            if (e.target.files[0].size >= 3145728) { 
                this.$refs.fileInput.value = '';
            } else
                this.onChangeCallback(e)
        }
    }
}
</script>
