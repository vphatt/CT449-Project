<template>
  <Form @submit="submitNote" :validation-schema="noteFormSchema">
    <div class="form-group">
      <label for="title">Tiêu đề</label>
      <Field
        name="title"
        type="text"
        class="form-control"
        v-model="noteLocal.title"
      />
      <ErrorMessage name="title" class="error-feedback" />
    </div>

    <!-- <div class="form-group">
      <label for="content">Nội dung:</label>
      <Field
        name="content"
        type="text"
        class="form-control"
        v-model="noteLocal.content"
      />
      
      <ErrorMessage name="content" class="error-feedback" />
    </div> -->

    <div class="form-group">
      <label for="content">Nội dung:</label>
      <textarea
        class="form-control"
        name="content"
        rows="5"
        v-model="noteLocal.content"
      ></textarea>
      <ErrorMessage name="content" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="cover">URL ảnh</label>
      <Field
        name="cover"
        type="text"
        class="form-control"
        v-model="noteLocal.cover"
      />
      <ErrorMessage name="cover" class="error-feedback" />
    </div>

    <div class="form-group form-check">
      <input
        name="favorite"
        type="checkbox"
        class="form-check-input"
        v-model="noteLocal.favorite"
      />
      <label for="favorite" class="form-check-label">
        <strong>Yêu Thích</strong>
      </label>
    </div>

    <div class="form-group">
      <button class="btn btn-primary"><i class="fas fa-save"></i> Lưu</button>
      <button
        v-if="noteLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteNote"
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

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:note", "delete:note"],
  props: {
    note: { type: Object, required: true },
  },
  data() {
    const noteFormSchema = yup.object().shape({
      title: yup
        .string()
        .required("Vui lòng nhập tiêu đề.")
        .min(5, "Tiêu đề phải ít nhất 5 ký tự."),
      content: yup.string(),

      cover: yup
        .string()

        .matches(
          /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          "Vui lòng nhập URL hợp lệ!"
        ),
    });
    return {
      noteLocal: this.note,
      noteFormSchema,
    };
  },
  methods: {
    submitNote() {
      this.$emit("submit:note", this.noteLocal);
    },
    deleteNote() {
      this.$emit("delete:note", this.noteLocal.id);
    },
  },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
