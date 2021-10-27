<template>
  <div class="container">
    <h1 class="header">Change Password</h1>
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="updatePassword"
      lazy-validation
    >
      <v-card class="mx-auto px-14 py-8 card">
        <v-alert v-if="this.$store.state.pwnoti" type="error">
          {{ this.$store.state.pwnoti.error }}
          <button class="cross-btn" @click="cancelAlert">X</button>
        </v-alert>
        <v-text-field
          v-model="password.current"
          :counter="100"
          label="Current Password"
          type="password"
          required
          :rules="passRules"
        ></v-text-field>

        <v-text-field
          v-model="password.new"
          :counter="100"
          label="New Password"
          type="password"
          required
          :rules="passRules"
        ></v-text-field>

        <div
          v-if="
            this.password.confirm && this.password.confirm != this.password.new
          "
          class="errMsg"
        >
          {{ this.errorConfirm }}
        </div>

        <v-text-field
          v-model="password.confirm"
          :counter="100"
          label="Password Confirmation"
          :rules="cpassRules"
          type="password"
          required
        ></v-text-field>
      </v-card>

      <div class="btn">
        <v-btn
          type="submit"
          @click="validate"
          :disabled="!valid || this.password.confirm != this.password.new"
          color="#198754"
          class="mr-4"
          style="color: white"
        >
          Update Password
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import constant from "../../constants";
import { mapGetters } from "vuex";
export default {
  data: () => {
    return {
      valid: true,
      password: {
        id: "",
        current: "",
        new: "",
        confirm: "",
      },
      noti: "",
      errMsg: "",
      errorConfirm: null,
      passRules: [
        (v) =>
          !!v == constant.VALIDATION.PASS.REQUIRE || "Password is required",
        (v) =>
          v.length >= constant.VALIDATION.PASS.MIN ||
          "Name must be at least 8 characters",
      ],
      cpassRules: [
        (v) =>
          !!v == constant.VALIDATION.PASS.REQUIRE || "Password is required",
      ],
    };
  },
  computed: {
    ...mapGetters(["userId"]),
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    updatePassword() {
      this.password.id = this.userId;
      this.$store.dispatch("updatePassword", this.password);
    },
    cancelAlert(){
        this.$store.dispatch("pwAlert")
    }
  },
  beforeCreate() {
    this.user = this.userInfo;
  },
  updated() {
    if (this.password.confirm != this.password.new) {
      this.errorConfirm = "Password and Confirm Password Must be same";
    }
  },
};
</script>

<style scopoed>
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
.cross-btn{
    float:right;
}
</style>
