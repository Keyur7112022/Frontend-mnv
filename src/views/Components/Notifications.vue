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

    <!-- notification table -->
    <div class="card mt--6 ml-4 mr-4">
      <div class="card" style="padding: 20px">
        <el-table
          :data="notificationList"
          style="width: 100%"
          height="400px"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="MESSAGES" class="flex-fill text-bold"
            ><template v-slot="{ row }">
              <p class="m-0">
                <a
                  href="#/components/checklists"
                  style="
                    font-family: 'Roboto', sans-serif;
                    margin: 0;
                    color: black;
                    font-weight: solid;
                  "
                >
                  {{ row.notificationmsg }}
                </a>
              </p>
            </template></el-table-column
          >
          <el-table-column align="right" width="200">
            <template v-slot="{ row }">
              {{ $dayjs(row.date).fromNow() }}
            </template>
          </el-table-column>
        </el-table>
        <div class="mt-4">
          <el-button type="primary" size="small">Mark as read</el-button>
          <el-button type="danger" size="small" @click="delSelected"
            >Delete</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ElTable, ElTableColumn, ElButton } from "element-plus";
import axios from "axios";
export default {
  components: {
    [ElTable.name]: ElTable,
    [ElTableColumn.name]: ElTableColumn,
    ElButton,
  },
  data() {
    return {
      notificationList: [],
      delNoti: [],
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.delNoti = [];
      this.delNoti = val;
    },
    delSelected() {
      for (let i = 0; i < this.delNoti.length; i++) {
        axios
          .delete(`http://localhost:7000/deletenoti/${this.delNoti[i]._id}`)
          .then(() => {
            var id = JSON.parse(localStorage.getItem("user"))._id;
            this.getNotification(id);
          });
      }
    },
    getNotification(id) {
      this.notificationList = [];
      axios.get(`http://localhost:7000/notify/${id}`).then((response) => {
        this.notificationList = response.data;
      });
    },
  },
  mounted() {
    var id = JSON.parse(localStorage.getItem("user"))._id;
    this.getNotification(id);
  },
};
</script>
<style>
.ct-notification .Vue-Toastification__toast--default {
  padding: 0;
  overflow: inherit;
  box-shadow: none;
  background-color: transparent;
}
</style>
