<template>
    <div class="row">
        <h1 class="text-center">Edit page</h1>
        <div class="col-md-2"></div>
        <div class="col-md-8 mt-5">
            <div class="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input type="text"  class="form-control" v-model="model.addStudent.name" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="Enter email">

            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Class</label>
                <input type="text" class="form-control"  v-model="model.addStudent.class" id="exampleInputPassword1"
                    placeholder="Password">
            </div>

            <div class="form-group">
                <label>Image</label>
                <input type="file" class="form-control" @change="onImageChange" ><span style="margin-left:8rem;margin-top:-4rem"><img class="image" v-bind:src=imagePreview alt="image" style="height:50px;width:50px"></span>
              </div>

            <button type="button" class="btn btn-primary" @click="updateStudent">Save</button>
        </div>
        <div class="col-md-2"></div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "StudentEdit",
    data() {
        return {
            studentid:'',
            imagePreview: '',
            model: {
                addStudent: {
                    name: '',
                    class: '',
                    image:''
                },
            },
        }
    },


    mounted(){
        this.getStudentif(this.$route.params.id);
        this.studentid = this.$route.params.id;
    },

    methods: {
        getStudentif(id){
            axios.get(`http://127.0.0.1:8000/api/student/${id}/edit`).then(res=>{
                this.model.addStudent = res.data;
                this.imagePreview = res.data.image;
                this.model.addStudent.image ='';
            });
        },

        onImageChange(e) {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onloadend = (file) => {
                this.imagePreview=reader.result;
                this.model.addStudent.image = reader.result;
            }
            reader.readAsDataURL(file);
        },

        updateStudent() {
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }

            axios.put(`http://127.0.0.1:8000/api/student/${this.studentid}/edit`, this.model.addStudent).then(data => {
                console.log(data);
                this.$router.push({ name: 'home' })

                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                res.setHeader("Access-Control-Max-Age", "1800");
                res.setHeader("Access-Control-Allow-Headers", "content-type");
                res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
                // res.setHeader("Content-Type", "application/json;charset=utf-8"); // Opening this comment will cause problems
            });
        }
    }
}
</script>
