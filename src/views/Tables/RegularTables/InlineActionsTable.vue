<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row">
        <div class="col-6">
          <h3 class="mb-0">Inline actions</h3>
        </div>
        <div class="col-6 text-right">
          <el-tooltip content="Export" placement="top">
            <base-button type="neutral" icon size="sm">
              <span class="btn-inner--icon"
                ><i class="fas fa-user-edit"></i
              ></span>
              <span class="btn-inner--text">Export</span>
            </base-button>
          </el-tooltip>
        </div>
      </div>
    </div>

    <el-table
      class="table-responsive align-items-center table-flush"
      header-row-class-name="thead-light"
      :data="users"
    >
      <el-table-column label="Author" min-width="310px" prop="name" sortable>
        <template v-slot="{ row }">
          <img :src="row.image" class="avatar rounded-circle mr-3" />
          <b>{{ row.name }}</b>
        </template>
      </el-table-column>
      <el-table-column
        label="Created At"
        prop="createdAt"
        min-width="140px"
        sortable
      >
      </el-table-column>

      <el-table-column
        label="Product"
        min-width="200px"
        prop="product"
        sortable
      >
        <template v-slot="{ row }">
          <a href="#!" class="font-weight-bold">{{ row.product }}</a>
        </template>
      </el-table-column>

      <el-table-column min-width="180px" align="center">
        <template v-slot="{ row }">
          <div class="table-actions">
            <el-tooltip content="Edit" placement="top">
              <a
                href="#!"
                @click.prevent="onEdit(row)"
                class="table-action"
                data-toggle="tooltip"
                data-original-title="Edit product"
              >
                <i class="fas fa-user-edit"></i>
              </a>
            </el-tooltip>
            <el-tooltip content="Delete" placement="top">
              <a
                href="#!"
                @click.prevent="onDelete(row)"
                class="table-action table-action-delete"
                data-toggle="tooltip"
                data-original-title="Delete product"
              >
                <i class="fas fa-trash"></i>
              </a>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import users from "./../users";
import {
  ElTable,
  ElTableColumn,
  ElDropdownMenu,
  ElDropdownItem,
  ElDropdown,
  ElTooltip,
} from "element-plus";

export default {
  name: "inline-actions-table",
  components: {
    [ElTooltip.name]: ElTooltip,
    [ElTable.name]: ElTable,
    [ElTableColumn.name]: ElTableColumn,
    [ElDropdown.name]: ElDropdown,
    [ElDropdownItem.name]: ElDropdownItem,
    [ElDropdownMenu.name]: ElDropdownMenu,
  },
  data() {
    return {
      users,
      currentPage: 1,
    };
  },
  methods: {
    onEdit(row) {
      alert(`You want to edit row ${row.id}`);
    },
    onDelete(row) {
      alert(`You want to delete row ${row.id}`);
    },
  },
};
</script>
