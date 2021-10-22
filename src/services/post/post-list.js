import { mapGetters } from "vuex";
import axios from "axios";
export default {
    data() {
        return {
            postInfo: null,
            dialogTitle: "",
            dialog: false,
            isDeleteDialog: false,
            headerList: [{
                    text: "ID",
                    align: "start",
                    value: "id",
                },
                {
                    text: "Post Title",
                    value: "title",
                },
                {
                    text: "Post Desciption",
                    value: "description",
                },
                {
                    text: "Posted User",
                    value: "create_user",
                },
                {
                    text: "Posted Date",
                    value: "created_at",
                },
                {
                    text: "Operation",
                    value: "operation",
                },
            ],
            postList: [],
            showList: [],
            noti: null,
            keyword: "",
        };
    },
    computed: {
        ...mapGetters(["isLoggedIn"]),
        headers() {
            if (!this.isLoggedIn) {
                return this.headerList.slice(0, this.headerList.length - 1);
            } else {
                return this.headerList;
            }
        },
    },
    mounted() {
        this.$axios
            .get("/post/list")
            .then((response) => {
                this.postList = response.data;
                this.showList = this.postList;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    methods: {
        /**
         * This is to filter posts of datatable.
         * @returns void
         */
        filterPosts() {
            this.showList = this.postList.filter((post) => {
                return (
                    post.title.includes(this.keyword)
                );
            });
        },
        cancelAlert() {
            this.$store.state.postnoti = false;
            this.$store.dispatch("postcancelAlert");
        },
        cancelAlert3() {
            this.noti = null;
        },
        deletePost(item) {
            item.deleted_user_id = this.$store.state.user.user.id;
            item.deleted_at = new Date()
                .toJSON()
                .slice(0, 10)
                .replace(/-/g, "/");
            return axios.put("/post/delete", item).then((data) => {
                console.log(data)
                this.noti = data.data.data
                this.$axios
                    .get("/post/list")
                    .then((response) => {
                        this.userList = response.data;
                        this.showList = this.userList;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
        },
    },
};