<template>
  <div class="custom-gradient">
    <!-- Header -->
    <div class="header py-5 py-lg-5 pt-lg-7">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="text-white">Forgot Password?</h1>
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
          <div class="card bg-secondary border-0">
            <div class="card-header bg-transparent">
              <div class="text-center m-1">
                <p>Enter registered emaill</p>
              </div>
            </div>
            <div class="card-body px-lg-4 py-lg-4">
              <div class="register-container">
                <div class="w-100 mb-4">
                  <el-input
                    v-model="forgotpass"
                    prefix-icon="ni ni-email-83"
                    placeholder="Email"
                    name="email"
                  >
                  </el-input>
                </div>

                <div
                  v-html="model.err"
                  style="color: red; text-align: center"
                ></div>
                <div
                  v-html="model.alert"
                  style="color: green; text-align: center"
                ></div>
                <div class="m-1">
                  <span class="text-red">{{ alert }}</span>
                </div>

                <div class="text-center">
                  <button @click="sendForgotMail" class="btn btn-primary">
                    Send reset link
                  </button>
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
import { ElInput } from "element-plus";
import axios from "axios";

export default {
  name: "lock",
  components: {
    ElInput,
  },
  data() {
    return {
      alert: null,
      forgotpass: "",
      model: {
        password: "",
      },
    };
  },
  methods: {
    sendForgotMail() {
      axios
        .post(`http://localhost:7000/forgot`, {
          email: this.forgotpass,
        })
        .then(() => {
          this.alert = "mail sent";
        });
    },
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
