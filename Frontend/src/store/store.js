import { create } from "zustand";

export const useExampleStore = create((set) => ({
  data: [{ name: "Frank", age: 30, food: "everything" }],
  addData: (name, age, food) =>
    set(
      (store) => ({ data: [...store.data, { name, age, food }] }),
    ),
}))

