<template>
    <div>
        <!-- <div v-for="comment in usersComments" :key="comment.commentId">
            <h4>@{{ comment.username }}</h4>
            <p>{{ comment.content }}</p>
            <p>{{ comment.createdAt }}</p>

            <router-link :to="{
                name: 'UpdateComments',
                params: {
                    commentId: comment.commentId,
                    tweetId: comment.tweetId,
                    username: comment.username,
                    content: comment.content,
                    createdAt: comment.createdAt
                }
            }" v-if="comment.username === ownerData.username">
                <button>Update</button>
            </router-link>

            <router-link :to="{
                name: 'DeleteComments',
                params: {
                    commentId: comment.commentId,
                    username: comment.username,
                    content: comment.content,
                    createdAt: comment.createdAt
                }
            }" v-if="comment.username === ownerData.username">
                <button>Delete</button>
            </router-link>
        </div> -->
    </div>
</template>

<script>
    // import cookies from "vue-cookies";

    export default {
        name: "print-comments",

        // data: function() {
        //     return {
        //         ownerData: cookies.get("userData")
        //     }
        // },

        // props: {
        //     usersComments: Array
        // },
    }
</script>

<style scoped>

</style>