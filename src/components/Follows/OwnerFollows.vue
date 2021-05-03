<template>
    <div>
        <h4>{{ numberOfFollows }} Following</h4>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "print-owner-follows",

        data: function() {
            return {
                numberOfFollows: undefined
            }
        },

        methods: {
            countOwnerFollows: function() {
                axios.request({
                    url: "https://tweeterest.ml/api/follows",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    params: {
                        userId: cookies.get("userId")
                    }
                }).then((res) => {
                    this.numberOfFollows = res.data.length;
                }).catch((err) => {
                    console.log(err);
                });
            }
        },

        mounted () {
            this.countOwnerFollows();
        },
    }
</script>

<style scoped>

</style>