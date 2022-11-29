<template>
  <nav class="navbar navbar-expand navbar-dark bg-primary">
    <a href="/" class="navbar-brand">Quản lý Công việc và ghi chú</a>
    <div class="mr-auto navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'taskmanagement' }" class="nav-link">
          Công việc
          <i class="fas fa-tasks"></i>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'notemanagement' }" class="nav-link">
          Ghi chú
          <i class="fa-solid fa-note-sticky"></i>
        </router-link>
      </li>
    </div>
  </nav>
</template>
