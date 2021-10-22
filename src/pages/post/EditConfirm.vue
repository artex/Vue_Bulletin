<template>
    <div class="container">
    <h1 class="header">Edit Post</h1>
    <v-form
      ref="form"
      @submit.prevent="updatePost"
      lazy-validation
    >
      <v-card class="mx-auto px-14 py-8 card">
        <v-text-field
          :value="EditData.title"
          label="Title"
          readonly
        ></v-text-field>

        <v-textarea
          :value="EditData.description"
          name="input-7-1"
          filled
          label="Description"
          auto-grow
          class="mt-5"
          readonly
        ></v-textarea>

        <template>
          <v-container class="px-0" fluid>
            <v-switch
            color="success"
              v-model="switch1"
              :label="`Status`"
            ></v-switch>
          </v-container>
        </template>
      </v-card>
      <div class="btn">
        <v-btn color="error" class="mr-4" @click="cancelEdit">
          Cancel
        </v-btn>
        <v-btn
          type="submit"
          color="#198754"
          class="mr-4"
          style="color: white"
        >
          Edit
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
export default{
    data:()=>{
        return{
            switch1: true
        }
    },
    computed: {
    EditData() {
      return this.$store.state.editpost;
    },
  },
  created(){
      if (this.EditData.status === 1) {
          this.switch1 = true
      }
      else{
          this.switch1  = false
      }
  },
    methods:{
        cancelEdit(){
            this.$router.back()
        },
        updatePost(){
            this.$store.dispatch("updatePost", this.EditData)
        }
    }
}
</script>

<style scoped>

</style>