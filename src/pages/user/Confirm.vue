<template>
  <div class="container">
    <h1 class="header">Register Confirm</h1>
    <v-form
      ref="form"
      @submit.prevent=""
      lazy-validation
    >
      <v-card class="mx-auto px-14 py-8 card">
        <v-text-field
        label="Name"
          :value="usersData.name"
          readonly
        ></v-text-field>

        <v-text-field
        label="Email"
          :value="usersData.email"
          readonly
        ></v-text-field>

        <v-text-field
        label="Password"
        type="password"
          :value="usersData.password"
          readonly
        ></v-text-field>
        <v-text-field
        label="Type"
          :value="type"
          readonly
        ></v-text-field>
      </v-card>

      <div class="btn">
        <v-btn color="error" class="mr-4">
          Reset
        </v-btn>
        <v-btn
          type="submit"
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
export default{
    data:()=>({
        type: null
    }),
    computed:{
        usersData(){
            return this.$store.state.users
        }
    },
    created(){
        if (this.usersData.role === 0 ) {
            this.type = "Admin"
        }else{
            this.type = "User"
        }
    }
}
</script>

<style scoped></style>