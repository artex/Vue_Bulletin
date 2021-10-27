<template>
  <div class="container">
    <h1 class="header">Forgot Password?</h1>
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="resetPassword"
      lazy-validation
    >
      <v-card class="mx-auto px-14 py-8 card">
        
        <v-alert v-if="this.$store.state.forgotnoti2" type="error">
          {{ this.$store.state.forgotnoti2.error }}
          <button class="cross-btn" @click="cancelAlert">X</button>
        </v-alert>
        <v-text-field
          v-model="forgot.email"
          :counter="100"
          label="Email"
          required
          :rules="emailRules"
          type="email"
        ></v-text-field>
      </v-card>

      <div class="btn">
        <v-btn
          type="submit"
          @click="validate"
          :disabled="!valid"
          color="#198754"
          class="mr-4"
          style="color: white"
        >
          Reset Password
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
      forgot: {
        email: "",
      },
      emailRules: [
        (v) => !!v == constant.VALIDATION.EMAIL.REQUIRE || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        (v) =>
          v.length <= constant.VALIDATION.EMAIL.MAX ||
          "Name must be less than 100 characters",
      ],
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    resetPassword() {
      this.$store.dispatch("resetPassword", this.forgot)
    },
    cancelAlert(){
      this.$store.dispatch("cancelAlert")
    }
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
