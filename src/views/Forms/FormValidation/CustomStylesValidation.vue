<template>
  <card>
    <!-- Card header -->
    <template v-slot:header>
      <h3 class="mb-0">Custom styles</h3>
    </template>
    <!-- Card body -->
    <div class="row">
      <div class="col-lg-8">
        <p class="mb-0">
          For custom form validation messages, you’ll need to provide error
          messages to your
          <code>&lt;base-input&gt;</code> components. This disables the browser
          default feedback tooltips, but still provides access to the form
          validation APIs in JavaScript. <br /><br />
          When attempting to submit, you’ll see the<code>.is-valid</code> and
          <code>.is-invalid</code> classes applied to your form controls.
        </p>
      </div>
    </div>
    <hr />
    <Form @submit="onSubmit" :validation-schema="schema">
      <div class="form-row">
        <div class="col-md-4">
          <base-input
            label="First name"
            name="FirstName"
            placeholder="First name"
            v-model="model.firstName"
          >
          </base-input>
        </div>

        <div class="col-md-4">
          <base-input
            label="Last name"
            name="LastName"
            placeholder="Last name"
            rules="required"
            success-message="Looks good!"
            v-model="model.lastName"
          >
          </base-input>
        </div>

        <div class="col-md-4">
          <base-input
            label="Username"
            name="Username"
            placeholder="Username"
            v-model="model.username"
          >
          </base-input>
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-6">
          <base-input
            label="City"
            name="City"
            placeholder="City"
            v-model="model.city"
          >
          </base-input>
        </div>
        <div class="col-md-3">
          <base-input
            label="State"
            name="State"
            placeholder="State"
            v-model="model.state"
          >
          </base-input>
        </div>
        <div class="col-md-3">
          <base-input
            label="Zip"
            name="Zip"
            placeholder="Zip"
            rules="required"
            v-model="model.zip"
          >
          </base-input>
        </div>
      </div>
      <base-input :rules="{ required: { allowFalse: false } }" name="Terms">
        <base-checkbox v-model="model.agree">
          Agree to terms and conditions
        </base-checkbox>
      </base-input>
      <base-button type="primary" native-type="submit">Submit form</base-button>
    </Form>
  </card>
</template>
<script>
import { Form } from "vee-validate";
import * as Yup from "yup";

export default {
  components: {
    Form,
  },
  data() {
    return {
      validated: false,
      model: {
        firstName: "Mark",
        lastName: "Otto",
        username: "",
        city: "",
        state: "",
        zip: "",
        agree: false,
      },
    };
  },
  setup() {
    function onSubmit(values) {
      alert(JSON.stringify(values, null, 2));
    }

    const schema = Yup.object().shape({
      FirstName: Yup.string().required().label("The Full Name"),
      LastName: Yup.string().required().label("The Last Name"),
      Username: Yup.string().required().label("Username"),
      City: Yup.string().required().label("The City"),
      State: Yup.string().required().label("The State"),
      Zip: Yup.number().required().label("The Zip"),
    });

    return {
      onSubmit,
      schema,
    };
  },
};
</script>
<style></style>
