<template>
  <div v-if="note" class="page">
    <h4>Thêm Ghi chú</h4>
    <NoteForm :note="note" @submit:note="addNote" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import NoteForm from "@/components/NoteForm.vue";
import NoteService from "@/services/note.service";

export default {
  components: {
    NoteForm,
  },

  data() {
    return {
      note: {},
      message: "",
    };
  },

  methods: {
    async addNote(data) {
      try {
        await NoteService.create(data);
        this.$router.push({ name: "notemanagement" });
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {},
};
</script>
