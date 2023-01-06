<template>
  <div>
    <!-- HEADER -->
    <base-header style="background-color: rgb(54, 134, 255) !important">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">
            {{ pagename }}
          </h6>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <base-button
            size="sm"
            type="neutral"
            @click="
              ((allusercontainer = true),
              (allleavecontainer = false),
              (alltaskcontainer = false)),
                (pagename = 'All Users')
            "
            >All users</base-button
          >
          <base-button
            size="sm"
            type="neutral"
            @click="
              ((allleavecontainer = true),
              (allusercontainer = false),
              (alltaskcontainer = false)),
                (pagename = 'Leave Requests')
            "
            >Leaves</base-button
          >
          <base-button
            size="sm"
            type="neutral"
            @click="
              ((alltaskcontainer = true),
              (allusercontainer = false),
              (allleavecontainer = false)),
                (pagename = 'Tasks')
            "
            >Tasks</base-button
          >
        </div>
      </div>
    </base-header>

    <!-- ALL USER CARD -->
    <div class="m-2" v-if="allusercontainer">
      <!-- header -->
      <div class="card p-3">
        <div class="leave-body-header">
          <div>
            <span style="font-size: 20px; color: Dodgerblue">
              <i class="fa-solid fa-users"></i>
            </span>
          </div>
          <div>
            <h3 style="margin: 0">All Users</h3>
          </div>
        </div>

        <!-- second part -->
        <div class="d-flex mb-4">
          <div class="mr-2 w-25">
            <el-select
              style="width: 100%"
              v-model="department"
              placeholder="Select type"
            >
              <el-option
                v-for="option in departments"
                :key="option.label"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </div>
          <div class="mr-2 w-25">
            <el-select
              style="width: 100%"
              v-model="manager"
              placeholder="Select status"
            >
              <el-option
                v-for="option in managerList"
                :key="option.label"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </div>
          <div class="mr-2 w-25">
            <el-input class="w-100" placeholder="user" v-model="searchName" />
          </div>

          <div class="mr-2 w-25">
            <el-button
              class="h-100"
              type="primary"
              @click="usermodal = true"
              solid
              >+Add User</el-button
            >
            <!-- ADD USER MODAL -->

            <modal v-model:show="usermodal">
              <div>
                <div class="d-flex flex-column">
                  <Form @submit="AddNewUser" :validation-schema="schema">
                    <div>
                      <h6 class="heading-small text-muted mb-2">
                        Enter User Details
                      </h6>
                    </div>

                    <div>
                      <base-input
                        label="Full name"
                        name="fullName"
                        placeholder="Enter name"
                        rules="required"
                      >
                      </base-input>
                    </div>

                    <div class="d-flex align-items-center">
                      <div class="w-75 mr-2">
                        <base-input
                          label="Email"
                          name="email"
                          placeholder="Enter email"
                          rules="required"
                          success-message="Looks good!"
                        >
                        </base-input>
                      </div>
                      <div class="w-25 pl-4">
                        <el-checkbox
                          v-model="admincheck"
                          label="Admin"
                          size="large"
                        />
                      </div>
                    </div>
                    <div class="d-flex">
                      <div class="flex-fill mr-2">
                        <base-input label="Select Department" name="dep">
                          <el-select
                            v-model="selectDepart"
                            placeholder="Select type"
                          >
                            <el-option
                              v-for="option in departments"
                              :key="option.label"
                              :label="option.label"
                              :value="option.value"
                            />
                          </el-select>
                        </base-input>
                      </div>
                      <div class="flex-fill">
                        <base-input label="Select Manager" name="dep">
                          <el-select
                            v-model="selectManager"
                            placeholder="Select Manager"
                          >
                            <el-option
                              v-for="option in managerList"
                              :key="option.label"
                              :label="option.label"
                              :value="option.value"
                            />
                          </el-select>
                        </base-input>
                      </div>
                    </div>

                    <div>
                      <base-input label="Joining Date" name="joindate">
                        <el-date-picker
                          v-model="joindate"
                          type="date"
                          placeholder="Pick a day"
                          class="w-100"
                        />
                      </base-input>
                    </div>
                    <div>
                      <base-input
                        label="password"
                        name="password"
                        placeholder="Enter password"
                        rules="required"
                      >
                      </base-input>
                    </div>
                    <div
                      v-html="error"
                      style="color: red; text-align: center"
                    ></div>

                    <base-button type="success" native-type="submit"
                      >Submit</base-button
                    >
                    <base-button type="danger" @click="usermodal = false"
                      >Cancel</base-button
                    >
                  </Form>
                </div>
              </div>
            </modal>
          </div>
        </div>

        <!-- SHOW ALL USERS -->

        <div>
          <el-table
            height="500px"
            scrollbar-always-on="true"
            :data="filteredUsers"
            style="width: 100%"
            cell-class-name="my-cells"
          >
            <el-table-column prop="fullName" label="Name" class="flex-fill"
              ><template v-slot="{ row }">
                <img
                  class="profile_image"
                  :src="row.profile_pic ? row.profile_pic : 'userpic.jpeg'"
                />
                <span>{{ row.fullName }}</span>
              </template></el-table-column
            >
            <el-table-column prop="email" label="Email" class="flex-fill" />
            <el-table-column prop="position" label="Department" width="220" />
            <el-table-column
              label="Manager"
              class="flex-fill"
              prop="manager"
              width="150"
              sortable
            />
            <el-table-column
              label="Office"
              class="flex-fill"
              prop="office"
              width="150"
              sortable
            />
            <el-table-column
              prop=""
              label="Delete Users"
              class="flex-fill"
              width="140"
            >
              <template v-slot="{ row }">
                <el-button
                  type="danger"
                  @click="(delusermodal = true), setUserDetails(row)"
                  solid
                  >Delete</el-button
                ></template
              ></el-table-column
            >
          </el-table>

          <modal v-model:show="delusermodal">
            <div>
              <h2>Delete this User?</h2>
              <hr style="margin: 20px 0" />
              <img
                class="profile_image"
                :src="setuserimg ? setuserimg : 'userpic.jpeg'"
              />
              <h3>{{ setusername }}</h3>
              <h4>{{ setuseremail }}</h4>
              <div>
                <base-button type="danger" @click="delUserDetails"
                  >Delete</base-button
                >
                <base-button type="default" @click="delusermodal = false"
                  >Cancel</base-button
                >
              </div>
            </div>
          </modal>
        </div>
      </div>
    </div>

    <!-- leave list for admin -->
    <div class="m-2" v-if="allleavecontainer">
      <div class="card p-3" style="padding: 10px">
        <div class="leave-body-header">
          <div>
            <span style="font-size: 20px; color: Dodgerblue">
              <i class="fa fa-business-time"></i>
            </span>
          </div>
          <div><h3 style="margin: 0">All Leave Requests</h3></div>
        </div>

        <!-- SEARCH INPUT -->
        <div class="d-flex mb-4">
          <div class="mr-2 w-25">
            <el-select
              style="width: 100%"
              v-model="department"
              placeholder="Select type"
            >
              <el-option
                v-for="option in leavetypes"
                :key="option.label"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </div>
          <div class="mr-2 w-25">
            <el-select
              style="width: 100%"
              v-model="manager"
              placeholder="Select status"
            >
              <el-option
                v-for="option in leavestatus"
                :key="option.label"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </div>
          <div class="mr-2 w-25">
            <el-input class="h-100" placeholder="user" v-model="searchName" />
          </div>
        </div>

        <!--  LEAVES REQUEST  -->

        <div class="tasks">
          <div>
            <el-table
              :data="leaveReq"
              style="width: 100%"
              cell-class-name="my-cells"
            >
              <el-table-column
                prop="SelectType"
                label="Type"
                class="flex-fill"
              />

              <el-table-column prop="Leaves" label="Days" class="flex-fill" />
              <el-table-column label="Date" class="flex-fill"
                ><template v-slot="{ row }">
                  <span>{{ $dayjs(row.startDate).format("DD-MM-YYYY") }}</span>

                  <span>{{
                    row.endDate
                      ? " - " + $dayjs(row.endDate).format("DD-MM-YYYY")
                      : ""
                  }}</span>
                </template></el-table-column
              >

              <el-table-column label="Status" class="flex-fill" prop="status" />
              <el-table-column align="right">
                <template v-slot="{ row }">
                  <el-button
                    size="small"
                    type="success"
                    @click="updateLeave(row, 'Approved')"
                    >Approve</el-button
                  >
                  <el-button
                    size="small"
                    type="danger"
                    @click="updateLeave(row, 'Rejected')"
                    >Reject</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>

      <!-- previous LEAVES -->
      <div>
        <div class="card p-3">
          <div class="leave-body-header">
            <div>
              <span style="font-size: 20px; color: Dodgerblue">
                <i class="fa fa-business-time"></i>
              </span>
            </div>
            <div><h3 style="margin: 0">All Previous Leaves</h3></div>
          </div>

          <div>
            <div>
              <el-table
                height="300px"
                :data="prevLeaves"
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

    <!-- ALL TASKS-->
    <div class="m-2" v-if="alltaskcontainer">
      <!-- SEARCH TASKS -->
      <div class="card p-3">
        <div class="leave-body-header">
          <div>
            <span style="font-size: 20px; color: Dodgerblue">
              <i class="fa-regular fa-rectangle-list"></i>
            </span>
          </div>
          <div><h3 style="margin: 0">All Tasks</h3></div>
        </div>

        <!-- ASSIGN TASK TO USERS -->
        <div class="d-flex mb-4">
          <div class="w-50 mr-2">
            <el-select
              style="width: 100%"
              v-model="leavestatus"
              placeholder="Select status"
            >
              <el-option
                v-for="option in taskstatus"
                :key="option.label"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </div>

          <!-- TASK MODAL -->
          <div class="w-50 mr-2">
            <el-button
              class="h-100"
              type="primary"
              @click="taskmodal = true"
              solid
              >+ New Task</el-button
            >

            <modal v-model:show="taskmodal">
              <div>
                <h2>Add Task</h2>
                <hr style="margin: 20px 0" />
                <div>
                  <div>
                    <base-input label="Task Name">
                      <el-input
                        v-model="taskname"
                        placeholder="Enter Task"
                      ></el-input>
                    </base-input>
                  </div>
                  <div class="flex-fill">
                    <base-input label="Select Users">
                      <el-select
                        label="taskname"
                        v-model="selectedusers"
                        multiple
                        placeholder="Select Users"
                      >
                        <el-option
                          v-for="option in users"
                          :key="option.label"
                          :label="option.label"
                          :value="option.value"
                        />
                      </el-select>
                    </base-input>
                  </div>
                  <base-input label="Select Due Date">
                    <el-date-picker
                      :disabled-date="disableDates"
                      placeholder="Date"
                      v-model="duedate"
                      type="date"
                      :default-time="defaultTime1"
                  /></base-input>
                </div>

                <div>
                  <el-button
                    :disabled="!isComplete"
                    type="primary"
                    @click="
                      AddNewUserTask();
                      taskmodal = false;
                    "
                    solid
                    >Submit</el-button
                  >
                  <el-button type="danger" @click="taskmodal = false"
                    >Close</el-button
                  >
                </div>
              </div>
            </modal>
          </div>
        </div>

        <!-- ALL ASSIGNED TASK LIST -->

        <div class="task">
          <div>
            <el-table
              height="550px"
              :data="alltasklist"
              style="width: 100%"
              cell-class-name="my-cells"
            >
              <el-table-column type="expand">
                <template #default="props">
                  <div m="4">
                    <p>Task: {{ props.row.taskName }}</p>
                    <p>
                      Due Date:
                      {{ $dayjs(props.row.DueDate).format("DD-MM-YYYY") }}
                    </p>
                    <p>Description: {{ props.row.Description }}</p>
                    <p>Status: {{ props.row.status }}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                height="200px"
                prop="taskName"
                label="Task"
                class="flex-fill"
              />
              <el-table-column prop="" label="Date" class="flex-fill" sortable
                ><template v-slot="{ row }">
                  <span>{{ $dayjs(row.DueDate).format("DD-MM-YYYY") }}</span>
                </template></el-table-column
              >
              <el-table-column label="User" class="flex-fill"
                ><template v-slot="{ row }">
                  {{ row.fullName }}
                </template></el-table-column
              >
              <el-table-column
                label="Status"
                class="flex-fill"
                prop="status"
                width="150"
              >
                <template v-slot="{ row }">
                  <badge class="badge-dot mr-4" type="">
                    <span
                      :class="`bg-${row.statusType}`"
                      style="color: white; padding: 5px; opacity: 0.7"
                      >{{ row.status }}</span
                    >
                  </badge>
                </template>
              </el-table-column>
              <el-table-column align="right" width="80">
                <template v-slot="{ row }">
                  <el-button @click="deleteTask(row)" size="small" circle
                    ><i class="fa fa-trash tex-red"></i
                  ></el-button> </template
              ></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Form } from "vee-validate";
import * as Yup from "yup";
import axios from "axios";
import projects from "../Tables/projects";
import Modal from "@/components/Modal";
import {
  ElCheckbox,
  ElDatePicker,
  ElInput,
  ElSelect,
  ElOption,
  ElButton,
  ElTable,
  ElTableColumn,
  ElDropdownMenu,
  ElDropdownItem,
  ElDropdown,
} from "element-plus";

export default {
  components: {
    Modal,
    Form,
    ElCheckbox,
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
      taskmodal: false,
      usermodal: false,
      delusermodal: false,
      admincheck: false,
      setuserimg: "",
      setusername: "",
      setuseremail: "",
      duedate: "",
      taskname: "",
      selectedusers: [],
      //duedate: "",
      deleteuser: "",
      joindate: "",
      task: "",
      image: "",
      selectdate: "",
      manager: "",
      department: "",
      searchName: "",
      selectDepart: "",
      selectManager: "",
      managerList: [{ value: "", label: "All" }],
      allUsers: [],
      leaveReq: [],
      list: [],
      prevLeaves: [],
      alltasklist: [],
      member: "",
      note: "",
      time: "",
      date: "",
      days: "",
      showModal: false,
      showLeaveModal: false,
      showDeleteModal: false,
      projects,
      currentPage: 1,
      error: null,
      allusercontainer: true,
      allleavecontainer: false,
      alltaskcontainer: false,
      showTaskModal: false,

      pagename: "All Users",
      users: [],

      leavetypes: [
        { value: "", label: "All Types" },
        { value: "Single day", label: "Single day" },
        { value: "Multiple day", label: "Multiple day" },
      ],
      leavestatus: [
        { value: "", label: "All Status" },
        { value: "Approved", label: "Approved" },
        { value: "Rejected", label: "Rejected" },
      ],

      departments: [
        { value: "", label: "All Departments" },
        { value: "Admin", label: "Admin" },
        { value: "CSR", label: "CSR" },
        { value: "Software Development", label: "Software Development" },
        { value: "Content Writer", label: "Content Writer" },
        { value: "Designing", label: "Designing" },
        { value: "HR", label: "HR" },
        { value: "MediaNV Ahmedabad", label: "MediaNV Ahmedabad" },
        { value: "MediaNV Headquarter", label: "MediaNV Headquarter" },
        { value: "Wordpress Developement", label: "Wordpress Developement" },
        { value: "PPC", label: "PPC" },
        { value: "SEO", label: "SEO" },
      ],
      taskstatus: [
        { value: "", label: "All Status" },
        { value: "Completed", label: "Completed" },
        { value: "Pending", label: "Pending" },
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
    notifyUser(id) {
      axios.post(`http://localhost:7000/notify`, {
        user: id,
        notificationmsg: "you got new task",
      });
    },
    deleteTask(row) {
      axios.delete(`http://localhost:7000/deltask/${row._id}`).then(() => {
        this.getallTasks();
      });
    },
    delUserDetails() {
      axios
        .delete(`http://localhost:7000/deleteuser/${this.deleteuser}`)
        .then(() => {
          this.getEmployees();
          this.delusermodal = false;
        });
    },
    setUserDetails(row) {
      this.setuserimg = row.profile_pic;
      this.setusername = row.fullName;
      this.setuseremail = row.email;
      this.deleteuser = row._id;
    },
    disableDates(value) {
      const today_date = this.$dayjs().format("YYYY-MM-DD");
      const value_date = this.$dayjs(value).format("YYYY-MM-DD");
      if (value_date < today_date) {
        return true;
      } else {
        return false;
      }
    },
    show() {
      var input = this.$refs;

      var url = URL.createObjectURL(input.myimage.files[0]);
      this.image = url;
    },
    updateLeave(row, value) {
      const id = row._id;

      axios
        .post(`http://localhost:7000/updateleavestatus/${id}`, {
          status: value,
        })
        .then((resp) => {
          if (resp) {
            this.getLeaves();
          }
        });
    },
    async AddNewUser(value) {
      axios
        .post(`http://localhost:7000/register/user`, {
          fullName: value.fullName,
          manager: this.selectManager || "Jay Dalal",
          email: value.email,
          admin: this.admincheck,
          position: this.selectDepart,
          password: value.password,
          joinDate: this.joindate,
        })
        .then((response) => {
          if (response.data == "user exist") {
            this.error = "This email already exist!";
          } else {
            this.usermodal = false;
            this.error = null;
            this.getEmployees();
          }
        });
    },

    AddNewUserTask() {
      for (let i = 0; i < this.selectedusers.length; i++) {
        axios
          .post("http://localhost:7000/Checklist", {
            taskName: this.taskname,
            taskType: "Checkbox",
            addMember: this.selectedusers[i],
            DueDate: this.duedate,
            Description: "urgent",
            status: "Pending",
            statusType: "danger",
          })
          .then(() => {
            this.getallTasks();
            this.notifyUser(this.selectedusers);
            this.taskname = "";
            this.selectedusers = "";
            this.duedate = "";
          });
      }
    },
    getEmployees() {
      this.managerList = [
        {
          value: "",
          label: "All",
        },
        {
          value: "Jay Dalal",
          label: "Jay Dalal",
        },
      ];
      this.allUsers = [];
      this.users = [];
      axios.get(`http://localhost:7000/employees`).then((response) => {
        this.allUsers = response.data;
        for (let i = 0; i < this.allUsers.length; i++) {
          this.users.push({
            value: this.allUsers[i]._id,
            label: this.allUsers[i].fullName,
          });

          if (this.allUsers[i].admin) {
            this.managerList.push({
              value: this.allUsers[i].fullName,
              label: this.allUsers[i].fullName,
            });
          }
        }
      });
    },
    getLeaves() {
      this.leaveReq = [];
      this.prevLeaves = [];
      axios.get(`http://localhost:7000/leavereq`).then((response) => {
        this.list = response.data;
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].status == "Pending") {
            this.leaveReq.push(this.list[i]);
          } else {
            this.prevLeaves.push(this.list[i]);
          }
        }
      });
    },
    getallTasks() {
      this.alltasklist = [];
      axios.get(`http://localhost:7000/alltask`).then((response) => {
        this.alltasklist = response.data;
        for (let i = 0; i < this.alltasklist.length; i++) {
          this.getUserName(this.alltasklist[i].addMember[0], i);
        }
      });
    },
    getUserName(id, i) {
      axios
        .get(`http://localhost:7000/usertask/${id}`)
        .then((response) => {
          this.alltasklist[i]["fullName"] = response.data.fullName;
        })
        .then(() => {});
    },
  },
  computed: {
    isComplete() {
      return this.taskname && this.selectedusers && this.duedate;
    },
    filteredUsers() {
      return this.allUsers
        .filter((allUsers) =>
          allUsers.position
            .toLowerCase()
            .includes(this.department.toLowerCase())
        )
        .filter((allUsers) =>
          allUsers.manager.toLowerCase().includes(this.manager.toLowerCase())
        )
        .filter((allUsers) =>
          allUsers.fullName
            .toLowerCase()
            .includes(this.searchName.toLowerCase())
        );
    },
  },
  mounted() {
    this.getEmployees();
    this.getLeaves();
    this.getallTasks();
  },
  setup() {
    const schema = Yup.object().shape({
      fullName: Yup.string().required().label("The Full Name"),
      email: Yup.string().email().required().label("The email"),

      password: Yup.string().min(5).required().label("The password"),
    });

    return {
      schema,
    };
  },
};
</script>

<style>
*:focus {
  outline: none;
}
.btn-sm {
  font-size: 1rem !important;
  font-weight: 700 !important;
}
.btn:active {
  color: black !important;
}
.el-table__body-wrapper {
  background: white !important;
}
.el-table__header {
  background: white !important;
}

.singledayinput {
  display: flex;
  align-items: center;
  gap: 5px;
}
.profile_image {
  height: 30px;
  width: auto;
  margin: 5px;
  border-radius: 50%;
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

.timeoffinput {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  align-items: center;
  flex: 20px 1fr;
}

.timeoffinput-radio {
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
  flex: 20px 1fr;
}

.timeoffinput-text {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  flex: 20px 1fr;
}

.leave-header {
  display: flex;
  flex-direction: row;
  gap: 15px;
  margin: 10px 0;
}

.leave {
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  background: white;
  box-shadow: 0 0 1px grey;
}

.leave-body-header {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
}
.select-filter {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}
.select-button {
  border: none;
  box-shadow: 0 0 1px grey;
}
.leave-body {
  box-shadow: 0 0 2px lightgray;
  padding: 10px;
  width: 100%;
  margin: 20px 0;
  margin-bottom: 20px;
  background-color: white;
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
