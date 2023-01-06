<template>
  <div class="card">
    <!-- Card header -->
    <div class="card-header">
      <!-- Title -->
      <h5 class="h3 mb-0">Team members</h5>
    </div>
    <!-- Card search -->
    <div class="card-header py-0">
      <!-- Search form -->
      <form>
        <div class="form-group mb-0">
          <base-input
            name="search"
            class="input-group-lg input-group-flush my-2"
            addon-left-icon="fas fa-search"
            placeholder="Search"
            type=""
          >
          </base-input>
        </div>
      </form>
    </div>
    <!-- Card body -->
    <div class="card-body">
      <!-- List group -->
      <ul class="list-group list-group-flush list my--3">
        <li
          v-for="member in members"
          :key="member.image"
          class="list-group-item px-0"
        >
          <div class="row align-items-center">
            <div class="col-auto">
              <!-- Avatar -->
              <a href="#" class="avatar rounded-circle">
                <img alt="Image placeholder" :src="member.image" />
              </a>
            </div>
            <div class="col ml--2">
              <h4 class="mb-0">
                <a href="#!">{{ member.name }}</a>
              </h4>
              <span :class="`text-${member.statusType}`">● </span>
              <small>{{ member.status }}</small>
            </div>
            <div class="col-auto">
              <button type="button" class="btn btn-sm btn-primary">Add</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "members-card",
  props: {
    showSearch: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      membersSearch: "",
      members: [
        {
          name: "John Michael",
          status: "Online",
          statusType: "success",
          image: "img/theme/team-1.jpg",
        },
        {
          name: "Alex Smith",
          status: "In a meeting",
          statusType: "danger",
          image: "img/theme/team-2.jpg",
        },
        {
          name: "Samantha Ivy",
          status: "Offline",
          statusType: "danger",
          image: "img/theme/team-3.jpg",
        },
        {
          name: "John Michael",
          status: "Online",
          statusType: "success",
          image: "img/theme/team-4.jpg",
        },
        {
          name: "John Snow",
          status: "Online",
          statusType: "success",
          image: "img/theme/team-5.jpg",
        },
      ],
    };
  },
};
</script>
