<template>
  <div class="world-map-container">
    <world-map v-bind="$attrs"></world-map>
  </div>
</template>
<script>
/*  We lazy load (async) the VectorMaps component because it contains 2 big libraries (jquery and jquery vector maps)
      If the component is not loaded within 200ms, we display a loading component in the meanwhile.
      This way, we don't bloat the main bundle with 2 unnecessary libs that we only need for this page :)
   */

import WorldMap from "@/components/WorldMap/WorldMap.vue";

export default {
  inheritAttrs: false,
  components: {
    WorldMap,
  },
};
</script>
<style>
.world-map-container {
  min-height: 500px;
}
</style>
