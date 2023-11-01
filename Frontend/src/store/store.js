import { create } from "zustand";

export const useExampleStore = create((set) => ({
  data: [{ id: 0, name: "Frank", age: 30, food: "everything" }],
  addData: (name, age, food) =>
    set((store) => {
      const newId = store.data.length;
      const newData = { id: newId, name, age, food };
      return { data: [...store.data, newData] };
    }),
  updateData: (id, name, age, food) =>
    set((store) => {
      const newData = store.data.map((item) =>
        item.id === id ? { id, name, age, food } : item
      );
      return { data: newData };
    }),
}));

