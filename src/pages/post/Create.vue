<template>
  <div class="container">
    <h1 class="header">Create Post</h1>
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="createPost"
      lazy-validation
    >
      <v-card class="mx-auto px-14 py-8 card">
          <div v-if="this.$store.state.posterror" class="errMsg">
             Title {{this.$store.state.posterror.title[0]}}
          </div>
        <v-text-field
          v-model="posts.title"
          :counter="255"
          label="Title"
          :rules="titleRules"
        ></v-text-field>

        <v-textarea
          v-model="posts.description"
          name="input-7-1"
          filled
          label="Description"
          auto-grow
          class="mt-5"
          :rules="descriptRules"
        ></v-textarea>
      </v-card>

      <div class="btn">
        <v-btn color="error" class="mr-4" @click="clear">
          Clear
        </v-btn>
        <v-btn
          type="submit"
          @click="validate"
          :disabled="!valid"
          color="#198754"
          class="mr-4"
          style="color: white"
        >
          Create
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import constant from "../../constants";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    valid: true,
    modal: false,
    posts: {
      title: "",
      description: "",
      status: "",
      create_user_id: "",
      update_user_id: "",
      delete_user_id: "",
      deleted_at: "",
    },
    titleRules: [
      (v) => !!v == constant.VALIDATION.TITLE.REQUIRE || "Title is required",
      (v) =>
        v.length <= constant.VALIDATION.TITLE.MAX ||
        `Title must be less than ${constant.VALIDATION.TITLE.MAX} characters`,
    ],
    descriptRules: [
      (v) =>
        !!v == constant.VALIDATION.DESCRIPT.REQUIRE ||
        "Description is required",
    ],
  }),
  computed: {
    ...mapGetters(["userId", "userType", "userName"]),
  },
  created() {
    console.log(this.$store.state.posts);
    if (this.$store.state.posts) {
      this.posts = this.$store.state.posts;
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    clear() {
      this.posts = {
        title: "",
        description: "",
      };
    },
    createPost() {
      this.posts.create_user_id = this.userId;
      this.posts.update_user_id = this.userId;
      this.posts.status = 1;
      this.$store.dispatch("confirmPost", this.posts)
    },
  },
  beforeDestroy(){
      this.$store.dispatch("clearError")
  }
};
</script>

<style scopped>
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
