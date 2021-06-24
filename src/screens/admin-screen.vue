<template>
    <div class="container" style="margin-top: 50px;">
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <router-link to="/admin/home" class="btn btn-primary" style="width: 100%; margin-bottom: 10px;">แก้ไขหน้า Home</router-link>
              <router-link to="/admin/about-us" class="btn btn-primary" style="width: 100%; margin-bottom: 10px;">แก้ไขหน้า About Us</router-link>
              <router-link to="/admin/footer" class="btn btn-primary" style="width: 100%; margin-bottom: 10px;">แก้ไขแถบ Footer ด้านล่าง</router-link>
              <hr>
              <router-link to="/admin/topic" class="btn btn-success" style="width: 100%; margin-bottom: 10px;">เพิ่ม/จัดการหัวข้อ Topic</router-link>
              <router-link to="/admin/work" class="btn btn-success" style="width: 100%; margin-bottom: 10px;">เพิ่ม/จัดการข้อมูลงานนักศึกษา</router-link>
              <router-link to="/admin/media" class="btn btn-success" style="width: 100%; margin-bottom: 10px;">เพิ่ม/จัดการข้อมูลเพิ่มเติมของงานนักศึกษา</router-link>
              <hr>
              <router-link to="/admin/change-password" class="btn btn-info" style="color: white;width: 100%; margin-bottom: 10px;">แก้ไข username password สำหรับเข้าหน้า admin</router-link>
              <button @click="logout" class="btn btn-danger" style="width: 100%; margin-bottom: 10px;">ออกจากระบบ</button>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'AdminScreen',
  components: {
  },
  created() {
      if (!localStorage.getItem('isLogin'))
        this.$router.push('/');
  },
  methods: {
    logout() {
      localStorage.removeItem('isLogin')
      this.$router.push('/');
    }
  }
}
</script>
