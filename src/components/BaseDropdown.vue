<template>
  <component
    :is="tag"
    :class="[`drop${direction}`]"
    @click="toggleDropDown"
    v-click-outside="closeDropDown"
  >
    <slot name="title-container" :is-open="isOpen">
      <component
        :is="titleTag"
        class="btn-rotate"
        :class="[{ 'dropdown-toggle': hasToggle }, titleClasses]"
      >
        <slot name="title" :is-open="isOpen">
          <i :class="icon"></i> {{ title }}
        </slot>
      </component>
    </slot>
    <ul
      class="dropdown-menu"
      :class="[
        { show: isOpen },
        { 'dropdown-menu-right': menuOnRight },
        menuClasses,
      ]"
    >
      <slot></slot>
    </ul>
  </component>
</template>
<script>
export default {
  name: "base-dropdown",
  props: {
    tag: {
      type: String,
      default: "div",
      description: "Dropdown html tag (e.g div, ul etc)",
    },
    titleTag: {
      type: String,
      default: "button",
      description: "Dropdown title (toggle) html tag",
    },
    title: {
      type: String,
      description: "Dropdown title",
    },
    direction: {
      type: String,
      default: "down", // up | down
      description: "Dropdown menu direction (up|down)",
    },
    icon: {
      type: String,
      description: "Dropdown icon",
    },
    titleClasses: {
      type: [String, Object, Array],
      description: "Title css classes",
    },
    menuClasses: {
      type: [String, Object],
      description: "Menu css classes",
    },
    menuOnRight: {
      type: Boolean,
      description: "Whether menu should appear on the right",
    },
    hasToggle: {
      type: Boolean,
      description: "Whether dropdown has arrow icon shown",
      default: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleDropDown() {
      this.isOpen = !this.isOpen;
      this.$emit("change", this.isOpen);
      // event.stopPropagation();
      // let dropdowns = document.querySelectorAll('.dropdown-menu');
      // for(var i=0; i<dropdowns.length; i++){
      //   console.log(dropdowns[i].classList);
      //   dropdowns[i].classList.remove('show');
      // }
    },
    closeDropDown() {
      this.isOpen = false;
      this.$emit("change", false);
    },
  },
};
</script>
<style lang="scss" scoped>
.dropdown {
  cursor: pointer;
  user-select: none;
}
</style>
