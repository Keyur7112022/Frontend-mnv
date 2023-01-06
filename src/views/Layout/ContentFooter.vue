<template>
  <footer class="footer px-4 mx-2">
    <div>
      <div>
        <div class="copyright text-right text-lg-right text-muted">
          © {{ year }}
          <a
            href="https://www.creative-tim.com"
            class="font-weight-bold ml-1"
            target="_blank"
            >Crafted by Infinity group ♾️
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style></style>
