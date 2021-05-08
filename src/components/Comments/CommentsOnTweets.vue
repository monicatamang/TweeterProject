<template>
    <!-- If the comments belong to this tweet with the specific tweet id, then print the comments for that tweet -->
    <div v-if="idOfTweet" class="commentCard">

        <p>{{ printCommentsToTweetsStatus }}</p>

        <div v-for="comment in userComments" :key="comment.commentId" class="userComments">

            <div class="usernameAndDate">
                
                <router-link :to="{ name: 'UsersProfiles', params: { userId: comment.userId } }" v-if="comment.userId !== ownerData.userId">
                    <h4>@{{ comment.username }}</h4>
                </router-link>

                <router-link to="/Profile" v-else>
                    <h4>@{{ comment.username }}</h4>
                </router-link>

                <p class="commentDate">{{ comment.createdAt }}</p>
                <div class="text-center" v-if="comment.username === ownerData.username">
                    <v-menu>
                        <template v-slot:activator="{ on, attrs }">
                            <i class="fas fa-ellipsis-h fa-lg" v-bind="attrs" v-on="on"></i>
                        </template>
                        <v-list>
                            <v-list-item class="grid">
                                <router-link :to="{ 
                                    name: 'UpdateComments', 
                                    params: { 
                                        commentId: comment.commentId,
                                        tweetId: comment.tweetId,
                                        username: comment.username,
                                        content: comment.content,
                                        createdAt: comment.createdAt
                                    } }">
                                    <v-list-item-title>Edit</v-list-item-title>
                                </router-link>

                                <router-link :to="{ 
                                    name: 'DeleteComments', 
                                    params: { 
                                        commentId: comment.commentId,
                                        username: comment.username,
                                        content: comment.content,
                                        createdAt: comment.createdAt 
                                    } }">
                                    <v-list-item-title>Delete</v-list-item-title>
                                </router-link>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </div>

            <p>{{ comment.content }}</p>

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
    .commentCard {
        display: grid;
        row-gap: 8px;
        place-items: center;
        padding-bottom: 20.5vh;
        /* background: rgba(245, 245, 245, 0.3); */
    }

    .userComments {
        display: grid;
        row-gap: 15px;
        /* box-shadow: 1px 1px 5px lightgrey; */
        border: 1px solid rgba(211, 211, 211, 0.6);
        border-radius: 10px;
        width: 95vw;
        padding: 3vh;
        background: white;
    }

    .text-center {
        margin-right: -5vw;
    }

    .v-list-item {
        display: grid;
        row-gap: 15px;
    }

    .v-list-item__title {
        color: black;
        font-size: 1rem;
    }

    .v-list-item::after {
        content: none;
    }

    a {
        text-decoration: none;
    }

    .commentDate {
        font-weight: 300;
        font-size: 0.8rem;
        margin-bottom: 0px;
    }

    .usernameAndDate {
        display: grid;
        place-items: center;
        grid-template-columns: 1fr 2fr 1fr;
    }

    h4 {
        font-size: 0.9rem;
        color: black;
    }

    p {
        font-size: 0.95rem;
    }
</style>