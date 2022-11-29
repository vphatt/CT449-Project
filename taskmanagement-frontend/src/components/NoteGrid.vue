<template>
  <div class="row">
    <div
      class="card col-5 m-2"
      style="width: 20rem"
      v-for="note in notes"
      :key="note._id"
    >
      <div class="card-body">
        <h5 class="card-title">{{ note.title }}</h5>

        <p class="card-text col-12 text-truncate">{{ note.content }}</p>

        <router-link
          :to="{
            name: 'note.detail',
            params: {
              id: note._id,
            },
          }"
        >
          <button class="btn btn-primary">Chi tiết</button>
        </router-link>
      </div>
    </div>
  </div>

  <!-- <div
    class="card col-5 m-2 d-flex justify-content-center"
    style="width: 18rem"
    v-for="note in notes"
    :key="note._id"
  >
    <img class="card-img-top" v-bind:src="note.cover" />
    <div class="card-body">
      <h5 class="card-title">{{ note.title }}</h5>
      <p class="card-text col-10 text-truncate">{{ note.content }}</p>
      <a href="#" class="btn btn-primary">Chi tiết</a>
    </div>
  </div> -->
  <!-- <ul class="list-group">
    <li
      class="list-group-item"
      v-for="(note, index) in notes"
      :key="note._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      {{ note.title }}
    </li>
  </ul> -->
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    notes: { type: Array, default: [] },
  },

  methods: {},
};
</script>
