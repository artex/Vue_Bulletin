<template>
  <v-card>
    <h1 class="header">User List</h1>
    <v-alert v-if="this.$store.state.noti" type="success">
      {{ this.$store.state.noti.data.data }}
      <button class="cross-btn" @click="cancelAlert">X</button>
    </v-alert>
    <v-alert v-if="this.$store.state.editnoti" type="success">
      {{ this.$store.state.editnoti.data.data }}
      <button class="cross-btn" @click="cancelAlert2">X</button>
    </v-alert>
    <v-alert v-if="this.noti!=null" type="success">
      {{ this.noti }}
      <button class="cross-btn" @click="cancelAlert3">X</button>
    </v-alert>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-form ref="form" @submit.prevent="filtername">
        <v-row class="filter-bar">
          <v-col md="2.5">
            <v-text-field
              label="Name"
              v-model="keyword"
              hide-details="auto"
            >
            </v-text-field>
          </v-col>
          <v-col md="2.5">
            <v-text-field
              label="Email"
              v-model="ekeyword"
              hide-details="auto"
            >
            </v-text-field>
          </v-col>
          <v-btn type="submit" class="post-list-btn mr-4" color="primary">Search</v-btn>
        </v-row>
      </v-form>
    </v-card-title>
    <v-container>
      <v-flex style="overflow: auto">
        <v-data-table
          :headers="headers"
          :items="showList"
          :image="image"
          :role="role"
        >
          <template v-slot:[`item.name`]="{ item }">
            <template>
              <v-row justify="space-around">
                <v-col cols="auto">
                  <v-dialog
                    transition="dialog-bottom-transition"
                    max-width="700"
                    heigit="90vh"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <a
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                        @click="getImage(item.id)"
                        >{{ item.name }}</a
                      >
                    </template>
                    <template v-slot:default="dialog">
                      <v-card>
                        <v-toolbar color="primary" dark>User Detail</v-toolbar>
                        <v-card-text class="clearFix">
                          <div class="left clearFix">
                            <img :src="image" style="width: 150px" alt="" />
                          </div>
                          <div class="right clearFix">
                            <div class="right-left">
                              <h2>name</h2>
                              <h2>Type</h2>
                              <h2>email</h2>
                              <h2>Phone</h2>
                              <h2>Date Of Birth</h2>
                              <h2>Address</h2>
                              <h2>Created Date</h2>
                              <h2>Created User</h2>
                              <h2>Updated Date</h2>
                              <h2>Updated User</h2>
                            </div>
                            <div class="right-right">
                              <h3>{{ item.name }}</h3>
                              <h3>{{ role }}</h3>
                              <h3>{{ item.email }}</h3>
                              <h3>{{ item.phone }}</h3>
                              <h3>{{ item.dob }}</h3>
                              <h3>{{ item.address }}</h3>
                              <h3>{{ item.created_at }}</h3>
                              <h3>{{ item.user_name }}</h3>
                              <h3>{{ item.updated_at }}</h3>
                              <h3>{{ item.update_name }}</h3>
                              <!-- <h3>{{item.role}}</h3> -->
                            </div>
                          </div>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                          <v-btn text @click="dialog.value = false"
                            >Close</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-col>
              </v-row>
            </template>
          </template>
          <template v-slot:[`item.role`]="{ item }">
            <div v-if="item.role === 0">
              Admin
            </div>
            <div v-if="item.role === 1">
              User
            </div>
          </template>
          <template v-slot:[`item.operation`]="{ item }">
            <v-row>
              <div class="operation-btn">
                <!-- <v-btn
                  color="error"
                  @click="deleteUser(item)"
                  class="post-list-btn"
                  >Delete</v-btn
                > -->
                <template>
                  <v-row justify="space-around">
                    <v-col cols="auto">
                      <v-dialog
                        transition="dialog-bottom-transition"
                        max-width="600"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <!-- <btn
                            color="primary"
                            v-bind="attrs"
                            v-on="on"
                            @click="getImage(item.id)"
                            >{{ item.name }}</btn
                          > -->
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            color="error"
                            class="post-list-btn"
                            @click="getImage(item.id)"
                            >Delete</v-btn
                          >
                        </template>
                        <template v-slot:default="dialog">
                          <v-card>
                            <v-toolbar color="primary" dark
                              >Delete Confirm</v-toolbar
                            >
                            <div style="color: red; margin: 20px; font-size:20px">
                              Are you sure to delete user?
                            </div>
                            <v-card-text class="clearFix">
                              <div class="right1 clearFix">
                                <div class="right-left1">
                                  <h2>ID</h2>
                                  <h2>name</h2>
                                  <h2>Type</h2>
                                  <h2>email</h2>
                                  <h2>Phone</h2>
                                  <h2>Date Of Birth</h2>
                                  <h2>Address</h2>
                                </div>
                                <div class="right-right1">
                                  <h3>{{ item.id }}</h3>
                                  <h3>{{ item.name }}</h3>
                                  <h3>{{ role }}</h3>
                                  <h3>{{ item.email }}</h3>
                                  <h3>{{ item.phone }}</h3>
                                  <h3>{{ item.dob }}</h3>
                                  <h3>{{ item.address }}</h3>
                                </div>
                              </div>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                              <v-btn
                                text
                                @click="dialog.value = false"
                                style="background: #6C757D; color:white;"
                                >Close</v-btn
                              >
                              <v-btn
                                text
                                @click="
                                  deleteUser(item), (dialog.value = false)
                                "
                                style="background: #FF6060; color: white;"
                                >Delete</v-btn
                              >
                            </v-card-actions>
                          </v-card>
                        </template>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </template>
              </div>
            </v-row>
          </template>
        </v-data-table>
      </v-flex>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      postInfo: null,
      dialog: false,
      headerList: [
        {
          text: "ID",
          align: "start",
          value: "id",
        },
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Email",
          value: "email",
        },
        {
          text: "Created User",
          value: "user_name",
        },
        {
          text: "Type",
          value: "role",
        },
        {
          text: "Phone",
          value: "phone",
        },
        {
          text: "Date Of Birth",
          value: "dob",
        },
        {
          text: "Address",
          value: "address",
        },
        {
          text: "Created_date",
          value: "created_at",
        },
        {
          text: "Updated_date",
          value: "updated_at",
        },
        {
          text: "Operation",
          value: "operation",
        },
      ],
      userList: [],
      showList: [],
      users: {
        id: "",
      },
      image: null,
      role: "",
      keyword: null,
      ekeyword: null,
      noti: null,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    headers() {
      if (!this.isLoggedIn) {
        return this.headerList.slice(0, this.headerList.length - 1);
      } else {
        return this.headerList;
      }
    },
    currentDateTime() {
      const current = new Date();
      const date =
        current.getFullYear() +
        "-" +
        (current.getMonth() + 1) +
        "-" +
        current.getDate();
      const time =
        current.getHours() +
        ":" +
        current.getMinutes() +
        ":" +
        current.getSeconds();
      const dateTime = date + " " + time;

      return dateTime;
    },
  },
  mounted() {
    this.$axios
      .get("/user/list")
      .then((response) => {
        this.userList = response.data;
        this.showList = this.userList;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    getImage(iddata) {
      this.users.id = iddata;
      axios.put(`/user/get`, this.users).then((data) => {
        this.image = data.data.image;
        this.role = data.data.role;
        if (this.role === 0) {
          this.role = "Admin";
        } else {
          this.role = "User";
        }
      });
    },
    cancelAlert() {
      this.$store.state.noti = false;
      this.$store.dispatch("cancelAlert");
    },
    cancelAlert2() {
      this.$store.state.editnoti = false;
      this.$store.dispatch("cancelAlert2");
    },
    cancelAlert3() {
      this.noti = null;
    },
    filtername() {
      this.showList = this.userList.filter((user) => {
        return (
          user.name.includes(this.keyword)||
          user.email.includes(this.ekeyword)
        );
      });
    },

    deleteUser(item) {
      item.deleted_user_id = this.$store.state.user.user.id;
      item.deleted_at = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "/");
      return axios.put("/user/delete", item).then((data) => {
        this.noti = data.data.data
        this.$axios
          .get("/user/list")
          .then((response) => {
            this.userList = response.data;
            this.showList = this.userList;
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
  },
};
</script>

<style scoped>
.clearFix:after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  font-size: 0;
  height: 0;
}
.header {
  background: #198754;
  color: white;
  padding: 15px;
  font-size: 18px;
}
.cross-btn {
  float: right;
}
.left {
  margin-top: 15px;
  float: left;
  width: 25%;
}
.left img {
  border-radius: 60%;
  height: 150px;
}
.right {
  margin-top: 15px;
  float: right;
  width: 70%;
}
.right-left,
.right-left1 {
  float: left;
  width: 35%;
}
.right-right,
.right-right1 {
  float: left;
  width: 65%;
}
.right-left h2,
.right-left1 h2 {
  margin-top: 10px;
  height: 25px;
}
.right-right h3,
.right-right1 h3 {
  margin-top: 10px;
  height: 25px;
}
.right1 {
  width: 80%;
  margin: 0 auto;
}
.right-left1 {
  width: 50%;
}
.right-right1 {
  width: 50%;
}
</style>
