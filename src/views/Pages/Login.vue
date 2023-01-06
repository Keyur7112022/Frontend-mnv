<template>
  <div class="custom-gradient">
    <!-- Header -->
    <div class="header py-5 py-lg-5 pt-lg-7">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="text-white">Sign In to account</h1>
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
      </div>-->
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <!-- Table -->
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-8">
          <div class="card bg-secondary border-0">
            <!-- <div class="card-header bg-transparent">
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
                <small>sign In with credentials</small>
              </div>
              <div class="register-container">
                <div class="w-100 mb-4">
                  <el-input
                    prefix-icon="fa fa-envelope"
                    autocomplete="email"
                    placeholder="Email"
                    type="email"
                    name="email"
                    v-model="model.email"
                  />
                </div>
                <div class="w-100 mb-4">
                  <el-input
                    prefix-icon="fa fa-lock"
                    type="password"
                    name="password"
                    placeholder="Password"
                    v-model="model.password"
                  />
                </div>
                <div class="mb-2">
                  <router-link to="/forgotpassword">
                    <a class="customhover"><small>Forgot password?</small></a>
                  </router-link>
                </div>
                <div class="error">{{ model.error }}</div>
                <div class="btn-input">
                  <button @click="login">Login</button>
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
// import { Form } from "vee-validate";
// import * as Yup from "yup";
import Authentication from "../../services/Authentication";

import { ElInput } from "element-plus";
export default {
  name: "login",
  components: {
    ElInput,
  },
  data() {
    return {
      showModal: "",
      model: {
        email: "",
        password: "",
        agree: false,
        error: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        const response = await Authentication.login({
          email: this.model.email,
          password: this.model.password,
        });

        if (response.data != null) {
          if (response.data == "user not found") {
            this.model.error = "email not found";
          } else {
            this.$router.push("/dashboard");
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data));
            this.model.error = "";
          }
        }
      } catch (err) {
        this.model.error = "Invalid email/password";
        console.log(this.model.error);
      }
    },
    doSomething(event) {
      console.log(event);
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
<style>
@import url("//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css");
*:focus {
  outline: none;
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.custom-gradient {
  background: linear-gradient(-45deg, #ee7752, #c03369, #a83eff, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 10s ease infinite;
  height: 100vh;
}

.customhover :hover {
  cursor: pointer;
}

.register-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  min-width: 50px;
}
.email-input,
.password-input {
  background-color: white;
  margin: 5px 0;
  display: flex;
  justify-items: center;
  align-items: center;
  padding: 3px;
  box-shadow: 0 1px 2px rgb(155, 154, 154);
}

.btn-input button {
  margin-top: 10px;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 15px;
  border: none;
  color: white;
  background-color: rgb(94, 114, 228);
  transition: all 0.3s;
}
.btn-input button:hover {
  cursor: pointer;
  box-shadow: 2px 2px 3px rgb(92, 92, 92);
  background-color: rgb(37, 86, 170);
  font-weight: 400;
}
.register-form {
  background-color: white;
}
.error {
  color: red;
}

.alert {
  position: relative;
  width: 300px;
  min-height: 100px;
  margin-top: 50px;
  border: 1px solid #666;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: 20px 30px;
}

.audun_success {
  display: inline-block;
  letter-spacing: 0.2ch;
  font-size: 15px;
  color: #ffffff;
  background-color: #7ddf7c;
  font-family: "Source Sans Pro", sans-serif;
  border-radius: 0.5em;
  border: 1px solid;
  margin: 10px 0px;
  padding: 12px;
  width: 400px;
}
.user-login p {
  color: black;
  margin-top: 5px;
  font-size: 15px;
}
.signup-span {
  text-decoration: underline;
  color: rgb(94, 114, 228);
  transition: all 0.3s;
}
.signup-span:hover {
  cursor: pointer;
  color: rgb(37, 86, 170);
  font-weight: bold;
}
</style>
