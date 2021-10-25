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
        download() {
            this.$axios.get("/post/download").then((data) => {
                const data1 = data.data
                const csvData = objectToCsv(data1);
                download(csvData)
            })
            const objectToCsv = function(data1) {
                const csvRows = [];
                const headers = Object.keys(data1[0]);
                csvRows.push(headers.join(','));
                for (const row of data1) {
                    const values = headers.map(header => {
                        const escaped = ('' + row[header]).replace(/"/g, '\\"');
                        return `"${escaped}"`;
                    });
                    csvRows.push(values.join(','));
                }
                return csvRows.join('\n');
            }
            const download = function(data1) {
                const blob = new Blob([data1], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.setAttribute('hidden', '');
                a.setAttribute('href', url);
                a.setAttribute('download', 'download.csv');
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };
        }
    },
};