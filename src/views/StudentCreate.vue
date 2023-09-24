<template>
  <div class="row ">
    <h1 class="text-center">Create Student</h1>

    <form @submit="formSubmit" enctype="multipart/form-data">
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input type="text" class="form-control" v-model="model.addStudent.name" id="exampleInputEmail1"
          aria-describedby="emailHelp" placeholder="Enter name">
      </div>
      <div class="form-group">
        <label>Class</label>
        <input type="text" class="form-control" v-model="model.addStudent.class" id="exampleInputPassword1"
          placeholder="Class">
      </div>
      <div class="form-group">
        <label>Image</label>
        <input type="file" class="form-control" @change="onImageChange">
      </div>

      <button  class="btn btn-primary">Save</button>
    </form>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "StudentCreate",
  data() {
    return {
      model: {
        addStudent: {
          name: '',
          class: '',
          image: ''
        },
      },
    }
  },

  methods: {
    onImageChange(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onloadend = (file) => {
          this.model.addStudent.image = reader.result;
      }
      reader.readAsDataURL(file);
    },

    formSubmit(e) {
      e.preventDefault();
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      // let formData = new FormData();
      // formData.append('image', this.model.addStudent);
      try {
        axios.post('http://127.0.0.1:8000/api/store', this.model.addStudent,config ).then(res => {
          console.log(res.data);
          this.$router.push({ name: 'home' })
        });

      } catch (error) {
        
      }
    }
  }
}
</script>
