<template>
    <section>
        <h1>Update Email</h1>
        <h3>Current</h3>
        <p>{{ userData.email }}</p>
        <label for="accountEmail">Email</label>
        <input type="text" id="accountEmail" @keypress="isTyping = true">
    </section>
</template>

<script>
    import cookies from "vue-cookies";

    export default {
        name: "Update-Email",
        data() {
            return {
                userData: cookies.get("userData")
            }
        },
    }
</script>

<style scoped>
    section {
        display: grid;
        place-items: center;
    }

    input {
        border: 1px solid black;
    }
</style>