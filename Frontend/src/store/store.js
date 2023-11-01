import { create } from "zustand";

export const useExampleStore = create((set) => ({
  rambledData: [{ name: "Frank", age: 30, food: "everything" }],
}))
