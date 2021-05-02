<template>
    <div>
        <div v-for="comment in usersComments" :key="comment.commentId">
            <h4>@{{ comment.username }}</h4>
            <p>{{ comment.content }}</p>
            <p>{{ comment.createdAt }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "print-comments",

        props: {
            usersComments: Array
        },
    }
</script>

<style scoped>

</style>