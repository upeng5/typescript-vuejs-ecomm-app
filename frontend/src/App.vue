<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view/>
    </v-main>
    <v-footer color="deep-purple darken-1 py-5">
      <div class="mx-auto">
        <h4 class="white--text">upeng5</h4>
      </div>
      <!-- LINKEDIN URL:  www.linkedin.com/in/moismail-upeng5 -->
      <v-btn medium color="my-secondary-button" @click="redirect">Linkedin</v-btn>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: 'App',
  components: {
    Navbar
  },

  data: () => ({
    //
  }),
  methods: {
    redirect() {
      window.location.href = "{LINKEDIN_LINK}";
    }
  }
};
</script>

<style>
/* Global styles */
.bg-purple {
  background: #5E35B1;
}

.text-purple {
  color: #5E35B1;
}

.my-form {
  background: #5E35B1;
  padding: 20px 20px;
  border-radius: 15px;
}

.my-secondary-button {
    color: #5E35B1 !important;
    background: #fff !important;
}

.my-secondary-button-navbar {
    color: #5E35B1 !important;
    background: #fff !important;
    margin-top: 11px;
    margin-left: 10px;
}
</style>
