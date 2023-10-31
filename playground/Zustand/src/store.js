import { create } from 'zustand'

export const useTaskStore = create((set) => ({
  tasks: [{ title: "TestTask", state: "ONGOING" }],
  draggedTask: null,
  addTask: (title, state) => set((store) => ({ tasks: [...store.tasks, { title, state }] })),
  deleteTask: (title) => set((store) => ({ tasks: store.tasks.filter(task => task.title !== title) })),
  setDraggedTask: (title => set({ draggedTask: title })),
  moveTask: (title, state) => set(store => ({
    tasks: store.tasks.map(task => task.title === title ? { title, state } : task)
  })),
}))

