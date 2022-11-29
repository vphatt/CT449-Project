<template>
  <Form @submit="submitTodo" :validation-schema="todoFormSchema">
    <div class="form-group">
      <label for="title">Tên Công việc</label>
      <Field
        name="title"
        type="text"
        class="form-control"
        v-model="todoLocal.title"
      />
      <ErrorMessage name="title" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="content">Nội dung công việc</label>
      <Field
        name="content"
        type="content"
        class="form-control"
        v-model="todoLocal.content"
      />
      <ErrorMessage name="content" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="deadline">Hạn chót: </label>
      <date-picker
        v-model:value="todo.deadline"
        valueType="format"
        format="DD-MM-YYYY"
      ></date-picker>
      <ErrorMessage name="deadline" class="error-feedback" />
    </div>

    <div class="form-group form-check">
      <input
        name="complete"
        type="checkbox"
        class="form-check-input"
        v-model="todoLocal.complete"
      />
      <label for="complete" class="form-check-label">
        <strong>Hoàn thành</strong>
      </label>
    </div>

    <div class="form-group">
      <button class="btn btn-primary"><i class="fas fa-save"></i> Lưu</button>
      <button
        v-if="todoLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteTodo"
      >
        <i class="fas fa-trash"></i>
        Xóa
      </button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    DatePicker,
  },
  emits: ["submit:todo", "delete:todo"],
  props: {
    todo: { type: Object, required: true },
  },
  data() {
    const todoFormSchema = yup.object().shape({
      title: yup
        .string()
        .required("Vui lòng nhập tên công việc.")
        .min(5, "Tên phải ít nhất 5 ký tự."),
      content: yup
        .string()
        .required("Vui lòng nhập nội dung công việc.")
        .min(10, "Nội dung công việc phải nhiều hơn 10 ký tự."),
    });
    return {
      todoLocal: this.todo,
      todoFormSchema,
      time: null,
    };
  },
  methods: {
    submitTodo() {
      this.$emit("submit:todo", this.todoLocal);
    },
    deleteTodo() {
      this.$emit("delete:todo", this.todoLocal.id);
    },
  },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
