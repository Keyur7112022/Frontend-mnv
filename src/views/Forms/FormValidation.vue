<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">{{ $route.name }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <base-button size="sm" type="neutral">New</base-button>
          <base-button size="sm" type="neutral">Filters</base-button>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <div class="card-wrapper">
            <custom-styles-validation></custom-styles-validation>

            <browser-defaults-validation></browser-defaults-validation>

            <server-side-validation></server-side-validation>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";

import CustomStylesValidation from "./FormValidation/CustomStylesValidation";
import BrowserDefaultsValidation from "./FormValidation/BrowserDefaultsValidation";
import ServerSideValidation from "./FormValidation/ServerSideValidation";
export default {
  name: "form-components",
  components: {
    RouteBreadCrumb,
    CustomStylesValidation,
    BrowserDefaultsValidation,
    ServerSideValidation,
  },
  data() {
    return {};
  },
};
</script>
