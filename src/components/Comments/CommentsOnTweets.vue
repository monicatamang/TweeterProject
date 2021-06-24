<template>
    <!-- If certain comments belong to a tweet, print all the comments that belong to that specific tweet -->
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
                                    params: { commentId: comment.commentId } }">
                                    <v-list-item-title>Edit</v-list-item-title>
                                </router-link>

                                <router-link :to="{ 
                                    name: 'DeleteComments', 
                                    params: { commentId: comment.commentId } }">
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

        // Receiving the tweet id of a tweet from the UsersTweet view
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
            // When the page refreshes, send axios request to get comments that belong to a tweet
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
    }

    .userComments {
        display: grid;
        row-gap: 15px;
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
        font-size: 0.95rem;
        color: black;
    }

    p {
        font-size: 0.9rem;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        .userComments {
            width: 82vw;
            margin-left: 15vw;
        }

        .usernameAndDate {
            grid-template-columns: 1fr 3fr 5fr;
        }

        i {
            margin-left: 25vw;
        }

        h4 {
            font-size: 1.2rem;
        }

        p {
            font-size: 1.1rem;
        }

        .commentDate {
            font-size: 1rem;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

        .userComments {
            width: 88vw;
            margin-left: 10vw;
        }

        .usernameAndDate {
            grid-template-columns: 1fr 3fr 10fr;
        }

        i {
            margin-left: 45vw;
        }

        h4 {
            font-size: 1.2rem;
        }

        p {
            font-size: 1.1rem;
        }

        .commentDate {
            font-size: 1rem;
        }
    }

    @media only screen and (min-width: 1024px) {

        .userComments {
            width: 50vw;
            margin-left: 25vw;
        }

        .usernameAndDate {
            grid-template-columns: 1fr 3fr 5fr;
        }

        i {
            margin-left: 10vw;
        }
    }
</style>