<template>
  <div class="container">
    <h1 class="header">Forgot Password?</h1>
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="updatePassword"
      lazy-validation
    >
      <v-card class="mx-auto px-14 py-8 card">
        <!-- <v-alert v-if="this.$store.state.forgotnoti" type="info">
          {{ this.$store.state.forgotnoti.data.data }}
          <button class="cross-btn" @click="cancelAlert">X</button>
        </v-alert>
        <v-alert v-if="this.$store.state.forgotnoti2" type="error">
          {{ this.$store.state.forgotnoti2.error }}
          <button class="cross-btn" @click="cancelAlert">X</button>
        </v-alert> -->
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
export default {
  data: () => {
    return {
      valid: true,
      password: {
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
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    updatePassword() {
      this.$axios
        .post("/reset/update", {
          token: this.$route.params.token,
        })
        .then((data) => {
          this.$axios
            .put("/user/reset_pw", {
              email: data.data.email,
              password: this.password.new,
            })
            .then((data) => {
                this.$store.dispatch("pwsetnoti", data)
              this.$router.push({name: "login"})
            });
        });
    },
  },
  beforeCreate() {
    console.log(this.$route.params.token);
  },
  updated() {
    if (this.password.confirm != this.password.new) {
      this.errorConfirm = "Password and Confirm Password Must be same";
    }
  },
};
</script>

<style scoped></style>
