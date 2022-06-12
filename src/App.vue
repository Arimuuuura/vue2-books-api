<template>
  <v-app>
    <HeaderView/>

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
    <FooterView />
  </v-app>
</template>

<script>
import HeaderView from '@/global/HeaderView.vue'
import FooterView from '@/global/FooterView.vue'

export default {
  name: 'App',
  components: {
    HeaderView,
    FooterView
  },

  data: () => ({
    //
  }),
};
</script>
