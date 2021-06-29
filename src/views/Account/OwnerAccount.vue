<template>
    <section>
        <account-header></account-header>
        <!-- <owner-profile-details id="ownerProfile"></owner-profile-details> -->
        <desktop-navigation-bar id="desktopNavBar"></desktop-navigation-bar>
        <article id="accountLinks">
            <router-link to="/UpdateEmail" class="updateInput">
                <div>
                    <h4>Email</h4>
                    <p>{{ userAccountData.email }}</p>
                </div>
                <i class="fas fa-angle-right fa-2x" id="backIcon"></i>
            </router-link>
            <router-link to="/UpdateUsername" class="updateInput">
                <div>
                    <h4>Username</h4>
                    <p>@{{ userAccountData.username }}</p>
                </div>
                <i class="fas fa-angle-right fa-2x" id="backIcon"></i>
            </router-link>
            <router-link to=/UpdatePassword class="updateInput">
                <h4 class="passwordAndDelete">Password</h4>
                <i class="fas fa-angle-right fa-2x" id="backIcon"></i>
            </router-link>
            <router-link to="/DeleteAccount" class="updateInput">
                <h4 class="passwordAndDelete">Delete Account</h4>
                <i class="fas fa-angle-right fa-2x" id="backIcon"></i>
            </router-link>
            <log-out-user></log-out-user>
        </article>
        <navigation-bar id="mobileAndTabletNavBar"></navigation-bar>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import AccountHeader from "../../components/Account/AccountHeader.vue";
    // import OwnerProfileDetails from "../../components/UserProfiles/OwnerProfileDetails.vue";
    import LogOutUser from "../../components/Account/LogOutUser.vue";
    import NavigationBar from "../../components/NavigationBar.vue";
    import DesktopNavigationBar from "../../components/DesktopNavigationBar.vue";

    export default {
        name: "Owner-Account",

        components: {
            AccountHeader,
            // OwnerProfileDetails,
            LogOutUser,
            NavigationBar,
            DesktopNavigationBar
        },

        data: function() {
            return {
                userAccountData: cookies.get("userData")
            }
        },
    }
</script>

<style scoped>
    section {
        display: grid;
        place-items: center;
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
        grid-template-columns: 3.5fr 1fr;
        text-decoration: none;
        border-bottom: 1px solid rgba(211, 211, 211, 0.3);
        padding: 2vh 0vh;
    }

    #deleteAccountButton {
        border: 1px solid rgba(99, 109, 110, 0.6);
        margin-top: 3vh;
        padding: 3%;
        width: 90vw;
        justify-self: center;
        text-align: center;
    }

    #backIcon {
        align-self: center;
        justify-self: center;
        color: #636D6E;
    }

    div {
        display: grid;
        row-gap: 10px;
        padding: 0vw 7vw;
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

    #ownerProfile, #desktopNavBar {
        display: none;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
        
        section {
            width: 85vw;
            margin-left: 15vw;
        }

        .updateInput {
            grid-template-columns: 5fr 1fr;
        }

        div, .passwordAndDelete {
            padding: 1vw 5vw;
        }

        h4, p {
            font-size: 1.1rem;
        }

        p {
            font-weight: 300;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
        
        section {
            width: 90vw;
            margin-left: 10vw;
        }

        div, .passwordAndDelete {
            padding: 1vw 4vw;
        }

        h4, p {
            font-size: 1.1rem;
        }

        p {
            font-weight: 300;
        }

        .updateInput {
            grid-template-columns: 6fr 1fr;
        }
    }

    @media only screen and (min-width: 1024px) {

        #mobileAndTabletNavBar {
            display: none;
        }

        #ownerProfile, #desktopNavBar {
            display: grid;
        }

        section {
            width: 73.5vw;
            margin-left: 25vw;
        }

        div, .passwordAndDelete {
            padding: 1vw 4vw;
        }

        h4, p {
            font-size: 0.8rem;
        }

        .updateInput {
            grid-template-columns: 6fr 1fr;
        }
    }
</style>