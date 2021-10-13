<template>
  <v-card>
    <h1 class="header">User List</h1>
    <v-alert v-if="this.$store.state.noti" type="success">
      {{ this.$store.state.noti.data.data }}
      <button class="cross-btn" @click="cancelAlert">X</button>
    </v-alert>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-form ref="form">
        <v-row class="filter-bar">
          <v-col md="2.5">
            <v-text-field
              label="Name"
              @change="filterUsers"
              hide-details="auto"
            >
            </v-text-field>
          </v-col>
          <v-col md="2.5">
            <v-text-field
              label="Email"
              @change="filterUsers"
              hide-details="auto"
            >
            </v-text-field>
          </v-col>
          <v-btn class="post-list-btn mr-4" color="primary">Search</v-btn>
        </v-row>
      </v-form>
    </v-card-title>
    <v-container>
      <v-flex style="overflow: auto">
        <v-data-table :headers="headers" :items="showList">
          <template v-slot:[`item.name`]="{ item }">
            <router-link
              :to="`/applicants/${item.id}`"
              :key="item.id"
              v-if="item.name"
              >{{ item.name }}</router-link
            >
          </template>
          
          <template  v-slot:[`item.create_user_id`]="{ item }">
            <div>
              {{  item.create_user_id }}
            </div>
          </template>
          <template v-slot:[`item.role`]="{ item }">
            <div v-if="item.role===0">
              Admin
            </div>
            <div v-if="item.role===1">
              User
            </div>
          </template>
          <template v-slot:[`item.operation`]="{ item }">
            <v-row>
              <div class="operation-btn">
                <v-btn
                  color="error"
                  @click="deleteApplicant(item.id)"
                  class="post-list-btn"
                  >Delete</v-btn
                >
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
export default {
  data() {
    return {
      postInfo: null,
      dialogTitle: "",
      dialog: false,
      isDeleteDialog: false,
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
          value: "create_user_id",
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
  },
  mounted() {
    this.$axios
      .get("/user/list")
      .then((response) => {
        this.userList = response.data;
        this.showList = this.userList;
        console.log(response)
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    cancelAlert() {
      this.$store.state.noti = false;
      this.$store.dispatch("cancelAlert");
    },
    filterUsers() {
      this.showList = this.userList.filter((user) => {
        return (
          user.title.includes(this.keyword) ||
          user.description.includes(this.keyword) ||
          user.created_user.includes(this.keyword)
        );
      });
    },
  },
};
</script>

<style scoped>
.header {
  background: #198754;
  color: white;
  padding: 15px;
  font-size: 18px;
}
.cross-btn {
  float: right;
}
</style>
