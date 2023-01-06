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

    <div class="mt--6 ml-4 mr-4">
      <div class="card p-4">
        <div class="search-view-new">
          <div class="search-office-select">
            <el-select v-model="selects.simple" placeholder="Select">
              <el-option
                v-for="option in selects.languages"
                :key="option.label"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </div>

          <div class="search-task w-50">
            <div>
              <el-input v-model="input1" placeholder="Search Task" />
            </div>
          </div>
        </div>
        <div class="tasks-header">
          <h3>
            <i class="fa-regular fa-rectangle-list text-blue mr-2 fa-lg"></i>New
            Tasks
          </h3>
        </div>
        <!-- second div for card view -->
        <div class="tasks">
          <div>
            <el-table
              height="300px"
              :data="tasklist"
              cell-class-name="my-cells"
            >
              <el-table-column type="expand">
                <template #default="props">
                  <div m="4">
                    <p m="t-0 b-2">Task: {{ props.row.taskName }}</p>
                    <p m="t-0 b-2">
                      Due Date:
                      {{ $dayjs(props.row.DueDate).format("DD-MM-YYYY") }}
                    </p>
                    <p m="t-0 b-2">Description: {{ props.row.Description }}</p>
                    <p m="t-0 b-2">Status: {{ props.row.status }}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="taskName" label="Task" class="flex-fill" />

              <el-table-column label="Due" class="flex-fill">
                <template v-slot="{ row }">
                  <span>{{
                    $dayjs(row.DueDate).format("DD-MM-YYYY")
                  }}</span></template
                ></el-table-column
              >
              <el-table-column prop="status" label="status" class="flex-fill" />
              <el-table-column prop="" label="Mark as done" class="flex-fill">
                <template v-slot="{ row }">
                  <el-button type="success" @click="updateTask(row)" solid
                    >done</el-button
                  ></template
                ></el-table-column
              >
            </el-table>
          </div>
          <transition name="slide" appear>
            <div class="checlistModal" v-if="showModal">
              <div class="task-info">
                <div>task: {{ list.taskName }}</div>
                <div>Description: {{ list.Description }}</div>
                <div>Due Date: {{ list.DueDate }}</div>
              </div>
              <el-button @click="showModal = false" type="primary" solid
                >OK</el-button
              >
            </div></transition
          >
        </div>
      </div>
      <div class="card p-4 mt-2">
        <div class="tasks-header">
          <h3>Completed Tasks</h3>
        </div>
        <div class="tasks">
          <div>
            <el-table
              height="300px"
              :data="completedTasks"
              style="width: 100%"
              cell-class-name="my-cells"
            >
              <el-table-column prop="taskName" label="Task" class="flex-fill" />

              <el-table-column prop="DueDate" label="Due-Date" class="flex-fill"
                ><template v-slot="{ row }">
                  <span>{{
                    $dayjs(row.DueDate).format("DD-MM-YYYY")
                  }}</span></template
                ></el-table-column
              >

              <el-table-column prop="status" label="status" class="flex-fill" />
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ElButton,
  ElOption,
  ElSelect,
  ElInput,
  ElTable,
  ElTableColumn,
} from "element-plus";
import axios from "axios";
export default {
  components: {
    [ElTable.name]: ElTable,
    [ElTableColumn.name]: ElTableColumn,
    ElSelect,
    ElOption,
    ElInput,
    ElButton,
  },
  data() {
    return {
      showModal: false,
      list: [],
      tasklist: [],
      completedTasks: [],
      items: {
        done: true,
      },
      input1: "",
      selects: {
        simple: "",
        languages: [
          { value: "allstatus", label: "All Status" },
          { value: "approved", label: "Approved" },
          { value: "pending", label: "Pending" },
          { value: "cancelled", label: "Cancelled" },
          { value: "rejected", label: "Rejected" },
        ],
      },
    };
  },
  methods: {
    updateTask(row) {
      const id = row._id;
      axios.post(`http://localhost:7000/updatetask/${id}`).then((resp) => {
        if (resp) {
          const userId = JSON.parse(localStorage.getItem("user"))._id;
          this.getTasks(userId);
        }
      });
    },
    getTasks(id) {
      this.completedTasks = [];
      this.tasklist = [];
      axios
        .get(
          `http://localhost:7000/tasks/${id}` /*{
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }*/
        )
        .then((response) => {
          this.list = response.data;
          for (let i = 0; i < this.list.length; i++) {
            console.log(this.list[i]);
            if (this.list[i].done) {
              this.completedTasks.push(this.list[i]);
            } else {
              this.tasklist.push(this.list[i]);
            }
          }
        });
    },
  },
  mounted() {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    this.getTasks(userId);
  },
};
</script>

<style>
*:focus {
  outline: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0.2s;
}

.task-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.checlistModal {
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
  box-shadow: 0 0 5px black;
}
.div.el-table {
  background: white !important;
}

/* .userview {
  display: flex;
  flex-grow: 4;
  flex-wrap: wrap;
}
.user-flexview {
  border-radius: 10px;
  box-shadow: 0 0 2px;
  flex: 1;
  margin: 10px;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  margin: 10px;
}
img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
} */

/* user card view css */
.el-table__empty-block {
  background: white !important;
}

.my-cells {
  background: white !important;
}

.img1 {
  width: 100%;
  border-radius: 50%;
  padding: 50px;
}
.tasks {
  background-color: blueviolet;
  margin-bottom: 20px;
}
p {
  margin: 0;
}
.task-header {
  background-color: white;
  align-items: center;
  justify-content: center;
}
.video-preview {
  box-shadow: 0 0 3px grey;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  vertical-align: top;
  margin-right: 10px;
  width: 100%;
}

.thumbnail-row {
  margin-bottom: 10px;
  position: relative;
}

.video-div {
  margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 20px;
  row-gap: 20px;
}
/* ends here */
.searchbar {
  padding: 2px 10px;
  width: 300px;
  border-radius: 5px;
  border: solid;
  border-width: 1px;
  background: transparent;
}
.search-item {
  width: 250px;
  padding: 3px 7px;
  font-size: 15px;
  margin-left: 5px;
  background: transparent;
  border: none;
}
.searchbar:hover {
  cursor: pointer;
  border-color: green;
  border-style: solid;
}
.container {
  margin: 0;
}
.search-view-new {
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 20px;
}
.search-office-select,
.search-department-select {
  margin-right: 10px;
}

.select-button {
  font-family: "Arial";
  background: transparent;
  padding: 7px 7px;
  border-radius: 5px;
}
.select-button:hover {
  border-color: green;
  cursor: pointer;
}
</style>
