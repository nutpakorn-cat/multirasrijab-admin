<template>
    <div>
        <h1>แก้ไขสีของระบบ</h1>
        <hr>
        <h4 class="text-center">แก้สีแถบ</h4>
        <img :src="require('@/assets/color.png')" style="width: 100%;">
        <br><br>
        <label>สีแถบ</label>
        <input class="form-control" type="color" style="height: 100px;" v-model="this.color">
        <br>
        <button class="btn btn-success" style="width: 100%" @click="onClick">แก้ไขสีแถบ</button>
        <br><br><br>

        <h4 class="text-center">แก้สีแถบ Footer</h4>
        <img :src="require('@/assets/footer.png')" style="width: 100%;">
        <br><br>
        <label>สีแถบ Footer</label>
        <input class="form-control" type="color" style="height: 100px;" v-model="this.bottomColor">
        <br>
        <button class="btn btn-success" style="width: 100%" @click="onClickFooter">แก้ไขสีแถบ Footer</button>
        <br><br><br>

        <h4 class="text-center">แก้สีและ Opacity Copyright</h4>
        <img :src="require('@/assets/copyright.png')" style="width: 100%;">
        <br><br>
        <label>สี Copyright</label>
        <input class="form-control" type="color" style="height: 100px;" v-model="this.bottomTextColor">
        <br>
        <label>Opacity Copyright (กรอกเป็นทศนิยมช่วง 0.1 ถึง 1)</label>
        <input class="form-control" type="text" v-model="this.bottomOpacity">
        <br>
        
        <button class="btn btn-success" style="width: 100%" @click="onClickCopyright">แก้ไข Copyright</button>
        <br><br><br>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AdminColor',
    data() {
        return {
            color: '#000000',
            "bottomColor": "#000000",
            "bottomTextOpacity": "1",
            "bottomTextColor": "#000000",
        }
    },
    async created() {
        const data = await axios.post(require('./../../host') + '/setting', {
            tableName: 'navbarSetting'
        });
        this.color = data.data.color;
        this.bottomColor = data.data.bottomColor;
        this.bottomTextColor = data.data.bottomTextColor;
        this.bottomOpacity = data.data.bottomOpacity;
    },
    methods: {
        async onClick() {
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'navbarSetting',
                key: 'color',
                value: this.color
            });
            alert('แก้ไขข้อมูลเสร็จสิ้น');
            
        },
        async onClickFooter() {
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'navbarSetting',
                key: 'bottomColor',
                value: this.bottomColor
            });
            alert('แก้ไขข้อมูลเสร็จสิ้น');
            
        },
        async onClickCopyright() {
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'navbarSetting',
                key: 'bottomTextColor',
                value: this.bottomTextColor
            });
            await axios.put(require('./../../host') + '/admin/setting', {
                tableName: 'navbarSetting',
                key: 'bottomOpacity',
                value: this.bottomOpacity
            });
            alert('แก้ไขข้อมูลเสร็จสิ้น');
            
        },
    }
}
</script>
