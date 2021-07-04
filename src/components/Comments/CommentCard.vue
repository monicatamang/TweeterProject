<template>
    <article>
        <div v-for="comment in comments" :key="comment.commentId" class="cardContainer">
            <v-card class="pa-xs-5 pa-sm-10" elevation="0" v-if="tweetId">
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
                                            <v-icon class="hidden-sm-and-up">mdi-dots-horizontal</v-icon>
                                            <v-icon size="30" class="hidden-xs-only">mdi-dots-horizontal</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item class="grid">
                                            <update-comments :userCommentId="comment.commentId"></update-comments>
                                            <delete-comments :userCommentId="comment.commentId" @isCommentDeleted="notifyCommentLikes"></delete-comments>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-subtitle class="ml-2 ml-sm-2">{{ comment.content }}</v-card-subtitle>
                <v-container>
                    <v-row row="1">
                        <v-col cols="10">
                            <v-card-text>{{ comment.createdAt }}</v-card-text>
                        </v-col>
                        <v-col cols="2" class="d-sm-flex justify-end">
                            <comment-likes :commentIdNum="comment.commentId" :checkCommentDeleted="callCommentLikes"></comment-likes>
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
            tweetId: Number,
            callCommentLikes: undefined
        },

        data() {
            return {
                ownerData: cookies.get("userData")
            }
        },

        methods: {
            notifyCommentLikes(data) {
                this.callCommentLikes = data;
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
    }

    .cardContainer {
        border-bottom: 1px solid rgba(211, 211, 211, 0.5);
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

    @media only screen and (min-width: 768px) {
        
        div {
            padding: 1%;
        }

        .v-card__title {
            font-size: 1.2rem;
        }

        .v-card__subtitle {
            font-size: 1.1rem;
            margin: 2% 0%;
        }

        .v-card__text {
            font-size: 1rem;
            margin: 2% 0%;
        }
    }
</style>