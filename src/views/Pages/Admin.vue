<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-5 py-lg-5 pt-lg-7">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="text-white">Sign In to account</h1>
              <div class="audun_success" v-if="model.alert">
                <div><i class="fa fa-check-circle" aria-hidden="true"></i></div>
                <div v-html="model.alert"></div>
              </div>
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
      <!-- Table -->
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8">
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
                <div class="email-input">
                  <i
                    class="fa-solid fa-envelope fa-xs"
                    style="margin: 0 5px"
                  ></i>
                  <input
                    class="input-form"
                    type="email"
                    name="email"
                    placeholder="Email"
                    v-model="model.email"
                  />
                </div>
                <div class="password-input">
                  <i class="fa-solid fa-lock fa-xs" style="margin: 0 5px"></i>
                  <input
                    class="input-form"
                    type="password"
                    name="password"
                    placeholder="Password"
                    v-model="model.password"
                  />
                </div>
                <div class="error" v-html="model.error"></div>
                <div class="btn-input">
                  <button @click="loginAdmin">Login</button>
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
  </div>
</template>

<script>
import axios from "axios";
// import { Form } from "vee-validate";
// import * as Yup from "yup";

export default {
  name: "login",
  // components: {
  //   Form,
  // },
  data() {
    return {
      showModal: "",
      model: {
        email: "",
        password: "",
        agree: false,
        error: null,
      },
    };
  },
  methods: {
    async loginAdmin() {
      axios
        .post("http://localhost:7000/login/admin", {
          email: this.model.email,
          password: this.model.password,
        })
        .then((response) => {
          this.$router.push("/dashboard");
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("user", JSON.stringify(response.data));

          this.model.error = null;
        })
        .catch(() => {
          this.model.error = "Invalid email/password";
          console.log(this.model.error);
        });
    },
  },
  // setup() {
  //   function onSubmit(values) {
  //     alert(JSON.stringify(values, null, 2));
  //   }

  //   // const schema = Yup.object().shape({
  //   //   fullName: Yup.string().required().label("The Full Name"),
  //   //   email: Yup.string().email().required().label("The Email"),
  //   //   password: Yup.string().min(5).required().label("The Password"),
  //   // });

  //   // return {
  //   //   onSubmit,
  //   //   schema,
  //   // };
  // },
};
</script>
<style></style>
