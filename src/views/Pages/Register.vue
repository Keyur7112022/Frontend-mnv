<template>
  <div class="custom-gradient">
    <!-- Header -->
    <div class="header py-5 py-lg-5 pt-lg-7">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="text-white">Create an account</h1>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="separator separator-bottom separator-skew zindex-100">
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
      </div> -->
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <!-- Table -->
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-8">
          <div class="card border-0">
            <!-- <div class="card-header bg-transparent pb-4">
              <div class="text-muted text-center mt-2 mb-4">
                <small>Sign up with</small>
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
            </div> -->
            <div class="card-body px-lg-4 py-lg-4">
              <div class="text-center text-muted mb-2">
                <small>sign up with credentials</small>
              </div>
              <Form @submit="onSubmit" :validation-schema="schema">
                <div class="register-container">
                  <div class="w-100">
                    <base-input
                      addon-left-icon="ni ni-hat-3"
                      name="fullName"
                      placeholder="Name"
                    />
                  </div>
                  <div class="w-100">
                    <base-input
                      addon-left-icon="ni ni-email-83"
                      placeholder="Email"
                      name="email"
                    >
                    </base-input>
                  </div>

                  <div class="w-100">
                    <base-input
                      addon-left-icon="ni ni-lock-circle-open"
                      placeholder="Password"
                      type="password"
                      name="password"
                    >
                    </base-input>
                  </div>
                  <div
                    v-html="model.err"
                    style="color: red; text-align: center"
                  ></div>
                  <div
                    v-html="model.alert"
                    style="color: green; text-align: center"
                  ></div>

                  <div class="text-center">
                    <button type="submit" class="btn btn-primary">
                      Create account
                    </button>
                  </div>
                  <div class="user-login" style="text-align: center">
                    <p>
                      Already have Account?
                      <router-link to="/login">
                        <span class="signup-span">Login</span>
                      </router-link>
                    </p>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Form } from "vee-validate";
import * as Yup from "yup";
import Authentication from "../../services/Authentication";
export default {
  name: "register",
  components: {
    Form,
  },
  methods: {
    async onSubmit(values) {
      const name = values.fullName;
      const email = values.email;
      const password = values.password;
      try {
        const response = await Authentication.register({
          fullName: name,
          email: email,
          password: password,
        });
        if (response.data == "user exist") {
          this.model.err = "user already exist!";
          this.model.alert = await null;
        } else if (response.data == "domain already exist") {
          this.model.err = "domain already exist!";
          this.model.alert = await null;
        } else {
          this.model.err = await null;
          this.model.alert = await "signup successful";
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      model: {
        name: "",
        email: "",
        password: "",
        agree: false,
        err: null,
        alert: null,
      },
    };
  },
  setup() {
    const schema = Yup.object().shape({
      fullName: Yup.string().required().label("The Full Name"),
      email: Yup.string().email().required().label("The Email"),
      password: Yup.string().min(5).required().label("The Password"),
    });

    return {
      schema,
    };
  },
};
</script>
<style></style>
