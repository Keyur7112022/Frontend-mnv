<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">{{ $route.name }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb> </route-bread-crumb>
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
        <div class="col-lg-6">
          <div class="card-wrapper">
            <!-- Input groups -->
            <card>
              <!-- Card header -->
              <template v-slot:header>
                <h3 class="mb-0">Input groups</h3>
              </template>
              <!-- Card body -->
              <form>
                <!-- Input groups with icon -->
                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      name="addonleft1"
                      addon-left-icon="fas fa-user"
                      placeholder="Your name"
                    ></base-input>
                  </div>
                  <div class="col-md-6">
                    <base-input
                      name="addonleft2"
                      addon-left-icon="fas fa-envelope"
                      placeholder="Email"
                    ></base-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      name="addonright1"
                      addon-right-icon="fas fa-map-marker"
                      placeholder="Location"
                    ></base-input>
                  </div>
                  <div class="col-md-6">
                    <base-input
                      name="addonright2"
                      addon-right-icon="fas fa-eye"
                      placeholder="Password"
                      type="password"
                    ></base-input>
                  </div>
                </div>
                <!-- Input groups with icon -->
                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      name="addonleft3"
                      addon-left-icon="fas fa-credit-card"
                      placeholder="Payment Method"
                    >
                      <template v-slot:addonRight>
                        <small class="font-weight-bold">USD</small>
                      </template>
                    </base-input>
                  </div>
                  <div class="col-md-6">
                    <base-input
                      name="addonright3"
                      addon-right-icon="fas fa-phone"
                      addon-left-icon="fas fa-globe-americas"
                      placeholder="Phone"
                    >
                    </base-input>
                  </div>
                </div>
              </form>
            </card>
            <!-- Dropdowns -->
            <card>
              <!-- Card header -->
              <template v-slot:header>
                <h3 class="mb-0">Selects</h3>
              </template>
              <!-- Card body -->
              <form>
                <div class="row">
                  <div class="col-md-6">
                    <base-input name="select" label="Simple select">
                      <el-select
                        v-model="selects.simple"
                        filterable
                        placeholder="Simple select"
                      >
                        <el-option
                          v-for="option in selectOptions"
                          :key="option.label"
                          :label="option.label"
                          :value="option.value"
                        >
                        </el-option>
                      </el-select>
                    </base-input>
                  </div>
                  <div class="col-md-6">
                    <base-input name="selectmultiple" label="Multiple select">
                      <el-select
                        v-model="selects.multiple"
                        multiple
                        filterable
                        placeholder="Multiple select"
                      >
                        <el-option
                          v-for="option in selectOptions"
                          :key="option.label"
                          :label="option.label"
                          :value="option.value"
                        >
                        </el-option>
                      </el-select>
                    </base-input>
                  </div>
                </div>
              </form>
            </card>
            <!-- Datepicker -->
            <div class="card">
              <!-- Card header -->
              <div class="card-header">
                <h3 class="mb-0">Datepicker</h3>
              </div>
              <!-- Card body -->
              <div class="card-body">
                <form>
                  <div class="row">
                    <div class="col-md-6">
                      <base-input name="date1" label="Date picker">
                        <template v-slot="{ focus, blur }">
                          <flat-picker
                            @on-open="focus"
                            @on-close="blur"
                            :config="{ allowInput: true }"
                            class="form-control datepicker"
                            v-model="dates.simple"
                          >
                          </flat-picker>
                        </template>
                      </base-input>
                    </div>
                    <div class="col-md-6">
                      <base-input name="date2" label="Range picker">
                        <template v-slot="{ focus, blur }">
                          <flat-picker
                            @on-open="focus"
                            @on-close="blur"
                            :config="{ allowInput: true, mode: 'range' }"
                            class="form-control datepicker"
                            v-model="dates.range"
                          >
                          </flat-picker>
                        </template>
                      </base-input>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <!-- Text editor -->
            <div class="card">
              <!-- Card header -->
              <div class="card-header">
                <h3 class="mb-0">Text editor</h3>
              </div>
              <!-- Card body -->
              <div class="card-body">
                <form>
                  <html-editor></html-editor>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card-wrapper">
            <card>
              <!--Card Header-->
              <template v-slot:header>
                <h3 class="mb-0">Tags</h3>
              </template>
              <!--Card Body-->
              <tags-input placeholder="Add new tag" class="test"></tags-input>
            </card>

            <card>
              <!--Card Header-->
              <template v-slot:header>
                <h3 class="mb-0">Toggle buttons</h3>
              </template>
              <!--Card Body-->
              <base-switch
                class="mr-1"
                on-text="On"
                off-text="Off"
              ></base-switch>
              <base-switch
                class="mr-1"
                v-model="switches.primary"
              ></base-switch>
              <base-switch
                class="mr-1"
                v-model="switches.default"
                type="default"
              ></base-switch>
              <base-switch
                class="mr-1"
                v-model="switches.danger"
                type="danger"
              ></base-switch>
              <base-switch
                class="mr-1"
                v-model="switches.warning"
                type="warning"
              ></base-switch>
              <base-switch
                class="mr-1"
                v-model="switches.success"
                type="success"
              ></base-switch>
              <base-switch
                class="mr-1"
                v-model="switches.info"
                type="info"
              ></base-switch>
            </card>

            <card>
              <!--Card Header-->
              <template v-slot:header>
                <h3 class="mb-0">Sliders</h3>
              </template>
              <!--Card Body-->

              <base-slider v-model="sliders.simple"></base-slider>

              <div class="mt-3 row">
                <div class="col-6">
                  <span class="range-slider-value">{{ sliders.simple }}</span>
                </div>
              </div>

              <base-slider
                v-model="sliders.range"
                type="primary"
                :range="{ min: 100, max: 500 }"
                :connect="true"
              >
              </base-slider>
              <div class="mt-3 row">
                <div class="col-6">
                  <span class="range-slider-value">{{ sliders.range[0] }}</span>
                </div>
                <div class="text-right col-6">
                  <span class="range-slider-value value-high">{{
                    sliders.range[1]
                  }}</span>
                </div>
              </div>
            </card>

            <card>
              <!--Card Header-->
              <template v-slot:header>
                <h3 class="mb-0">Dropzone</h3>
              </template>
              <!--Card Body-->

              <dropzone-file-upload
                v-model="inputs.fileSingle"
              ></dropzone-file-upload>

              <dropzone-file-upload
                v-model="inputs.fileMultiple"
                multiple
              ></dropzone-file-upload>
            </card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElSelect, ElOption } from "element-plus";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import HtmlEditor from "@/components/Inputs/HtmlEditor";
import TagsInput from "@/components/Inputs/TagsInput";
import DropzoneFileUpload from "@/components/Inputs/DropzoneFileUpload";
import BaseSlider from "@/components/BaseSlider";

import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";

export default {
  name: "form-components",
  components: {
    HtmlEditor,
    TagsInput,
    DropzoneFileUpload,
    BaseSlider,
    flatPicker,
    [ElSelect.name]: ElSelect,
    [ElOption.name]: ElOption,
    RouteBreadCrumb,
  },
  data() {
    return {
      selectOptions: [
        {
          label: "Alerts",
          value: "Alerts",
        },
        {
          label: "Badges",
          value: "Badges",
        },
        {
          label: "Buttons",
          value: "Buttons",
        },
        {
          label: "Cards",
          value: "Cards",
        },
        {
          label: "Forms",
          value: "Forms",
        },
        {
          label: "Modals",
          value: "Modals",
        },
      ],
      selects: {
        simple: "Badges",
        multiple: ["Alerts", "Buttons"],
      },
      dates: {
        simple: new Date(),
        range: "2019-04-19 to 2019-04-24",
      },
      inputs: {
        fileSingle: [],
        fileMultiple: [],
      },
      switches: {
        off: false,
        primary: true,
        default: true,
        danger: true,
        warning: true,
        success: true,
        info: true,
      },
      sliders: {
        simple: 50,
        range: [200, 400],
      },
    };
  },
};
</script>
