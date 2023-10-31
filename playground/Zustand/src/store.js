import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const log = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log(args);
      set(...args);
    },
    get,
    api
  );

export const useTaskStore = create(
  log(
    persist(
      devtools((set) => ({
        tasks: [],
        draggedTask: null,
        addTask: (title, state) =>
          set(
            (store) => ({ tasks: [...store.tasks, { title, state }] }),
            false,
            "addTask",
          ),
        deleteTask: (title) =>
          set(
            (store) => ({
              tasks: store.tasks.filter((task) => task.title !== title),
            }),
            false,
            "deleteTask",
          ),
        setDraggedTask: (title) =>
          set({ draggedTask: title }, false, "setDraggedTask"),
        moveTask: (title, state) =>
          set(
            (store) => ({
              tasks: store.tasks.map((task) =>
                task.title === title ? { title, state } : task,
              ),
            }),
            false,
            "moveTask",
          ),
      })),
      { name: "TaskStore" },
    ),
  ),
);

