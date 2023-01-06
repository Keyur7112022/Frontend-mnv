<template>
  <div
    class="alert alert-dismissible d-flex"
    :class="'alert-' + type"
    data-notify="container"
  >
    <button type="button" data-dismiss="alert" aria-label="Close" class="close">
      <span aria-hidden="true">×</span>
    </button>
    <span
      data-notify="icon"
      class="alert-icon"
      v-if="icon && !ownIcon"
      :class="icon"
    ></span>
    <span data-notify="icon" class="alert-icon" v-else :class="ownIcon"></span>
    <span data-notify="message" v-if="text && !ownText" v-html="text"></span>
    <span data-notify="message" v-else v-html="ownText"></span>
  </div>
</template>
<script>
export default {
  name: "notification",
  props: {
    ownText: String,
    text: String,
    type: String,
    icon: String,
    ownIcon: String,
  },
};
</script>
<style lang="scss"></style>
