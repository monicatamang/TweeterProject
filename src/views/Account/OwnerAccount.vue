<template>
    <section>
        <page-header></page-header>
        <h1>Account</h1>
        <router-link to="/UpdateEmail">
            <div>
                <h4>Email</h4>
                <p>{{ userAccountData.email }}</p>
            </div>
        </router-link>
        <router-link to="/UpdateUsername">
            <div>
                <h4>Username</h4>
                <p>{{ userAccountData.username }}</p>
            </div>
        </router-link>
        <router-link to=/UpdatePassword>
            <p>Password</p>
        </router-link>
        <router-link to="/DeleteAccount">
            <button>Delete Account</button>
        </router-link>
        <log-out-user></log-out-user>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import PageHeader from "../../components/PageHeader.vue";
    import LogOutUser from "../../components/LogOutUser.vue";
    import NavigationBar from "../../components/NavigationBar.vue";

    export default {
        name: "Owner-Account",

        components: {
            PageHeader,
            LogOutUser,
            NavigationBar
        },

        data: function() {
            return {
                userAccountData: cookies.get("userData"),
            }
        },
    }
</script>

<style scoped>
    section {
        display: grid;
        row-gap: 20px;
    }


    h1 {
        text-align: center;
    }

    a {
        text-decoration: none;
    }

    div {
        display: grid;
    }

    h4 {
        color: black;
    }

    p {
        color: #636D6E;
    }



    /* input, textarea {
        border: 1px solid black;
        margin-bottom: 3vh;
    }

    div {
        display: grid;
    }

    button {
        border: 1px solid black;
    } */
</style>