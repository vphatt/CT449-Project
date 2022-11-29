<template>
  <div class="container">
    <div class="row">
      <h4 class="col-12">Chi tiết Ghi chú</h4>

      <div class="card mb-3 col-12">
        <img
          
          v-bind:src="note.cover"
          
        />
        <div class="card-body">
          <h5 class="card-title">{{ note.title }}</h5>
          <p class="card-text">
            {{ note.content }}
          </p>
          
            <p class="card-text">
            <div class="p-1">
              <strong>Yêu thích:&nbsp;</strong>
              <i v-if="note.favorite">✔</i>
              <i v-else>✘</i>
            </div>
          </p>
          <div class="d-flex justify-content-end">
            <router-link
          :to="{
            name: 'notemanagement',
            
          }"
        >
          <button class="btn btn-primary mr-3">Trở lại</button>
        </router-link>
        <router-link
          :to="{
            name: 'note.edit',
            params: {
              id: note._id,
            },
          }"
        >
          <button type="button" class="btn btn-secondary">
            <i class="fas fa-edit"></i> Hiệu chỉnh</button
          >
        </router-link>
          </div>
          
          </div>
          
        </div>
      </div>
      <!-- <div class="jumbotron jumbotron-fluid col-12">
        <div class="container">
          <h1 class="display-5">{{ note.title }}</h1>
          <img v-bind:src="note.cover" />
          <p class="lead">
            {{ note.content }}
          </p>
        </div>
      </div> -->
    </div>
 
</template>

<script>
import NoteService from "@/services/note.service";

export default {
  components: {},
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      note: null,
    };
  },
  methods: {
    async getNote(id) {
      try {
        this.note = await NoteService.get(id);
      } catch (error) {
        console.log(error);
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
  },

  created() {
    this.getNote(this.id);
    this.message = "";
  },
};
</script>
