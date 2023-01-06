<template>
  <div class="card card-profile" v-if="users.length">
    <img
      src="img/theme/img-1-1000x600.jpg"
      alt="Image placeholder"
      class="card-img-top"
    />

    <div class="row justify-content-center">
      <div class="col-lg-3 order-lg-2">
        <div class="card-profile-image">
          <a href="#">
            <img src="img/users pic/z.jpeg" class="rounded-circle" />
          </a>
        </div>
      </div>
    </div>

    <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
      <div class="d-flex justify-content-between"></div>
    </div>

    <div class="card-body pt-0">
      <div class="row">
        <div class="col">
          <div class="card-profile-stats d-flex justify-content-center"></div>
        </div>
      </div>
      <div class="text-center">
        <h5 class="h3">
          {{ users[0].fullName }}<span class="font-weight-light">, 27</span>
        </h5>
        <div style="font-weight: bold">ID {{ users[0]._id.slice(4, 8) }}</div>
        <div class="h5 font-weight-300">
          <h3 style="color: grey">{{ users[0].position }}</h3>
        </div>
        <hr />
        <div class="user-contact-info">
          <div><i class="fa-regular fa-envelope"></i></div>
          <div>
            <p class="user-email">{{ users[0].email }}</p>
          </div>
        </div>
        <div class="user-contact-info">
          <div><i class="fa-solid fa-phone"></i></div>
          <div>
            <p class="user-email">+91 {{ users[0].number }}</p>
          </div>
        </div>
        <div class="user-contact-info">
          <div><i class="fa fa-globe"></i></div>
          <div><p class="user-email">GMT +05:30</p></div>
        </div>
        <hr />
        <div class="user-department-info">
          <div><p style="margin: 0">DEPARTMENT</p></div>
          <div><h4>Software Developer</h4></div>
        </div>
        <div class="user-department-info">
          <div><p style="margin: 0">OFFICE</p></div>
          <div>
            <h4>{{ users[0].office }}</h4>
          </div>
        </div>
        <div class="user-department-info">
          <div><p style="margin: 0">LINE MANAGER</p></div>
          <div>
            <h4>@{{ users[0].manager }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async getMyProfile() {
      await axios
        .get(
          `http://localhost:7000/myprofile/${
            JSON.parse(localStorage.getItem("user"))._id
          }`
        )
        .then((response) => {
          this.users.push(response.data);
        });
    },
  },
  mounted() {
    this.getMyProfile();
  },
};
</script>
<style>
.user-contact-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
.user-department-info {
  display: flex;
  flex-direction: column;
}
.user-email {
  margin: 0;
}
</style>
