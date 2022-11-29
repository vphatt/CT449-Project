import { createWebHistory, createRouter } from "vue-router";
import TaskManagement from "@/views/TaskManagement.vue";
import NoteManagement from "@/views/NoteManagement.vue";

const routes = [
  {
    path: "/",
    name: "taskmanagement",
    component: TaskManagement,
  },

  {
    path: "/note",
    name: "notemanagement",
    component: NoteManagement,
  },

  {
    path: "/notedetail/:id",
    name: "note.detail",
    component: () => import("@/views/NoteDetail.vue"),
    props: true,
  },

  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },

  {
    path: "/todos/edit/:id",
    name: "todo.edit",
    component: () => import("@/views/TodoEdit.vue"),
    props: true,
  },

  {
    path: "/notes/edit/:id",
    name: "note.edit",
    component: () => import("@/views/NoteEdit.vue"),
    props: true,
  },

  {
    path: "/todos/add/",
    name: "todo.add",
    component: () => import("@/views/TodoAdd.vue"),
    props: true,
  },

  {
    path: "/notes/add/",
    name: "note.add",
    component: () => import("@/views/NoteAdd.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
