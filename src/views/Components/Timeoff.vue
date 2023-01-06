<template>
  <div>
    <base-header
      class="pb-6 content__title content__title--calendar"
      style="background-color: rgb(54, 134, 255) !important"
    >
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">{{ $route.name }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </div>
      </div>
    </base-header>
    <!-- div for search menu -->

    <div class="card mt--6 ml-4 mr-4">
      <div class="card p-4">
        <div>
          <!-- leave header -->
          <div class="d-flex justify-content-start">
            <div class="mr-2 border p-2 w-25">
              <div class="flex-fill">
                <h3 style="margin: 0">Sick leaves(Unpaid)</h3>
              </div>
              <div class="flex-fill"><p style="margin: 0">10 Days</p></div>
            </div>
            <div class="mr-2 border p-2 w-25">
              <div class="flex-fill">
                <h3 style="margin: 0">Unpaid leaves</h3>
              </div>
              <div class="flex-fill"><p style="margin: 0">10 Days</p></div>
            </div>
          </div>

          <!-- leave body -->
          <!-- header -->
          <div class="mt-3">
            <div>
              <h3>
                <i class="fa fa-rectangle-list text-blue mr-2 fa-lg"></i>My
                Leaves
              </h3>
            </div>

            <!-- second part -->
            <div class="d-flex mb-2">
              <div class="mr-2">
                <el-select v-model="leavetype" placeholder="Select type">
                  <el-option
                    v-for="option in leaveType"
                    :key="option.label"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </div>
              <div class="mr-2">
                <el-select v-model="leavestatus" placeholder="Select status">
                  <el-option
                    v-for="option in leaveStatus"
                    :key="option.label"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </div>
              <div class="mr-2 w-25">
                <el-date-picker
                  style="width: 100%"
                  v-model="selectdate"
                  type="date"
                  placeholder="Pick a day"
                />
              </div>

              <div class="mr-2 w-25">
                <el-button type="primary" @click="modals = true" solid
                  >+ New Request</el-button
                >
              </div>

              <modal v-model:show="modals">
                <div>
                  <div class="d-flex flex-column">
                    <div>
                      <h2>New Request</h2>
                      <hr style="margin: 20px 0" />
                    </div>
                    <div class="d-flex align-items-center mb-4">
                      <div class="mr-2">
                        <i class="fa fa-plane-up"></i>
                      </div>
                      <div class="flex-fill">
                        <el-select
                          class="w-100"
                          v-model="selects.simple"
                          placeholder="Select Type"
                        >
                          <el-option
                            v-for="option in selects.leaves"
                            :key="option.label"
                            :label="option.label"
                            :value="option.value"
                          />
                        </el-select>
                      </div>
                    </div>
                    <div class="d-flex align-items-start mb-4">
                      <div class="mr-2">
                        <i class="fa fa-clock p-0 m-0"></i>
                      </div>
                      <div>
                        <el-radio-group v-model="days" size="small">
                          <el-radio label="single day">Single Day</el-radio>
                          <el-radio label="multiple days"
                            >Multiple Day</el-radio
                          >
                        </el-radio-group>
                        <div class="d-flex w-100">
                          <div class="d-flex">
                            <div class="flex-fill mr-2">
                              <el-date-picker
                                v-if="days == 'single day'"
                                v-model="date"
                                type="date"
                                placeholder="Pick a day"
                                class="w-100"
                              />
                            </div>
                            <div class="flex-fill">
                              <el-time-picker
                                v-if="days == 'single day'"
                                v-model="time"
                                is-range
                                start-placeholder="Start time"
                                end-placeholder="End time"
                                class="w-100"
                              />
                            </div>
                          </div>

                          <el-date-picker
                            class="w-75"
                            v-if="!(days == 'single day')"
                            v-model="date"
                            type="daterange"
                            start-placeholder="Start Date"
                            end-placeholder="End Date"
                            :default-time="defaultTime1"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="d-flex align-items-start mb-4">
                      <div class="mr-2">
                        <i class="fa fa-bars-staggered"></i>
                      </div>
                      <div class="flex-fill">
                        <el-form-item label="" class="h-100 m-0">
                          <el-input
                            class="h-100"
                            v-model="note"
                            placeholder="Note(Optional)"
                            type="textarea"
                          />
                        </el-form-item>
                      </div>
                    </div>
                    <div class="d-flex align-items-start mb-4">
                      <div class="mr-2">
                        <i class="fa-solid fa-paperclip"></i>
                      </div>
                      <div class="mr-2">
                        <el-upload
                          drag
                          type="file"
                          accept="image/*"
                          multiple
                          @change="show"
                          ref="myimage"
                          class="customUpload"
                        >
                          <img :src="image" />
                          <i
                            class="fa fa-cloud-arrow-up"
                            style="color: lightgreen"
                          ></i>
                          <div class="el-upload__text">
                            Drop file here or <em>click to upload</em>
                          </div>
                          <template #tip>
                            <div class="el-upload__tip">
                              Max file size : 5MB. File format : pdf, docx, png,
                              jpeg, ...
                            </div>
                          </template>
                        </el-upload>
                      </div>
                      <div>
                        <p style="margin-top: 10px">(Optinal)</p>
                      </div>
                    </div>

                    <div class="d-flex align-items-start mb-4">
                      <div class="mr-2">
                        <i
                          class="fa-regular fa-bell"
                          style="padding-top: 10px"
                        ></i>
                      </div>
                      <div class="w-100">
                        <div class="d-flex flex-column mb-2">
                          <div>
                            <el-input
                              v-model="member"
                              placeholder="Add member to notify them"
                              :prefix-icon="Search"
                            />
                          </div>
                        </div>

                        <div class="d-flex align-items-center">
                          <div class="mr-2">
                            <p
                              style="
                                margin: 0;
                                font-size: 13px;
                                font-family: Sans-serif;
                              "
                            >
                              This request will be sent to your line manager
                            </p>
                          </div>
                          <div>
                            <div
                              class="d-flex p-1"
                              style="
                                background-color: rgb(227, 235, 241);
                                border-radius: 25px;
                              "
                            >
                              <img
                                class="img-dp mr-2"
                                src="https://storage.googleapis.com/prod-production-5f508e55bb1bb80026996182/profile-images/6366184c704381002693b1b8/Fi83N4EWLSMpPh58wQQCE.jpeg"
                              />

                              <h5 class="m-0 mr-2">
                                {{ manager }}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <el-button
                        :disabled="!isComplete"
                        type="primary"
                        @click="
                          timeoff();
                          modals = false;
                        "
                        solid
                        >Submit</el-button
                      >
                      <el-button type="danger" @click="modals = false"
                        >Close</el-button
                      >
                    </div>
                  </div>
                </div>
              </modal>
            </div>

            <!-- third part -->

            <div>
              <div>
                <el-table
                  height="400px"
                  :data="filteredLeaves"
                  style="width: 100%"
                  cell-class-name="my-cells"
                >
                  <el-table-column
                    prop="SelectType"
                    label="type"
                    class="flex-fill"
                  />
                  <el-table-column
                    prop="Leaves"
                    label="Leave"
                    class="flex-fill"
                  />
                  <el-table-column label="Date" class="flex-fill"
                    ><template v-slot="{ row }">
                      <span>{{
                        $dayjs(row.startDate).format("DD-MM-YYYY")
                      }}</span>

                      <span>{{
                        row.endDate
                          ? " - " + $dayjs(row.endDate).format("DD-MM-YYYY")
                          : ""
                      }}</span>
                    </template></el-table-column
                  >
                  <el-table-column
                    label="Status"
                    class="flex-fill"
                    prop="status"
                    sortable
                  >
                    <template v-slot="{ row }">
                      <badge class="badge-dot mr-4" type="">
                        <i :class="`bg-${row.statusType}`"></i>
                        <span class="status">{{ row.status }}</span>
                      </badge>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import projects from "../Tables/projects";
import Modal from "@/components/Modal";
import {
  ElTimePicker,
  ElUpload,
  ElFormItem,
  ElRadio,
  ElRadioGroup,
  ElInput,
  ElDatePicker,
  ElSelect,
  ElOption,
  ElButton,
  ElTable,
  ElTableColumn,
  ElDropdownMenu,
  ElDropdownItem,
  ElDropdown,
} from "element-plus";
import axios from "axios";
export default {
  components: {
    Modal,
    ElTimePicker,
    ElUpload,
    ElFormItem,
    ElRadio,
    ElRadioGroup,
    ElInput,
    ElDatePicker,
    ElSelect,
    ElOption,
    ElButton,
    [ElTable.name]: ElTable,
    [ElTableColumn.name]: ElTableColumn,
    [ElDropdown.name]: ElDropdown,
    [ElDropdownItem.name]: ElDropdownItem,
    [ElDropdownMenu.name]: ElDropdownMenu,
  },
  data() {
    return {
      modals: false,
      image: "",
      selectdate: "",
      leavestatus: "",
      leavetype: "",
      leaveList: [],
      member: "",
      note: "",
      time: "",
      date: "",
      days: "",
      manager: "",
      showModal: false,
      projects,
      currentPage: 1,
      leaveType: [
        { value: "", label: "All" },
        { value: "sickleave", label: "Sick Leave (unpaid)" },
        { value: "unpaid", label: "Unpaid" },
      ],
      leaveStatus: [
        { value: "", label: "All" },
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" },
        { value: "pending", label: "Pending" },
      ],
      selects: {
        simple: "",
        leaves: [
          { value: "sickleave", label: "Sick Leave (unpaid)" },
          { value: "unpaid", label: "Unpaid" },
        ],
      },
    };
  },
  methods: {
    clearData() {
      this.time = "";
      this.date = "";
      this.days = "";
      this.note = "";
      this.member = "";
    },
    show() {
      var input = this.$refs;

      var url = URL.createObjectURL(input.myimage.files[0]);
      this.image = url;
    },
    async timeoff() {
      axios
        .post(
          `http://localhost:7000/leave/${
            JSON.parse(localStorage.getItem("user"))._id
          }`,
          {
            SelectType: this.selects.simple,
            Leaves: this.days,
            startDate: this.date[0] || this.date,
            endDate: this.date[1],
            startTime: this.time[0],
            endTime: this.time[1],
            Note: this.note,
            AddMember: this.member,
          }
        )
        .then((resp) => {
          if (resp) {
            const id = JSON.parse(localStorage.getItem("user"))._id;
            this.getLeaveList(id);
          }
        });
    },
    getLeaveList(id) {
      this.leaveList = [];
      axios.get(`http://localhost:7000/getLeaveList/${id}`).then((response) => {
        console.log(response.data);
        this.leaveList = response.data;
      });
    },
  },
  computed: {
    isComplete() {
      return (
        this.selects.simple &&
        this.days &&
        this.date &&
        this.note &&
        this.member
      );
    },
    filteredLeaves() {
      return this.leaveList
        .filter((leaveList) =>
          leaveList.SelectType.toLowerCase().includes(
            this.leavetype.toLowerCase()
          )
        )
        .filter((leaveList) =>
          leaveList.status
            .toLowerCase()
            .includes(this.leavestatus.toLowerCase())
        );
    },
  },
  mounted() {
    var id = JSON.parse(localStorage.getItem("user"))._id;
    this.getLeaveList(id);
    this.manager = JSON.parse(localStorage.getItem("user")).manager;
  },
};
</script>

<style>
*:focus {
  outline: none;
}
.singledayinput {
  display: flex;
  align-items: center;
  gap: 5px;
}

.img-dp {
  width: 25px;
  height: 25px;
  border-radius: 50%;
}
.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 55;
  background-color: rgba(0, 0, 0, 0.6);
}
.linemanger {
  display: flex;
  flex: 1fr 1fr;
  flex-wrap: wrap;
}
.timeOffModal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  width: 100%;
  max-width: 600px;
  background-color: white;
  border-radius: 20px;
  padding: 25px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0.2s;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-50%), translateX(100vw);
}
.timeoffinput-user-dp {
  margin: 5px 0;
  padding: 0 2px;
  display: flex;
  align-items: center;
  background-color: lightgrey;
  border-radius: 20px;
  gap: 5px;
}
.logo-design {
  background-color: rgb(45, 206, 137);
  border-radius: 50%;
  padding: 2px 5px;
}

.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.customUpload > .el-upload.el-upload--text > .el-upload-dragger {
  height: 50px;
  align-items: center;
}
</style>
