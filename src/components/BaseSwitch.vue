<template>
  <label class="custom-toggle" :class="switchClass">
    <input type="checkbox" v-model="model" />
    <span
      class="custom-toggle-slider rounded-circle"
      :data-label-off="offText"
      :data-label-on="onText"
    >
    </span>
  </label>
</template>
<script>
export default {
  name: "base-switch",
  props: {
    modelValue: [Array, Boolean],
    type: String,
    onText: {
      type: String,
      default: "Yes",
    },
    offText: {
      type: String,
      default: "No",
    },
  },
  computed: {
    switchClass() {
      let baseClass = "custom-toggle-";
      if (this.type) {
        return baseClass + this.type;
      }
      return "";
    },
    model: {
      get() {
        return this.modelValue;
      },
      set(modelValue) {
        this.$emit("input", modelValue);
      },
    },
  },
  methods: {
    triggerToggle() {
      this.model = !this.model;
    },
  },
};
</script>
<style></style>
