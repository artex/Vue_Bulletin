import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

axios.defaults.baseURL = process.env.VUE_APP_SERVER;

export default new Vuex.Store({
    state: {
        user: null,
        users: null,
        photofile: [],
        confirm: "",
        noti: "",
        editnoti: "",
    },
    mutations: {
        setUserData(state, userData) {
            state.user = userData;
        },
        setUserData1(state, userData) {
            state.user.user.role = userData;
        },
        setUsersData(state, usersData) {
            state.users = usersData
        },
        storeFile(state, fileData) {
            state.photofile = fileData
        },
        confirmPassword(state, confirmPassword) {
            state.confirm = confirmPassword
        },
        notification(state, notification) {
            state.noti = notification
        },
        editnoti(state, editnoti) {
            state.editnoti = editnoti
        }
    },
    actions: {
        confirmUser({ commit }, usersData) {
            return axios.post("/user/confirm", usersData).then((data) => {
                commit("setUsersData", usersData)
                console.log(data)
            }).catch((err) => {
                console.log(err.response.data)
            })
        },
        confirmPassword({ commit }, confirmPassword) {
            commit("confirmPassword", confirmPassword)
        },
        createUsers({ commit }, createUsers) {
            return axios.post("/user/create", createUsers).then((data) => {
                console.log(data)
                commit("notification", data)
                commit("setUsersData", null)
                commit("confirmPassword", null)
                commit("storeFile", null)
            })
        },
        editProfile({ commit }, editprofileData) {
            return axios.put(`/update?${this.state.user.user.id}`, editprofileData).then((data) => {
                commit("editnoti", data)
                commit("setUserData1", editprofileData.role)
            })

        },
        login({ commit }, credentials) {
            return axios.post("/auth/login", credentials).then(({ data }) => {
                commit("setUserData", data);
                console.log(data)
            });
        },
        logout({ commit }) {
            commit("setUserData", null);
        },

        filestore({ commit }, file) {
            commit("storeFile", file)
        },
        cancelAlert({ commit }) {
            commit("notification", null)
        },
        cancelAlert2({ commit }) {
            commit("editnoti", null)
        },
    },
    getters: {
        isLoggedIn: (state) => !!state.user,
        userType: (state) => {
            if (state.user) {
                return state.user.user.role;
            }
        },
        userId: (state) => {
            if (state.user && state.user.user.id) {
                return state.user.user.id;
            }
        },
        userName: (state) => {
            if (state.user && state.user.user.name) {
                return state.user.user.name;
            }
        },
    },
    plugins: [createPersistedState()],
});