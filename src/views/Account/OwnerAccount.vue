<template>
    <section>
        <desktop-nav-bar></desktop-nav-bar>
        <page-header title="Account"></page-header>
        <v-divider></v-divider>
        <article id="accountLinks">
            <router-link to="/UpdateEmail" class="updateInput">
                <div>
                    <h4>Email</h4>
                    <p>{{ userAccountData.email }}</p>
                </div>
                <v-icon large>mdi-chevron-right</v-icon>
            </router-link>
            <router-link to="/UpdateUsername" class="updateInput">
                <div>
                    <h4>Username</h4>
                    <p>@{{ userAccountData.username }}</p>
                </div>
                <v-icon large>mdi-chevron-right</v-icon>
            </router-link>
            <router-link to=/UpdatePassword class="updateInput">
                <h4 class="passwordAndDelete">Password</h4>
                <v-icon large>mdi-chevron-right</v-icon>
            </router-link>
            <router-link to="/DeleteAccount" class="updateInput">
                <h4 class="passwordAndDelete">Delete Account</h4>
                <v-icon large>mdi-chevron-right</v-icon>
            </router-link>
            <log-out-user></log-out-user>
        </article>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import PageHeader from "../../components/PageHeader.vue";
    import LogOutUser from "../../components/Account/LogOutUser.vue";
    import NavigationBar from "../../components/NavigationBar.vue";
    import DesktopNavBar from "../../components/DesktopNavBar.vue";

    export default {
        name: "Owner-Account",

        components: {
            PageHeader,
            LogOutUser,
            NavigationBar,
            DesktopNavBar
        },

        data() {
            return {
                userAccountData: cookies.get("userData")
            }
        },

        mounted() {
            // If the user does not have a login token, take the user back to the Home page
            if(this.loginToken === null) {
                this.$router.push("/");
            }
        },
    }
</script>

<style scoped>
    section {
        background: white;
        width: 100%;
        height: 100%;
    }

    #accountLinks {
        display: grid;
        width: 100%;
    }

    h1 {
        text-align: center;
    }

    .updateInput {
        display: grid;
        align-items: center;
        grid-template-columns: 5fr 1fr;
        text-decoration: none;
        padding: 2vh 0vh;
    }

    #deleteAccountButton {
        margin-top: 3vh;
        padding: 3%;
        justify-self: center;
        text-align: center;
    }

    div {
        display: grid;
        row-gap: 10px;
        padding: 0vh 7vw;
    }

    h4 {
        color: black;
    }

    p {
        color: #636D6E;
    }

    .v-application p {
        margin-bottom: 0px;
    }

    .passwordAndDelete {
        padding-left: 7vw;
    }

    .v-icon::after {
        width: 0%;
    }

    @media only screen and (min-width: 768px) {

        .updateInput {
            grid-template-columns: 5fr 1fr;
        }

        div, .passwordAndDelete {
            padding: 1vw 5vw;
        }

        h4, p {
            font-size: 1.3rem;
        }

        p {
            font-weight: 300;
        }
    }

    @media only screen and (min-width: 1024px) {

        section {
            display: grid;
            place-items: center;
            background: whitesmoke;
            margin-top: 8vh;
        }

        #accountLinks {
            width: 40%;
            row-gap: 20px;
        }

        a {
            background: white;
            border-radius: 10px;
        }

        a:hover {
            box-shadow: 1px 5px 5px lightgrey;
        }

        h4, p {
            font-size: 1rem;
        }

        div, .passwordAndDelete {
            padding: 3vh 2vw;
        }
    }
</style>