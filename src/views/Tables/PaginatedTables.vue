<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Paginated tables</h6>
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
      <div>
        <card
          class="no-border-card"
          body-classes="px-0 pb-1"
          footer-classes="pb-2"
        >
          <template v-slot:header>
            <h3 class="mb-0">Paginated tables</h3>
            <p class="text-sm mb-0">
              This is a client side example of paginated tables using element-ui
              tables.
            </p>
          </template>
          <div>
            <div
              class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
            >
              <el-select
                class="select-primary pagination-select"
                v-model="pagination.perPage"
                placeholder="Per page"
              >
                <el-option
                  class="select-primary"
                  v-for="item in pagination.perPageOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>

              <div>
                <el-input
                  type="search"
                  class="mb-3"
                  clearable
                  prefix-icon="el-icon-search"
                  style="width: 200px"
                  placeholder="Search records"
                  v-model="searchQuery"
                  aria-controls="datatables"
                >
                </el-input>
              </div>
            </div>
            <el-table
              :data="queriedData"
              row-key="id"
              header-row-class-name="thead-light"
              @selection-change="selectionChange"
            >
              <el-table-column
                v-for="column in tableColumns"
                :key="column.label"
                v-bind="column"
              >
              </el-table-column>
              <el-table-column min-width="180px" align="right" label="Actions">
                <template v-slot:default="props">
                  <div class="d-flex">
                    <base-button
                      @click="handleLike(props.$index, props.row)"
                      class="like btn-link"
                      type="info"
                      size="sm"
                      icon
                    >
                      <i class="text-white ni ni-like-2"></i>
                    </base-button>
                    <base-button
                      @click="handleEdit(props.$index, props.row)"
                      class="edit"
                      type="warning"
                      size="sm"
                      icon
                    >
                      <i class="text-white ni ni-ruler-pencil"></i>
                    </base-button>
                    <base-button
                      @click="handleDelete(props.$index, props.row)"
                      class="remove btn-link"
                      type="danger"
                      size="sm"
                      icon
                    >
                      <i class="text-white ni ni-fat-remove"></i>
                    </base-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <template v-slot:footer>
            <div
              class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
            >
              <div class="">
                <p class="card-category">
                  Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
                </p>
              </div>
              <base-pagination
                class="pagination-no-border"
                v-model="pagination.currentPage"
                :per-page="pagination.perPage"
                :total="total"
              >
              </base-pagination>
            </div>
          </template>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import {
  ElTable,
  ElTableColumn,
  ElSelect,
  ElOption,
  ElInput,
} from "element-plus";
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import BasePagination from "@/components/BasePagination";
import swal from "sweetalert2";
import users from "./users2";

export default {
  components: {
    BasePagination,
    RouteBreadCrumb,
    [ElSelect.name]: ElSelect,
    [ElOption.name]: ElOption,
    [ElTable.name]: ElTable,
    [ElInput.name]: ElInput,
    [ElTableColumn.name]: ElTableColumn,
  },
  computed: {
    pagedData() {
      return this.tableData.slice(this.from, this.to);
    },
    /***
     * Searches through table data and returns a paginated array.
     * Note that this should not be used for table with a lot of data as it might be slow!
     * Do the search and the pagination on the server and display the data retrieved from server instead.
     * @returns {computed.pagedData}
     */
    queriedData() {
      if (!this.searchQuery) {
        return this.pagedData;
      }
      let result = this.tableData.filter((row) => {
        let isIncluded = false;
        for (let key of this.propsToSearch) {
          let rowValue = row[key].toString();
          if (rowValue.includes && rowValue.includes(this.searchQuery)) {
            isIncluded = true;
          }
        }
        return isIncluded;
      });

      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.tableData.length;
    },
  },
  data() {
    return {
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      searchQuery: "",
      propsToSearch: ["name", "email"],
      tableColumns: [
        {
          type: "selection",
        },
        {
          prop: "name",
          label: "Name",
          minWidth: 200,
        },
        {
          prop: "email",
          label: "Email",
          minWidth: 250,
        },
        {
          prop: "age",
          label: "Age",
          minWidth: 100,
        },
        {
          prop: "salary",
          label: "Salary",
          minWidth: 120,
        },
      ],
      // tableColumns: [
      //   {
      //     type: "selection",
      //   },
      //   {
      //     prop: "name",
      //     label: "Name",
      //     minWidth: 160,
      //     sortable: true,
      //   },
      //   {
      //     prop: "position",
      //     label: "Position",
      //     minWidth: 220,
      //     sortable: true,
      //   },
      //   {
      //     prop: "city",
      //     label: "Office",
      //     minWidth: 135,
      //     sortable: true,
      //   },
      //   {
      //     prop: "age",
      //     label: "Age",
      //     minWidth: 100,
      //     sortable: true,
      //   },
      //   {
      //     prop: "createdAt",
      //     label: "Start Date",
      //     minWidth: 150,
      //     sortable: true,
      //   },
      //   {
      //     prop: "salary",
      //     label: "Salary",
      //     minWidth: 120,
      //     sortable: true,
      //   },
      // ],
      tableData: users,
      fuseSearch: null,
      searchedData: [],
    };
  },
  methods: {
    handleLike(index, row) {
      const swalWithBootstrapButtons1 = swal.mixin({
        customClass: {
          confirmButton: "btn btn-success btn-fill",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons1.fire({
        title: `You liked ${row.name}`,
      });
    },
    handleEdit(index, row) {
      const swalWithBootstrapButtons2 = swal.mixin({
        customClass: {
          confirmButton: "btn btn-info btn-fill",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons2.fire({
        title: `You want to edit ${row.name}`,
      });
    },
    handleDelete(index, row) {
      const swalWithBootstrapButtons3 = swal.mixin({
        customClass: {
          confirmButton: "btn btn-success btn-fill",
          cancelButton: "btn btn-danger btn-fill",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons3
        .fire({
          title: "Are you sure?",
          text: `You won't be able to revert this!`,
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.value) {
            this.deleteRow(row);
            swalWithBootstrapButtons3.fire({
              title: "Deleted!",
              text: `You deleted ${row.name}`,
            });
          }
        });
    },
    deleteRow(row) {
      let indexToDelete = this.tableData.findIndex(
        (tableRow) => tableRow.id === row.id
      );
      if (indexToDelete >= 0) {
        this.tableData.splice(indexToDelete, 1);
      }
    },
    selectionChange(selectedRows) {
      this.selectedRows = selectedRows;
    },
  },
};
</script>
<style>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
