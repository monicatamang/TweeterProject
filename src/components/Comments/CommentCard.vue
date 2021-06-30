<template>
    <article>
        <div v-for="comment in comments" :key="comment.commentId">
            <v-card class="pa-5" elevation="0" v-if="tweetId">
                <v-container>
                    <v-row>
                        <v-col cols="10">
                            <router-link :to="{ name: 'UsersProfiles', params: { userId: comment.userId } }" v-if="comment.userId !== ownerData.userId">
                                <v-card-title>@{{ comment.username }}</v-card-title>
                            </router-link>
                            <router-link to="/Profile" v-else>
                                <v-card-title>@{{ comment.username }}</v-card-title>
                            </router-link>
                        </v-col>
                        <v-col cols="2">
                            <div class="text-right" v-if="comment.username === ownerData.username">
                                <v-menu>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn v-bind="attrs" v-on="on" depressed color="transparent">
                                            <v-icon>mdi-dots-horizontal</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item class="grid">
                                            <update-comments :userCommentId="comment.commentId"></update-comments>
                                            <delete-comments :userCommentId="comment.commentId"></delete-comments>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-subtitle>{{ comment.content }}</v-card-subtitle>
                <v-card-text>{{ comment.createdAt }}</v-card-text>
                <v-container>
                    <v-row row="1">
                        <v-col cols="10">
                            <!-- <router-link :to="{ name: '#', params: { commentId: comment.tweetId, username: comment.username } }">
                                <v-card-text class="replyLink">Reply</v-card-text>
                            </router-link> -->
                            <v-card-text class="replyLink">Reply</v-card-text>
                        </v-col>
                        <v-col cols="2">
                            <comment-likes :commentIdNum="comment.commentId"></comment-likes>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </div>
    </article>
</template>

<script>
    import cookies from "vue-cookies";
    import UpdateComments from "./UpdateComments.vue";
    import DeleteComments from "./DeleteComments.vue";
    import CommentLikes from "./CommentLikes.vue";

    export default {
        name: "comment-card",

        props: {
            comments: Array,
            tweetId: Number
        },

        data() {
            return {
                ownerData: cookies.get("userData")
            }
        },

        components: {
            UpdateComments,
            DeleteComments,
            CommentLikes
        },
    }
</script>

<style scoped>
    div {
        padding: 2%;
        background: white;
    }

    article {
        display: grid;
        row-gap: 10px;
        margin: 1vh 0vw 19vh 0vw;
    }

    a {
        text-decoration: none;
        text-align: left;
        width: 20%;
    }

    .v-card__title {
        font-size: 1rem;
        color: black;
    }

    .v-card__subtitle {
        font-size: 0.9rem;
    }

    .v-list-item {
        display: grid;
        row-gap: 15px;
    }

    .v-list-item__title {
        color: black;
        font-size: 0.9rem;
    }

    .v-list-item::after {
        content: none;
    }

    .replyLink {
        margin-left: -1vw;
        color: var(--primaryColor);
    }
</style>