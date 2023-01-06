<template>
  <component
    :is="baseComponent"
    :to="link.path ? link.path : '/'"
    class="nav-item"
    :class="{ active: isActive }"
    tag="li"
  >
    <a
      v-if="isMenu"
      :href="'#' + link.name"
      class="sidebar-menu-item nav-link"
      :aria-expanded="isActive"
      data-toggle="collapse"
      @click.prevent="collapseMenu"
      role="button"
      :aria-controls="link.name"
    >
      <template v-if="addLink">
        <span class="nav-link-text">
          {{ link.name }} <b class="caret"></b>
        </span>
      </template>
      <template v-else>
        <i :class="link.icon"></i>
        <span class="nav-link-text">{{ link.name }} <b class="caret"></b></span>
      </template>
    </a>

    <div
      v-if="this.$slots.default || this.isMenu"
      :id="link.name"
      class="collapse"
      :class="{ show: isActive }"
    >
      <ul class="nav nav-sm flex-column">
        <slot></slot>
      </ul>
    </div>

    <slot
      name="title"
      v-if="children.length === 0 && !$slots.default && link.path"
    >
      <component
        :to="link.path"
        @click="linkClick"
        :is="elementType(link, false)"
        class="nav-link"
        :class="{ active: link.active }"
        :target="link.target"
        :href="link.path"
      >
        <template v-if="addLink">
          <span class="nav-link-text">{{ link.name }}</span>
        </template>
        <template v-else>
          <i :class="link.icon"></i>
          <span class="nav-link-text">{{ link.name }}</span>
        </template>
      </component>
    </slot>
  </component>
</template>
<script>
export default {
  name: "sidebar-item",
  props: {
    menu: {
      type: Boolean,
      default: false,
      description:
        "Whether the item is a menu. Most of the item it's not used and should be used only if you want to override the default behavior.",
    },
    link: {
      type: Object,
      default: () => {
        return {
          name: "",
          path: "",
          children: [],
        };
      },
      description:
        "Sidebar link. Can contain name, path, icon and other attributes. See examples for more info",
    },
  },
  provide() {
    return {
      addLink: this.addChild,
      removeLink: this.removeChild,
    };
  },
  inject: {
    addLink: { default: null },
    removeLink: { default: null },
    autoClose: {
      default: true,
    },
  },
  data() {
    return {
      children: [],
      collapsed: true,
    };
  },
  computed: {
    baseComponent() {
      return this.isMenu || this.link.isRoute ? "li" : "router-link";
    },
    linkPrefix() {
      if (this.link.name) {
        let words = this.link.name.split(" ");
        return words.map((word) => word.substring(0, 1)).join("");
      }
      return "";
    },
    isMenu() {
      return this.children.length > 0 || this.menu === true;
    },
    isActive() {
      if (this.$route && this.$route.path) {
        let matchingRoute = this.children.find((c) =>
          this.$route.path.startsWith(c.link.path)
        );
        if (matchingRoute !== undefined) {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    addChild(item) {
      const index = this.$slots.default().indexOf(item.$vnode);
      this.children.splice(index, 0, item);
    },
    removeChild(item) {
      const tabs = this.children;
      const index = tabs.indexOf(item);
      tabs.splice(index, 1);
    },
    elementType(link, isParent = true) {
      if (link.isRoute === false) {
        return isParent ? "li" : "a";
      } else {
        return "router-link";
      }
    },
    linkAbbreviation(name) {
      const matches = name.match(/\b(\w)/g);
      return matches.join("");
    },
    linkClick() {
      if (
        this.autoClose &&
        this.$sidebar &&
        this.$sidebar.showSidebar === true
      ) {
        this.$sidebar.displaySidebar(false);
      }
    },
    collapseMenu() {
      this.collapsed = !this.collapsed;
    },
    collapseSubMenu(link) {
      link.collapsed = !link.collapsed;
    },
  },
  mounted() {
    if (this.addLink) {
      this.addLink(this);
    }
    if (this.link.collapsed !== undefined) {
      this.collapsed = this.link.collapsed;
    }
    if (this.isActive && this.isMenu) {
      this.collapsed = false;
    }
  },
  unmounted() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    if (this.removeLink) {
      this.removeLink(this);
    }
  },
};
</script>
<style>
a.active.router-link-exact-active.nav-link {
  background: #e6c0ff !important;
}
a.active.router-link-exact-active.page-item-link {
  text-decoration: underline white;
}

.navbar-light .navbar-nav .nav-link.active {
  color: rgb(0, 0, 0) !important;
}
.navbar-light .navbar-nav .nav-link.active .text-blue {
  color: #000000 !important;
}
.sidebar-menu-item {
  cursor: pointer;
}
.sidebar ul.links__nav {
  margin-top: 0;
  padding-top: 10px;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
  height: auto !important;
}

.slide-fade-leave-active {
  transition: all 0.8s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  height: 0 !important;
}

.navbar-dark .sidebar-menu-item.active .nav-link-text {
  color: black;
}
.nav-link {
  font-family: "Poppins", sans-serif !important;
}
</style>
