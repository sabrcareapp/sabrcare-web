<template>
  <v-footer id="core-footer" absolute height="82">
    <div class="footer-items">
      <span v-for="link in links" :key="link.name">
        <a :href="link.Link" class="tertiary--text footer-links">{{ link.name }}</a>
      </span>
    </div>
    <v-spacer/>
    <span class="font-weight-light copyright">
      &copy;
      {{ (new Date()).getFullYear() }}
      <a
        href="http://www.example.com/"
        target="_blank"
      >Sabrcare</a>
    </span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      { name: "Home", Link: "/dashboard" },
      { name: "About Us", Link: "https://creative-tim.com/presentation" },
      { name: "Blog", Link: "https://blog.creative-tim.com" },
      { name: "Our Team", Link: "https://www.creative-tim.com" }
    ]
  })
};
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
