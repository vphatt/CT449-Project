<template>
  <div class="container">
    <div class="row">
      <div class="col-12 pb-3">
        <InputSearch v-model="searchText" />
      </div>
      <h4 class="col-12">
        Ghi chú
        <i class="fa-solid fa-note-sticky"></i>
      </h4>
      <NoteGrid
        class="col-12"
        v-if="filteredNotesCount > 0"
        :notes="filteredNotes"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có Ghi chú nào.</p>
    </div>

    <div class="mt-3 row justify-content-around align-items-center">
      <button class="btn btn-sm btn-success" @click="goToAddNote">
        <i class="fas fa-plus"></i> Thêm mới
      </button>
      <button class="btn btn-sm btn-danger" @click="removeAllNotes">
        <i class="fas fa-trash"></i> Xóa tất cả
      </button>
    </div>
    <div class="mt-3 col-12">
      <div v-if="activeNote">
        <h4>
          Nội dung ghi chú
          <i class="fas fa-tasks"></i>
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import InputSearch from "@/components/InputSearch.vue";
import NoteGrid from "@/components/NoteGrid.vue";
import NoteService from "@/services/note.service";

export default {
  components: {
    InputSearch,
    NoteGrid,
  },
  data() {
    return {
      notes: [],
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
    noteStrings() {
      return this.notes.map((note) => {
        const { title, content, favorite, deadline } = note;
        return [title, content, favorite, deadline].join("");
      });
    },

    // Trả về các Công việc có chứa thông tin cần tìm kiếm.
    filteredNotes() {
      if (!this.searchText) return this.notes;
      return this.notes.filter((_note, index) =>
        this.noteStrings[index].includes(this.searchText)
      );
    },

    activeNote() {
      if (this.activeIndex < 0) return null;
      return this.filteredNotes[this.activeIndex];
    },

    filteredNotesCount() {
      return this.filteredNotes.length;
    },
  },

  methods: {
    async retrieveNotes() {
      try {
        this.notes = await NoteService.getAll();
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveNotes();
      this.activeIndex = -1;
    },

    async removeAllNotes() {
      if (confirm("Bạn muốn xóa tất cả Nhật ký?")) {
        try {
          await NoteService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },

    goToAddNote() {
      this.$router.push({
        name: "note.add",
      });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
