<template>
  <div style="flex: 2">
    <card>
      <template v-slot:header>
        <div class="row align-items-center">
          <div class="col-8">
            <h3 class="mb-0">My Profile</h3>
          </div>
          <div
            v-if="hide"
            class="col-4 text-right"
            @click="
              hide = false;
              edit = false;
            "
          >
            <a
              class="btn btn-sm"
              type="primary"
              style="
                width: 70px;
                font-size: 15px;
                background-color: rgb(54, 134, 255);
                color: white;
              "
              >Edit</a
            >
          </div>
        </div>
      </template>

      <div v-if="edit && users.length">
        <div>
          <h3>
            <i class="fa-solid fa-user-tie text-blue p-1 mr-1"></i>Personal
            Details
          </h3>
        </div>
        <div class="information">
          <div style="flex: 1">
            <p>Name:</p>
            <p>Email:</p>
            <p>Date of Birth:</p>
            <p>Number:</p>
          </div>
          <div style="flex: 2">
            <p>
              <span class="user-info">{{ users[0].fullName }}</span>
            </p>
            <p>
              <span class="user-info">{{ users[0].email }}</span>
            </p>
            <p>
              <span class="user-info">{{
                users[0].Info.DOB
                  ? $dayjs(users[0].Info.DOB).format("DD-MM-YYYY")
                  : "-"
              }}</span>
            </p>
            <p>
              <span class="user-info">{{ users[0].number }}</span>
            </p>
          </div>
          <div style="flex: 1">
            <p>Gender:</p>
            <p>Blood group:</p>
            <p>Nationality:</p>
            <p>Marital Status:</p>
          </div>
          <div style="flex: 2">
            <p>
              <span class="user-info">{{ users[0].Info.Gender }}</span>
            </p>
            <p><span class="user-info">B&plus;</span></p>
            <p><span class="user-info">Indian</span></p>
            <p><span class="user-info"></span></p>
          </div>
        </div>
        <hr />
        <div>
          <h3>
            <i class="fa-solid fa-location-crosshairs text-blue p-1 mr-1"></i
            >Address
          </h3>
        </div>
        <div class="information">
          <div style="flex: 1">
            <p>Primary Address:</p>

            <p>Permanent Address:</p>
          </div>
          <div style="flex: 2">
            <p>
              <span class="user-info">{{ users[0].Info.Address.Address }}</span>
            </p>

            <p>
              <span class="user-info">{{ users[0].Info.Address.Address }}</span>
            </p>
          </div>
          <div style="flex: 1">
            <p>City:</p>
            <p>State/Province:</p>
            <p>Country:</p>
            <p>Postal:</p>
          </div>
          <div style="flex: 2">
            <p>
              <span class="user-info">{{ users[0].Info.Address.City }}</span>
            </p>
            <p>
              <span class="user-info">{{ users[0].Info.Address.City }}</span>
            </p>
            <p>
              <span class="user-info">{{ users[0].Info.Address.Country }}</span>
            </p>
            <p>
              <span class="user-info">{{ users[0].Info.Address.Postal }}</span>
            </p>
          </div>
        </div>
        <hr />
        <div>
          <h3>
            <i class="fa-solid fa-building-columns text-blue p-1 mr-1"></i>Bank
            Details
          </h3>
        </div>
        <div class="information">
          <div style="flex: 1">
            <p>Bank Name:</p>
            <p>Account Name:</p>
            <p>Account Number:</p>
            <p>Branch:</p>
          </div>
          <div style="flex: 2">
            <p>
              <span class="user-info">{{ users[0].Info.Bank.Bank_name }}</span>
            </p>
            <p>
              <span class="user-info">{{
                users[0].Info.Bank.Account_name
              }}</span>
            </p>
            <p>
              <span class="user-info">{{ users[0].Info.Bank.Account_no }}</span>
            </p>

            <p>
              <span class="user-info">{{ users[0].Info.Bank.Branch }}</span>
            </p>
          </div>
        </div>
      </div>

      <Form @submit="updateProfile" :validation-schema="schema" v-if="!edit">
        <h6 class="heading-small text-muted mb-4">Personal information</h6>
        <div class="form-row">
          <div class="col-md-6">
            <base-input
              label="First name"
              name="FirstName"
              placeholder="First name"
              rules="required"
              v-model:value="firstName"
            >
            </base-input>
          </div>

          <div class="col-md-6">
            <base-input
              label="Last name"
              name="LastName"
              placeholder="Last name"
              rules="required"
              success-message="Looks good!"
              v-model:value="lastName"
            >
            </base-input>
          </div>
          <div class="col-md-4">
            <base-input
              label="Contact No."
              name="number"
              placeholder="Mobile No."
              rules="required"
              v-model:value="number"
            >
            </base-input>
          </div>

          <div class="col-md-6">
            <base-input label="Date of birth" name="DOB">
              <el-date-picker v-model="DOB" type="date" placeholder="Date"
            /></base-input>
          </div>
          <div class="col-md-4">
            <base-input label="Gender" name="Gender">
              <el-select placeholder="Gender" v-model="Gender" size="large">
                <el-option label="Male" value="Male" />
                <el-option label="Female" value="Female" />
                <el-option label="Other" value="Other" /> </el-select
            ></base-input>
          </div>
        </div>
        <hr />
        <h6 class="heading-small text-muted mb-4">Address</h6>
        <div class="form-row">
          <div class="col-md-6">
            <base-input
              label="Address"
              name="Address"
              placeholder="Address"
              rules="required"
              v-model:value="Address"
            >
            </base-input>
          </div>
          <div class="col-md-6">
            <base-input
              label="City"
              name="City"
              placeholder="City"
              rules="required"
              v-model:value="City"
            >
            </base-input>
          </div>
          <div class="col-md-3">
            <base-input
              label="Country"
              name="Country"
              placeholder="Country"
              rules="required"
              v-model:value="Country"
            >
            </base-input>
          </div>
          <div class="col-md-3">
            <base-input
              label="Postal"
              name="Postal"
              placeholder="Postal"
              rules="required"
              v-model:value="Postal"
            >
            </base-input>
          </div>
        </div>

        <hr />
        <h6 class="heading-small text-muted mb-4">Bank Details</h6>
        <div class="form-row">
          <div class="col-md-6">
            <base-input
              label="Bank Name"
              name="Bank_name"
              placeholder="Bank Name"
              rules="required"
              v-model:value="Bank_name"
            >
            </base-input>
          </div>
          <div class="col-md-6">
            <base-input
              label="Account Name"
              name="Account_name"
              placeholder="Name"
              rules="required"
              v-model:value="Account_name"
            >
            </base-input>
          </div>
          <div class="col-md-6">
            <base-input
              label="Account Number"
              name="Account_no"
              placeholder="Account Number"
              rules="required"
              v-model:value="Account_no"
            >
            </base-input>
          </div>

          <div class="col-md-6">
            <base-input
              label="Branch"
              name="Branch"
              placeholder="Branch"
              rules="required"
              v-model:value="Branch"
            >
            </base-input>
          </div>
        </div>

        <base-button type="primary" native-type="submit">Submit</base-button>
        <base-button type="danger" @click="(edit = true), (hide = true)"
          >Cancel</base-button
        >
      </Form>
    </card>
  </div>

  <!-- user profile -->
  <div style="flex: 1">
    <div class="card card-profile" v-if="users.length">
      <img
        src="img/theme/img-1-1000x600.jpg"
        alt="Image placeholder"
        class="card-img-top"
      />

      <div class="row justify-content-center">
        <div class="col-lg-3 order-lg-2">
          <div class="card-profile-image">
            <img
              class="profilepic__image"
              id="mypic"
              :src="img ? img : 'userpic.jpeg'"
            />
            <div class="profilepic__content">
              <span class="profilepic__icon">
                <label for="inputTag">
                  <i class="fa fa-camera fa-2x"></i>
                </label>

                <input
                  id="inputTag"
                  type="file"
                  ref="file"
                  @change="onSubmit"
                />
              </span>
            </div>
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
          <h2>
            {{ users[0].fullName
            }}<span class="font-weight-light">
              {{ age ? ", " + age : null }}</span
            >
          </h2>
          <div style="font-weight: bold">ID{{ users[0]._id.slice(4, 8) }}</div>
          <div class="h5 font-weight-300">
            <h3 style="color: grey">{{ users[0].position }}</h3>
          </div>
          <hr />
          <div class="user-contact-info">
            <div><i class="fa-regular fa-envelope"></i></div>
            <div>
              <h4 class="user-email">{{ users[0].email }}</h4>
            </div>
          </div>

          <div class="user-contact-info">
            <div><i class="fa-solid fa-phone"></i></div>
            <div>
              <h4 class="user-email">
                +91 {{ users[0].number ? users[0].number : "-" }}
              </h4>
            </div>
          </div>
          <div class="user-contact-info">
            <div>
              <i class="fa fa-globe"></i>
            </div>
            <div><h4 class="user-email">GMT +05:30</h4></div>
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
  </div>
</template>
<script>
import * as Yup from "yup";
import { Form } from "vee-validate";
import axios from "axios";
import { ElSelect, ElOption, ElDatePicker } from "element-plus";
// import DropzoneFileUpload from "@/components/Inputs/DropzoneFileUpload";
export default {
  components: {
    Form,
    ElSelect,
    ElOption,
    ElDatePicker,
    // DropzoneFileUpload,
  },
  data() {
    return {
      empty: " ",
      hide: true,
      edit: true,
      firstName: "",
      Gender: "",
      DOB: "",
      number: "",
      lastName: "",
      Address: "",
      Bank_name: "",
      Account_name: "",
      Account_no: "",
      Branch: "",
      City: "",
      Country: "",
      Postal: "",
      users: [],
      name: "",
      img: "",
    };
  },
  methods: {
    onSelect() {},
    async onSubmit() {
      const file = this.$refs.file.files[0];
      this.file = file;
      const formData = new FormData();
      formData.append("recfile", this.file);
      try {
        await axios.post(
          `http://localhost:7000/upload/${
            JSON.parse(localStorage.getItem("user"))._id
          }`,
          formData
        );
        this.message = "Uploaded !! ";
        await this.getMyProfile();
      } catch (err) {
        console.tog(err);
        this.message = "Something went wrong !! ";
      }
    },
    async selectFile() {
      var formdata = new FormData();
      await formdata.append("recfile", this.$("#input-image").files[0]).ajax({
        method: "POST",
        processData: false,
        contentType: false,
        url: `http://localhost:7000/upload/${
          JSON.parse(localStorage.getItem("user"))._id
        }`,
        data: formdata,
      });
    },
    async getMyProfile() {
      this.img = JSON.parse(localStorage.getItem("user")).profile_pic;
      this.users = [];
      await axios
        .get(
          `http://localhost:7000/myprofile/${
            JSON.parse(localStorage.getItem("user"))._id
          }`
        )
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          (this.name = response.data.fullName.split(" ")),
            (this.firstName = this.name[0]),
            (this.lastName = this.name[1]),
            (this.DOB = response.data.Info.DOB),
            (this.number = response.data.number),
            (this.Gender = response.data.Info.Gender),
            (this.Address = response.data.Info.Address.Address),
            (this.City = response.data.Info.Address.City),
            (this.Country = response.data.Info.Address.Country),
            (this.Postal = response.data.Info.Address.Postal),
            (this.Bank_name = response.data.Info.Bank.Bank_name),
            (this.Account_name = response.data.Info.Bank.Account_name),
            (this.Account_no = response.data.Info.Bank.Account_no),
            (this.Branch = response.data.Info.Bank.Branch),
            this.users.push(response.data);
          this.img = response.data.profile_pic;

          const byear = this.$dayjs(this.DOB);

          const cyear = this.$dayjs();
          this.age = cyear.diff(byear, "year");
        });

      console.log(this.age);
    },

    updateProfile(values) {
      this.edit = true;
      this.hide = true;
      axios
        .post(
          `http://localhost:7000/updateprofile/${
            JSON.parse(localStorage.getItem("user"))._id
          }`,
          {
            fullName: values.FirstName + this.empty + values.LastName,
            number: values.number,
            Gender: this.Gender,
            DOB: this.DOB,
            Address: values.Address,
            Country: values.Country,
            Postal: values.Postal,
            Bank_name: values.Bank_name,
            Account_name: values.Account_name,
            Account_no: values.Account_no,
            Branch: values.Branch,
            City: values.City,
          }
        )
        .then((resp) => {
          console.log(resp.data);
          localStorage.setItem("user", JSON.stringify(resp.data));
          this.getMyProfile();
        });
    },
  },
  mounted() {
    this.getMyProfile();
  },
  setup() {
    const schema = Yup.object().shape({
      FirstName: Yup.string().required().label("The Full Name"),
      LastName: Yup.string().required().label("The Last Name"),
      number: Yup.number().min(10).required().label("The Number"),

      City: Yup.string().required().label("The City"),
      Postal: Yup.string().required().label("The Postal"),
      Country: Yup.string().required().label("The Country"),
      Address: Yup.string().required().label("The Address"),
      Bank_name: Yup.string().required().label("The Bank Name"),

      Account_name: Yup.string().required().label("The Account name"),
      Account_no: Yup.number().required().label("The Account no"),
      Branch: Yup.string().required().label("The Branch"),
    });

    return {
      schema,
    };
  },
};
</script>
<style scoped>
.profilepic__icon > input {
  display: none;
}

.card-profile-image:hover .profilepic__content {
  opacity: 1;
}

.profilepic__image {
  object-fit: cover;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
}

.profilepic__content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgb(0, 0, 0);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.profilepic__icon {
  color: white;
  padding-bottom: 8px;
}

.fas {
  font-size: 20px;
}

.information {
  display: flex;
}
p {
  font-family: sans-serif;
  font-weight: 500;
  font-size: 14px;
}
.user-info {
  font-size: 14px;
  font-family: Calibri, "Times New Roman", serif;
  font-weight: bold;
}

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
