

<template>
  <div class="container  " style="margin-left:18rem;margin-top:4rem">

    <RouterLink class="btn btn-primary " to="/studentcreate" style="float:right;">Add new Student</RouterLink>
    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">name</th>
          <th scope="col">class</th>
          <th scope="col">image</th>
          <th scope="col">actions</th>

        </tr>
      </thead>
      <tbody v-if="users.length >0">
        <tr class="" v-for="user in users" v-bind:key="user.id">
          <td scope="row"> {{ user.id }} </td>
          <td> {{ user.name }} </td>
          <td> {{ user.class }} </td>
          <td> <img class="image" v-bind:src=user.image alt="image" style="height:60px;width:60px"></td>

          <td>
            <RouterLink class="btn btn-success " :to="{ path: ('/student/' + user.id + '/edit') }">Edit</RouterLink>
            <button class="btn btn-danger  " style="margin-left:.6rem" @click="Deletestudent(user.id)">Delete</button>

          </td>
        </tr>

      </tbody>
      <tbody v-else>
        <tr>
          <td>
            <h1 colspan="4">Loading....</h1>
          </td>
        </tr>


      </tbody>
    </table>

  </div>
</template>


<script>
// import Vue from 'vue'
import { RouterLink } from "vue-router";
import axios from "axios";

// Vue.use(axios)

export default {
  name: "StudentShow",
  data() {
    return {
      users: {},
    };
  },
  created() {
    this.StudentShow();
  },
  methods: {
    StudentShow() {

    
        axios.get('http://127.0.0.1:8000/api/students').then(({data}) => {
          // console.log('fjlkdjlksd')
          this.users = data;
          console.log(this.users);

          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Credentials", "true");
          res.setHeader("Access-Control-Max-Age", "1800");
          res.setHeader("Access-Control-Allow-Headers", "content-type");
          res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
          // res.setHeader("Content-Type", "application/json;charset=utf-8"); // Opening this comment will cause problems
        });
   

    },

    Deletestudent(studentid){

      if(confirm('Are you sure, you want to delete student !')){

        axios.delete(`http://127.0.0.1:8000/api/student/${studentid}/delete`).then(res=>{
         alert(res.data.message);
         this.StudentShow();
          console.log(res.message);
        })

      }



    }

  },
  components: { RouterLink }
};
</script>



