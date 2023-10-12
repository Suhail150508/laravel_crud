<!-- 

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
          <td scope="row"> {{ $index +1 }} </td>
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
          console.log(data);
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
 -->







<template>
  <div id="product">
    <div class="col-12">
      <div class="card">
        <div class="row card-header bg-transparent border-bottom">
          <div class="col-md-8">
            <h4 class="card-title">List Of Students</h4>
            <span>This is a Student related information</span>
          </div>

          <div class="col-md-4">
            <button type="button" @click="create" class="btn btn-sm btn-success float-end">
              <i class="fas fa-plus"></i> Add Student
            </button>
          </div>
        </div>

        <div class="card-body">
          <div class="row mb-3">
            <div class="col-md-4">
              <div class="row">
                <div class="col-md-2" style="margin: auto 0">
                  <span>Show</span>
                </div>

                <div class="col-md-3">
                  <select @change="getData(null)" v-model="perPage" class="form-select">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>

                <div class="col-md-3" style="margin: auto 0">
                  <span>entries</span>
                </div>
              </div>
            </div>

            <div class="col-md-8">
              <div class="row">
                <div class="col-md-2" style="margin: auto">
                  <strong>Search By :</strong>
                </div>

                <div class="col-md-3">
                  <select v-model="fieldName" id="fields" class="form-select">
                    <option value="name">Name</option>
                  </select>
                </div>

                <div class="col-md-7">
                  <input v-model="keyword" type="text" class="form-control form-control-sm" placeholder="Search" style="height:35px;"/>
                </div>
              </div>
            </div>
          </div>

          <table class="table table-bordered dt-responsive nowrap w-100">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">name</th>
                <th scope="col">class</th>
                <th scope="col">image</th>
                <th scope="col">actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(student, index) of students">
                <td>{{ index + 1 }}</td>
                <td>{{ student.name }}</td>
                <td>{{ student.class }}</td>
                <td> <img class="image" v-bind:src=student.image alt="image" style="height:60px;width:60px"></td>

                <td>
                  <!-- <button type="button" @click="show(student)" class="btn btn-info btn-sm" style="margin-right: 5px;">
                    <i class="fas fa-eye"></i>
                  </button> -->

                  <button type="button" @click="edit(student)" class="btn btn-primary btn-sm" style="margin-right: 5px;">
                    <i class="fas fa-edit">Edit</i>
                  </button>

                  <button type="button" @click="destroy(student.id)" class="btn btn-danger btn-sm">
                    <i class="fas fa-trash-alt">Delete</i>
                  </button>
										<button class=""><a class="btn btn-sm btn-primary" href="#" @click="downloadFile(student.id)">Download info</a></button>
										<!-- <span style="color:red;">No Attachment</span> -->
                </td>
              </tr>
							
              <tr v-show="!students.length">
                <td colspan="6">
                  <div class="alert alert-danger text-danger text-center" role="alert">
                    No data available in table :(
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- <div v-if="students.length" class="d-flex">
            <div class="col-md-4 pl-0" style="margin: auto" v-if="students.length">
              Showing {{ pagination.from }} to {{ pagination.to }} from
              {{ pagination.total }} entiries
            </div>

            <PaginationComponent :links="links" @get-data="getData" />
          </div> -->
        </div>
      </div>

      <!-- Create and Edit Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Country</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
              <form @submit.prevent="editMode ? update() : store()" @keydown="form.onKeydown($event)">
                <div v-if="form.progress" class="text-center">Progress: {{ form.progress.percentage }}%</div>

                <AlertError :form="form" message="There were some problems with your input."/>

                <div class="modal-body">
                  <div class="form-group mb-3">
                    <label>Name</label>
                    <input v-model="form.name" type="text" name="name" class="form-control" placeholder="Name" :readonly="showMode == true ? true : false"/>
                    <HasError :form="form" field="name" />
                  </div>

                  <!-- <div class="form-group mb-3">
                    <label>Bn Name</label>
                    <input v-model="form.bn_name" type="text" name="bn_name" class="form-control" placeholder="Bn name" :readonly="showMode == true ? true : false"/>
                    <HasError :form="form" field="bn_name" />
                  </div> -->

                  <div class="form-group mb-3">
                    <label>Class</label>
                    <input v-model="form.class" type="text" name="class" class="form-control" placeholder="Class" :readonly="showMode == true ? true : false"/>
                    <HasError :form="form" field="class" />
                  </div>

                  <div class="form-group mb-3">
                    <label>Image</label>
                    <input type="file" name="image" @change="onImageChange" class="form-control" placeholder="Class" :readonly="showMode == true ? true : false"/>
                    <img class="image" v-bind:src="form.image" alt="image" style="height:60px;width:60px">

                    <HasError :form="form" field="class" />
                  </div>

                  <!-- <div class="form-group mb-3">
                    <label>Status</label>
                    <select name="status" class="form-control" v-model="form.status">
                      <option value="">Select One</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <HasError :form="form" field="status" />
                  </div> -->
                </div>

                <div class="modal-footer">
                  <button v-if="showMode == false" :disabled="form.busy" type="submit" class="btn btn-primary">
                    {{ editMode ? "Update" : "Create" }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <vue-progress-bar></vue-progress-bar>
    <notifications />
  </div>
</template>

<script>
import axios from "axios";
import Form from "vform";
import swal from 'sweetalert2';
import { Button, HasError, AlertError, AlertErrors, AlertSuccess } from "vform/src/components/bootstrap5";
import PaginationComponent from "../components/PaginationComponent.vue";
import VueProgressBar from 'vue-progressbar';

Vue.use(VueProgressBar, {
  color: 'green',
  failedColor: 'red',
  thickness: '5px',
});

export default {
  name: "StudentTable",
  components: {
    PaginationComponent,
    Button,
    HasError,
    AlertError,
    AlertErrors,
    AlertSuccess,
  },

  data() {
    return {
      backendUrl: import.meta.env.VITE_API_BASE_URL,
      
      editMode: false,
      showMode: false,
      keyword: "",
      fieldName: "name",
      perPage: 10,
      students:[],
      // countries: [],
      pagination: [],
      links: [],

      form: new Form({
        id: "",
        name: "",
        class: "",
        image: "",

      }),
    };
  },
  watch: {
    keyword: function () {
      this.getData();
    },
  },
    
  mounted() {
    // console.log("Component mounted.");
    this.getData();
  },

  methods: {
    getData(url) {
      // this.$Progress.start();
      // let linkUrl = url ? url : `${this.backendUrl}student`;
      axios
        .get('http://127.0.0.1:8000/api/students', {
          params: {
            per_page: this.perPage,
            field_name: this.fieldName,
            keyword: this.keyword,
          },
        })
        .then((response) => {
          this.students = response.data.data;
          // this.pagination = response.data.meta;
          this.links = response.data.data.links;
          this.$Progress.finish();
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
          this.$Progress.fail();
        });
    },

    create() {
      this.editMode = false;
      this.showMode = false;
      this.form.reset();
      this.form.clear();
      // $("#image").val('')
      $("#exampleModal").modal("show");
    },

    show(id) {
      this.showMode = true;
      this.form.reset();
      this.form.clear();
      this.form.fill(id);
      $("#exampleModal").modal("show");
    },

    edit(id) {
      // console.log(id);
      this.editMode = true;
      this.showMode = false;
      this.form.reset();
      this.form.clear();
      this.form.fill(id);
      $("#exampleModal").modal("show");
    },
    // onImageChange(e) {
    //   this.form.image = e.target.files[0];
    // },

      onImageChange(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onloadend = (file) => {
          this.form.image = reader.result;
      }
      reader.readAsDataURL(file);
    },

    store() {
      this.$Progress.start();
          const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      this.form.busy = true;
      this.form
        .post(`http://127.0.0.1:8000/api/store`,config)
        .then((response) => {
          this.getData();
          $("#exampleModal").modal("hide");
          if (this.form.successful) {
            this.$Progress.finish();
            this.$notify({ type: "success", title: "Success", text: "Country Added" });
          } else {
            this.$Progress.fail();
            this.$notify({ type: "error", title: "Error", text: "Something went wrong try again later" });
          }
        })
        .catch((e) => {
          this.$Progress.fail();
          console.log(e);
        });
    },

    update() {
      this.$Progress.start();
      this.form.busy = true;
      this.form
        .put(`http://127.0.0.1:8000/api/student/${this.form.id}/edit`)
        .then((response) => {
          this.getData();
          $("#exampleModal").modal("hide");
          if (this.form.successful) {
            this.$Progress.finish();
            this.$notify({ type: "success", title: "Success", text: "Country Updated" });
          } else {
            this.$Progress.fail();
            this.$notify({ type: "error", title: "Error", text: "Something went wrong try again later" });
          }
        })
        .catch((e) => {
          this.$Progress.fail();
          console.log(e);
        });
    },

    destroy(id) {
      swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios.delete(`http://127.0.0.1:8000/api/student/${id}/delete`).then((response) => {
              swal.fire("Deleted!", response.data.message, "success");
              this.getData();
            });
          }
        });
    },

    downloadFile(id) {
		// const url = `${this.backendUrl}download/student/file/${id}`;
		axios.get(`http://127.0.0.1:8000/api/download/student/file/${id}`)
		.then(response => {
      console.log(response);
			if (response.data.status !== 'error') {
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('target', '_blank');
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			} else{
				this.$notify({ type: "error", title: "Error", text: response.data.msg });
			}
		})
    },
  },
};
</script>

<style>
</style> 
