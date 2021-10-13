<template>
    <div class="container">
    <h1 class="header">Profile</h1>
    
      <v-card class="mx-auto px-14 py-8 card">
        <div>
          <img
              v-if="this.image"
              :src="this.image"
              style="width: 250px"
          />
        </div>
        <v-text-field
        label="Name"
        :value="profileData.name"
          readonly
        ></v-text-field>

        <v-text-field
        :value="this.type"
        label="Type"
          readonly
        ></v-text-field>

        <v-text-field
        :value="profileData.email"
        label="Email"
          readonly
        ></v-text-field>

        <v-text-field
        :value="profileData.phone"
        label="Phone"
          readonly
        ></v-text-field>

        <v-text-field
        :value="profileData.dob"
        label="Date Of Birth"
          readonly
        ></v-text-field>

        <v-text-field
        :value="profileData.address"
        label="Address"
          readonly
        ></v-text-field>       
        
      </v-card>

      <div class="btn">
        <v-btn color="#198754" class="mr-4" style="color: white" @click="editProfile">
          Edit Profile
        </v-btn>
        
      </div>
  </div>
</template>

<script>
import axios from "axios";
export default{
    data:()=>{
        return{
            image: null,
            type: null,
        }
    },
    computed:{
        profileData(){
            return this.$store.state.user.user
        }
    },
    created() {
        if(this.profileData.role===0){
            this.type = "Admin"
        }else{
            this.type = "User"
        }
        axios
            .get(`/detail?id=${this.$store.state.user.user.id}`)
            .then((data) => {
                this.image = data.data.image
            })
            .catch((err) => {
                console.log(err);
            });
    },
    methods:{
        editProfile(){
            this.$router.push({name: "profile-edit"})
        }
    }
}
</script>

<style scoped>
.header{
    padding: 20px;
    font-size: 20px;
    background: #198754;
    color: #FFF;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.card{
    border: 1px solid #198754;
    margin-top: -2px;
}
.btn{
    margin: 20px;
}
</style>