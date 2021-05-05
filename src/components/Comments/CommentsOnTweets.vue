<template>
    <!-- If the comments belong to this tweet with the specific tweet id, then print the comments for that tweet -->
    <div v-if="idOfTweet">

        <p>{{ printCommentsToTweetsStatus }}</p>

        <div v-for="comment in userComments" :key="comment.commentId" id="userComments">

            <!-- <router-link :to="{ name: 'ReplyToComments', params: { tweetId: comment.tweetId, username: comment.username} }">
                
            </router-link> -->

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

            <comment-likes :commentIdNum="comment.commentId"></comment-likes>
        </div>
    </div>
</template>

<script>
    // import axios from "axios";
    import cookies from "vue-cookies";
    import CommentLikes from "./CommentLikes.vue";
    

    export default {
        name: "comments-on-tweets",

        components: {
            CommentLikes
        },

        data: function() {
            return {
                ownerData: cookies.get("userData"),
                printCommentsToTweetsStatus: "",
            }
        },

        props: {
            idOfTweet: Number,
        },

        methods: {
            getComments: function() {
                this.$store.dispatch("getUserComments", this.idOfTweet); 
            },

            // commenterUsername: function() {
            //     this.$store.commit("updateCommentUsername", )
            // }
        },

        computed: {
            userComments: function() {
                return this.$store.state.userCommentsOnTweets;
            }
        },

        mounted: function() {
            this.getComments();
        }
    }
</script>

<style scoped>
    #userComments {
        border: 1px solid black;
    }
</style>