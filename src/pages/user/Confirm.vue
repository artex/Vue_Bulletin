<template>
  <div class="container">
    <h1 class="header">Register Confirm</h1>
    <v-form
      ref="form"
      @submit.prevent="createUser"
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

        <v-text-field
        label="Phone"
          :value="usersData.phone"
          readonly
        ></v-text-field>

        <v-text-field
        label="Date Of Birth"
          :value="usersData.dob"
          readonly
        ></v-text-field>
        <v-text-field
        label="Address"
          :value="usersData.address"
          readonly
        ></v-text-field>
        <div>
          <img
              v-if="
                this.$store.state.photofile &&
                  this.$store.state.photofile.length
              "
              :src="this.$store.state.photofile"
              style="width: 250px"
          />
        </div>
        
      </v-card>

      <div class="btn">
        <v-btn color="error" class="mr-4" @click="cancelUser">
          Cancel
        </v-btn>
        <v-btn
          type="submit"
          color="#198754"
          class="mr-4"
          style="color: white"
        >
          Confirm
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
    methods:{
      cancelUser(){
        this.$router.push({name: "create"})
      },
      createUser(){
        let formData = new FormData();
            if (this.$store.state.users) {
                formData.append("filename", this.$store.state.users.profile);
                Object.entries(this.$store.state.users).forEach(([key, value]) => {
                    formData.append(key, value);
                });
                formData.append(
                    "profile",
                    this.$store.state.users.profile.name
                );
            }
            this.$store.dispatch("createUsers", formData).then(()=>{
              this.$router.push({
                name: "list",
            });
            });
            
      },
    },
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

<style scoped>
.header{
  background: #198754;
  color: #FFF;
  padding: 15px;
  font-size: 20px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}
.btn{
  text-align: center;
  margin: 15px 0;
}
.card{
  border: 1px solid #198754;
  margin-top: -3px;
}
</style>