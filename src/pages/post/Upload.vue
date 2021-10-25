<template>
  <div class="container">
    <h1 class="header">Upload CSV file</h1>
    <v-form ref="form" @submit.prevent="upload" lazy-validation>
      <v-card class="mx-auto px-14 py-8 card">
          <v-alert v-if="this.errorMsg != null" type="error">
        <span v-if="this.errorMsg1 !=null">
            "{{this.errorMsg1}}"  in import file</span> {{ this.errorMsg }}
        <button class="cross-btn" @click="close">X</button>
      </v-alert>
        <v-file-input
          label="CSV file"
          prepend-icon="attachment"
          v-model="csvfile"
          :rules="csvRules"
          class="file"
        ></v-file-input>
        <div class="btn">
          <v-btn color="error" class="clear-btn" @click="clear">Clear</v-btn>
          <v-btn color="#198754" type="submit" style="color: white" @click="validate"
            >Submit</v-btn
          >
        </div>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import constant from "../../constants";
export default {
  data: () => {
    return {
      csvfile: null,
      user_id: "",
      errorMsg: null,
      errorMsg1: null,
      csvRules: [
      (v) => !!v == constant.VALIDATION.CSV.REQUIRE || "File field is required",
    ],
    }
  },
  methods: {
    upload() {
      this.user_id = this.$store.state.user.user.id;
      const formData = new FormData();
      formData.append("file", this.csvfile);
      formData.append("user_id", this.user_id);
      this.$axios
        .post("post/upload", formData)
        .then((response) => {
          console.log(response);
        })
        .catch((error)=>{
            
            console.log(error.response.data)
            if (error.response.data.error2) {
                this.errorMsg = error.response.data.error1.title[0]
                this.errorMsg1 = error.response.data.error2
            }
            else{
                this.errorMsg = error.response.data.error;
            }
        }) 
    },
    validate() {
      this.$refs.form.validate();
    },
    clear() {
      this.csvfile = null;
    },
    close(){
        this.errorMsg=null
    }
  },
};
</script>

<style scoped>
.header {
  font-size: 21px;
}
.file {
  padding: 20px 50px;
}
.btn {
  margin-top: 10px;
  text-align: center;
}
.clear-btn {
  margin-right: 20px;
}
.card {
  border: 1px solid #198754;
}
.cross-btn {
  float: right;
}
</style>
