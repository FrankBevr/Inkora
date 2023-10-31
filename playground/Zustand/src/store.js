import { create } from 'zustand'

export const useTaskStore = create((set) => ({
  tasks: [{ title: "TestTask", state: "ONGOING" }],
  addTask: (title, state) => set((store) => ({ tasks: [...store.tasks, { title, state }] })),
  deleteTask: (title) => set((store) => ({ tasks: store.tasks.filter(task => task.title !== title) }))
}))

