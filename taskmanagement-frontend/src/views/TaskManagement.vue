<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <InputSearch v-model="searchText" />
      </div>
      <div class="mt-3 col-md-8">
        <h4>
          Quản lý Công việc
          <i class="fas fa-tasks"></i>
        </h4>

        <TodoList
          v-if="filteredTodosCount > 0"
          :todos="filteredTodos"
          v-model:activeIndex="activeIndex"
        />
        <p v-else>Không có Công việc nào.</p>
        <div class="mt-3 row justify-content-around align-items-center">
          <button class="btn btn-sm btn-primary" @click="refreshList()">
            <i class="fas fa-redo"></i> Làm mới
          </button>

          <button class="btn btn-sm btn-success" @click="goToAddTodo">
            <i class="fas fa-plus"></i> Thêm mới
          </button>
          <button class="btn btn-sm btn-danger" @click="removeAllTodos">
            <i class="fas fa-trash"></i> Xóa tất cả
          </button>
        </div>
      </div>
      <div class="mt-3 col-md-4">
        <div v-if="activeTodo">
          <h5 class="font-weight-bold">
            Chi tiết Công việc
            <i class="fas fa-tasks"></i>
          </h5>
          <TodoDetail :todo="activeTodo" />
          <router-link
            :to="{
              name: 'todo.edit',
              params: { id: activeTodo._id },
            }"
          >
            <button type="button" class="btn btn-secondary">
              <i class="fas fa-edit"></i> Hiệu chỉnh
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TodoDetail from "@/components/TodoDetail.vue";
import InputSearch from "@/components/InputSearch.vue";
import TodoList from "@/components/TodoList.vue";
import TodoService from "@/services/todo.service";

export default {
  components: {
    TodoDetail,
    InputSearch,
    TodoList,
  },

  data() {
    return {
      todos: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Chuyển các đối tượng Công việc thành chuỗi để tiện cho tìm kiếm.
    todoStrings() {
      return this.todos.map((todo) => {
        const { title, content, complete, deadline } = todo;
        return [title, content, complete, deadline].join("");
      });
    },

    // Trả về các Công việc có chứa thông tin cần tìm kiếm.
    filteredTodos() {
      if (!this.searchText) return this.todos;
      return this.todos.filter((_todo, index) =>
        this.todoStrings[index].includes(this.searchText)
      );
    },

    activeTodo() {
      if (this.activeIndex < 0) return null;
      return this.filteredTodos[this.activeIndex];
    },

    filteredTodosCount() {
      return this.filteredTodos.length;
    },
  },

  methods: {
    async retrieveTodos() {
      try {
        this.todos = await TodoService.getAll();
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveTodos();
      this.activeIndex = -1;
    },

    async removeAllTodos() {
      if (confirm("Bạn muốn xóa tất cả Công việc?")) {
        try {
          await TodoService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },

    goToAddTodo() {
      this.$router.push({
        name: "todo.add",
      });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
</style>
