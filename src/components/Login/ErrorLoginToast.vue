<template>
    <div>
        <p>The username and password you entered did not match our records. Please double-check and try again.</p>
    </div>
</template>

<script>
    export default {
        name: "error-login-toast"
    }
</script>

<style scoped>
    div {
        position: absolute;
        top: -5vh;
        opacity: 0;
        transition: all 3s ease-in-out;
    }
</style>