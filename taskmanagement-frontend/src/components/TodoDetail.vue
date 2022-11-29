<script>
export default {
  props: {
    todo: { type: Object, required: true },
  },
};
</script>

<template>
  <div>
    <div class="p-1">
      <strong>Tên công việc:</strong>
      {{ todo.title }}
    </div>
    <div class="p-1">
      <strong>Nội dung công việc:</strong>
      {{ todo.content }}
    </div>

    <div class="p-1">
      <strong>Hạn chót:</strong>

      {{ todo.deadline }}
    </div>
    <div class="p-1">
      <strong>Đã hoàn thành:&nbsp;</strong>
      <i v-if="todo.complete">✔</i>
      <i v-else>✘</i>
    </div>
  </div>
</template>
