import { create } from 'zustand'

export const useTaskStore = create((set) => ({
  tasks: [{ title: "TestTask", state: "ONGOING" }],
}))

