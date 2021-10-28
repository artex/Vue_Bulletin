import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import cookie from "vue-cookie"
Vue.use(Vuex);

axios.defaults.baseURL = process.env.VUE_APP_SERVER;
import router from "../router"
export default new Vuex.Store({
    state: {
        user: null,
        users: null,
        photofile: [],
        confirm: "",
        noti: "",
        editnoti: "",
        posts: null,
        postnoti: "",
        editpost: null,
        error: null,
        posterror: null,
        pwnoti: "",
        pwsuccess: "",
        forgotnoti: "",
        forgotnoti2: "",
        pwsetnoti: "",
        loginnoti: "",
        remember: false,
    },
    mutations: {
        setUserData(state, userData) {
            state.user = userData;
        },
        setUserData3(state, userData) {
            state.user = userData.data;
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
        },
        setPostsData(state, postsData) {
            state.posts = postsData
        },
        postnoti(state, postnoti) {
            state.postnoti = postnoti
        },
        editPost(state, edit) {
            state.editpost = edit
        },
        editerror(state, editerror) {
            state.error = editerror
        },
        clearError(state) {
            state.error = null
        },
        posterror(state, error) {
            state.posterror = error
        },
        pwnoti(state, pwnoti) {
            state.pwnoti = pwnoti
        },
        pwsuccess(state, pwsuccess) {
            state.pwsuccess = pwsuccess
        },
        forgotnoti(state, forgot) {
            state.forgotnoti = forgot
        },
        forgotnoti2(state, forgot) {
            state.forgotnoti2 = forgot
        },
        pwsetnoti(state, pwsetnoti) {
            state.pwsetnoti = pwsetnoti
        },
        loginnoti(state, loginnoti) {
            state.loginnoti = loginnoti
        },
        remember(state, remember) {
            state.remember = remember
        },
        autologout(state, token) {
            state.user.token = token
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
            commit("remember", credentials.remember)
            return axios.post("/auth/login", credentials).then(({ data }) => {
                if (credentials.remember == false) {
                    cookie.set("token", data.token)
                } else {
                    cookie.set("token", data.token, { expires: '1Y' })
                }
                commit("setUserData", data);
                router.push({ name: "post-list" });

            }).catch((error) => {
                commit("loginnoti", error.response.data)
            })
        },
        logout({ commit }) {
            commit("setUserData", null);
        },

        filestore({ commit }, file) {
            commit("storeFile", file)
        },
        cancelAlert({ commit }) {
            commit("notification", null)
            commit("forgotnoti", null)
            commit("forgotnoti2", null)
            commit("pwsetnoti", null)
            commit("loginnoti", null)
        },
        cancelAlert2({ commit }) {
            commit("editnoti", null)
        },
        pwAlert({ commit }) {
            commit("pwnoti", null)
        },
        confirmPost({ commit }, postsData) {
            return axios.post("/post/confirm", postsData).then(() => {
                commit("setPostsData", postsData)
                router.push({ name: "post-confirm" })
            }).catch((error) => {
                console.log(error.response.data)
                commit("posterror", error.response.data)
            })
        },
        createPosts({ commit }, createPost) {
            return axios.post("/post/create", createPost).then((data) => {
                commit("postnoti", data)
                commit("setPostsData", null)
            })
        },
        postcancelAlert({ commit }) {
            commit("postnoti", null)
        },
        editPost({ commit }, editPost) {
            return axios.put("/post/edit", editPost)
                .then((data) => {
                    console.log(data)
                    commit("editPost", editPost)
                    router.push({ name: "confirm-edit" })
                }).catch(err => {
                    console.log(err.response.data)
                    commit("editerror", err.response.data)
                })
        },
        clearError({ commit }) {
            commit("clearError", null)
            commit("posterror", null)
        },
        updatePost({ commit }, updateData) {
            return axios.put("/post/update", updateData).then((data) => {
                commit("postnoti", data)
                commit("editPost", null)
                router.push({ name: "post-list" })
            })
        },
        updatePassword({ commit }, newpwData) {
            return axios.put("/user/pwupdate", newpwData).then(() => {
                this.state.user.user.password = newpwData.new
                return axios.put("/user/pwupdated", this.state.user.user).then((data) => {
                    commit("setUserData3", data);
                    commit("pwsuccess", data.data.noti);
                    router.push({ name: "list" })
                })
            }).catch((error) => {
                commit("pwnoti", error.response.data)
            })
        },
        pwsuccessAleart({ commit }) {
            commit("pwsuccess", null);
        },
        resetPassword({ commit }, reset) {
            return axios.post("/user/reset", reset).then((data) => {
                console.log(data)
                commit("forgotnoti", data);
                router.push({ name: "login" })
                return axios.post("/reset/create", {
                    email: data.data.email,
                    token: data.data.token
                }).then((data) => {
                    console.log(data)
                })
            }).catch((error) => {
                console.log(error.response.data)
                commit("forgotnoti2", error.response.data);
            })
        },
        pwsetnoti({ commit }, noti) {
            commit("pwsetnoti", noti)
        },
        autologout({ commit }, token) {
            commit("autologout", token)
        }
    },
    getters: {
        isLoggedIn: (state) => !!state.user,
        userInfo: (state) => {
            if (state.user) {
                return state.user.user;
            }
        },
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