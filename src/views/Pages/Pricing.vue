<template>
  <div>
    <!-- Header -->
    <div
      class="header py-5 py-lg-5 pt-lg-7"
      style="
        background: url('g3.gif');
        background-repeat: no-repeat;
        background-size: cover;
      "
    >
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="text-white">Sign In to account</h1>
            </div>
          </div>
        </div>
      </div>

      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <div class="row justify-content-center">
        <div class="card"></div>
        <div class="card bg-secondary border-0">
          <div class="card-header bg-transparent pb-4">
            <div class="text-muted text-center mt-2 mb-4">
              <small>Sign In with</small>
            </div>
            <div class="text-center">
              <a href="#" class="btn btn-neutral btn-icon mr-4">
                <span class="btn-inner--icon"
                  ><img src="img/icons/common/github.svg"
                /></span>
                <span class="btn-inner--text">Github</span>
              </a>
              <a href="#" class="btn btn-neutral btn-icon">
                <span class="btn-inner--icon"
                  ><img src="img/icons/common/google.svg"
                /></span>
                <span class="btn-inner--text">Google</span>
              </a>
            </div>
          </div>
          <div class="card-body px-lg-4 py-lg-4">
            <div class="text-center text-muted mb-2">
              <small>Or sign In with credentials</small>
            </div>
            <div class="register-container">
              <div>
                <input class="custom" placeholder="Email" />
              </div>
              <div>
                <input class="custom" placeholder="Password" />
              </div>
              <div class="error">{{ model.error }}</div>
              <div style="margin-top: 10px">
                <button @click="login" class="btn-cutstom-input">Login</button>
              </div>
              <div class="user-login">
                <p>
                  New User?
                  <router-link to="/register">
                    <span class="signup-span">Signup</span>
                  </router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import BaseButton from "../../components/BaseButton.vue";
export default {
  name: "lock",
  data() {
    return {
      model: {
        password: "",
      },
    };
  },
};
</script>
<style scoped>
.custom {
  border: none;
  margin-bottom: 10px;
  padding: 5px 20px;
  box-shadow: 1px 1px 5px rgb(196, 196, 196);
  border-radius: 5px;
}

.custom::placeholder {
  font-size: 15px;
  font-family: sans-serif;
}

.btn-cutstom-input {
  border: none;
  border-radius: 40px;
  padding: 7px 20px;
  color: white;
  background-color: rgb(108, 91, 252);
}
</style>
