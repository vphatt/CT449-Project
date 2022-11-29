<script>
import moment from "moment";

import { date } from "yup";

export default {
  data() {
    return {
      activeName: "1",
    };
  },
  props: {
    todos: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },

    today: function () {
      return moment().format("DD-MM-YYYY");
    },

    isOutOfTime: function (deadline) {
      var dateDeadline = moment(deadline, "DD-MM-YYYY").format("DD-MM-YYYY");
      var dateCurrent = moment().format("DD-MM-YYYY");
      if (dateDeadline >= dateCurrent) {
        return false;
      }
      if (dateDeadline < dateCurrent) {
        return true;
      }
    },

    // filteredTodos() {
    //   if (!this.searchText) return this.todos;
    //   return this.todos.filter((_todo, index) =>
    //     this.todoStrings[index].includes(this.searchText)
    //   );
    // },
  },
};
</script>

<template>
  <div>
    <Strong class="h5">Hôm nay là: </Strong>

    <Strong class="h5">{{ today() }}</Strong>
  </div>
  <div class="d-flex justify-content-center">
    <div class="bg-success p-2 m-2 font-weight-bold h6">Đã hoàn thành</div>
    <div class="bg-warning p-2 m-2 font-weight-bold h6">Chưa hoàn thành</div>
    <div class="bg-danger p-2 m-2 font-weight-bold h6">Quá hạn</div>
  </div>

  <ul v-for="(todo, index) in todos">
    <li
      :key="todo._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
      v-if="todo.complete === true"
      class="list-group-item bg-success h5 p-4"
      v-b-toggle.collapse-1
      variant="primary"
    >
      {{ todo.title }}
    </li>
    <li
      class="list-group-item bg-warning h5 p-4"
      :key="todo._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
      v-if="todo.complete === false && isOutOfTime(todo.deadline) === false"
    >
      {{ todo.title }}
    </li>
    <li
      class="list-group-item bg-danger h5 p-4"
      :key="todo._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
      v-if="todo.complete === false && isOutOfTime(todo.deadline) === true"
    >
      {{ todo.title }}
    </li>
  </ul>
</template>
