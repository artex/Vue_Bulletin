<template>
  <v-card>
      <h1 class="header">User List</h1>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-form ref="form">
        <v-row class="filter-bar">
          <v-col md="2.5">
            <v-text-field
              label="Name"
              @change="filterPosts"
              v-model="keyword"
              hide-details="auto"
            >
            </v-text-field>
          </v-col>
          <v-col md="2.5">
            <v-text-field
              label="Email"
              @change="filterPosts"
              v-model="keyword"
              hide-details="auto"
            >
            </v-text-field>
          </v-col>
          <v-btn class="post-list-btn mr-4" color="primary">Search</v-btn>
        </v-row>
      </v-form>
    </v-card-title>
    <v-container>
      <v-data-table :headers="headers" :items="showList">
        <template v-slot:[`item.name`]="{ item }">
          <router-link
            :to="`/applicants/${item.id}`"
            :key="item.id"
            v-if="item.name"
            >{{ item.name }}</router-link
          >
        </template>
        <template v-slot:[`item.operation`]="{ item }">
          <v-row>
            <div class="operation-btn">
              <router-link :to="`/applicants/${item.id}`" class="detail-btn"
                >DETAIL</router-link
              >
            </div>
            <div class="operation-btn">
              <v-btn color="error"  @click="deleteApplicant(item.id)" class="post-list-btn">Delete</v-btn>
            </div>
          </v-row>
        </template>
      </v-data-table>
    </v-container>
  </v-card>
</template>

<script>
export default{

}
</script>

<style scoped>
.header{
    background: #198754;
    color: white;
    padding: 15px;
    font-size: 18px;
}
</style>
