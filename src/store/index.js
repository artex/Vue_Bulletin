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
    },
    mutations: {
        setUserData(state, userData) {
            state.user = userData;
        },
        setUsersData(state, usersData) {
            state.users = usersData
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
        login({ commit }, credentials) {
            // console.log(credentials)
            return axios.post("/auth/login", credentials).then(({ data }) => {
                commit("setUserData", data);
                console.log(data)
            });
        },
        logout({ commit }) {
            commit("setUserData", null);
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