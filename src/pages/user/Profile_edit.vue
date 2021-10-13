<template>
  <div class="container">
    <h1 class="header">Profile Edit</h1>
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="editProfile"
      lazy-validation
    >
      <v-card class="mx-auto px-14 py-8 card">
        <v-text-field
          v-model="users.name"
          :counter="100"
          label="Name"
          required
          :rules="nameRules"
        ></v-text-field>

        <v-text-field
          v-model="users.email"
          :counter="100"
          label="Email"
          required
          :rules="emailRules"
          type="email"
        ></v-text-field>

        <v-select :items="items" v-model="users.role" label="User"></v-select>

        <v-text-field
          v-model="users.phone"
          :counter="11"
          label="Phone"
          required
          :rules="phoneRules"
        ></v-text-field>
        <div>
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="users.dob"
                label="Picker in dialog"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="users.dob"
              scrollable
              :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              min="1995-01-01"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </div>
        <v-textarea
          v-model="users.address"
          name="input-7-1"
          filled
          label="Address"
          auto-grow
        ></v-textarea>
        <div>
          <img
            v-if="this.image"
            :src="this.image"
            alt=""
            style="width: 250px"
          />
        </div>
        <v-file-input
          v-model="users.profile"
          label="upload New Profile"
          prepend-icon="mdi-camera"
        ></v-file-input>
      </v-card>

      <div class="btn">
        <v-btn color="error" class="mr-4" @click="reset">
          Reset
        </v-btn>
        <v-btn
          type="submit"
          @click="validate"
          :disabled="!valid"
          color="#198754"
          class="mr-4"
          style="color: white"
        >
          Register
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import constant from "../../constants";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    valid: true,
    date: "",
    modal: false,
    users: {
      name: "",
      email: "",
      password: "",
      role: null,
      phone: "",
      dob: "",
      address: "",
      profile: null,
      create_user_id: "",
      update_user_id: "",
      deleted_user_id: "",
      deleted_at: "",
    },
    image: null,
    confirm: "",
    errorConfirm: null,
    items: ["Admin", "User"],
    errImg: null,
    nameRules: [
      (v) => !!v == constant.VALIDATION.NAME.REQUIRE || "Name is required",
      (v) =>
        v.length <= constant.VALIDATION.NAME.MAX ||
        `Name must be less than ${constant.VALIDATION.NAME.MAX} characters`,
    ],
    emailRules: [
      (v) => !!v == constant.VALIDATION.EMAIL.REQUIRE || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      (v) =>
        v.length <= constant.VALIDATION.EMAIL.MAX ||
        "Name must be less than 100 characters",
    ],
    passRules: [
      (v) => !!v == constant.VALIDATION.PASS.REQUIRE || "Password is required",
      (v) =>
        v.length >= constant.VALIDATION.PASS.MIN ||
        "Name must be at least 8 characters",
    ],
    cpassRules: [
      (v) => !!v == constant.VALIDATION.PASS.REQUIRE || "Password is required",
    ],
    phoneRules: [
      (v) =>
        (v.length >= 0 && v.length <= constant.VALIDATION.PH.MAX) ||
        `Phone Number is maximum ${constant.VALIDATION.PH.MAX} numbers`,
      (v) => /^\d{0,11}$/.test(v) || "Phone Number must be number",
    ],
    profileRules: [
      (v) =>
        !!v == constant.VALIDATION.PROFILE.REQUIRE || "Profile is required",
    ],
  }),
  computed: {
    ...mapGetters(["userId", "userType", "userName"]),
    editprofileData() {
      return this.$store.state.user.user;
    },
  },
  created() {
      console.log(this.$store.state.user)
    axios
      .get(`/detail?id=${this.$store.state.user.user.id}`)
      .then((data) => {
        this.image = data.data.image;
      })
      .catch((err) => {
        console.log(err);
      });
    if (this.editprofileData) {
      this.users = this.editprofileData;
      if (this.users.role === 0) {
        this.users.role = "Admin";
      } else {
        this.users.role = "User";
      }
    }
  },
  methods: {
    createUser() {
      this.users.create_user_id = this.userId;
      if (this.users.role === "Admin") {
        this.users.role = 0;
      } else {
        this.users.role = 1;
      }
      this.$store.dispatch("confirmPassword", this.confirm);
      this.$store.dispatch("confirmUser", this.users).then(() => {
        this.$router.push({
          name: "confirm",
        });
      });
    },

    editProfile() {
        console.log(this.users)
    },

    validate() {
      this.$refs.form.validate();
    },
    reset() {
      var self = this;
      Object.keys(this.users).forEach(function(key) {
        self.user[key] = "";
      });
      this.users = null;
      this.confirm = null;
      this.errorConfirm = "";
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped>
.errMsg {
  color: red;
}
.header {
  padding: 10px 0;
  border: 1px solid 198754;
  padding-left: 2%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background: #198754;
  color: #fff;
  font-size: 25px;
}
.card {
  border: 1px solid #198754;
  margin-top: -5px;
}
.btn {
  margin-top: 10px;
  text-align: center;
}
</style>
